using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeEngine.Core.Domain;
using TimeEngine.Core.Interfaces;
using TimeEngine.Infrastructure.Interfaces;

namespace TimeEngine.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TimeEngineContext _context;
        private readonly ITaskEstimationService _estimationService;
        private readonly IGitHubService _gitHubService;

        public TasksController(TimeEngineContext context, ITaskEstimationService estimationService, IGitHubService gitHubService)
        {
            _context = context;
            _estimationService = estimationService;
            _gitHubService = gitHubService;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Task>> CreateTask([FromBody] Task task)
        {
            // Sprawdzenie, czy ProjectId jest puste lub nieprawidłowe
            if (task.ProjectId == Guid.Empty || !await _context.Projects.AnyAsync(p => p.Id == task.ProjectId))
            {
                // Automatyczne tworzenie nowego projektu z użyciem metody fabrycznej
                var newProject = Project.Create($"Projekt dla zadania: {task.Title}");

                await _context.Projects.AddAsync(newProject);
                await _context.SaveChangesAsync();

                // Użycie metody domenowej do ustawienia ProjectId
                task.SetProjectId(newProject.Id);
                Console.WriteLine($"Nowy projekt utworzony z ID: {task.ProjectId}");
            }

            // Szacowanie czasu zadania przez AI
            var estimation = _estimationService.EstimateTask(task.Description, task.Skills ?? new List<string>());

            if (estimation == null)
            {
                return BadRequest("Nie udało się uzyskać estymacji czasu zadania.");
            }

            // Ustawienie odpowiedniej estymacji na podstawie wybranego poziomu doświadczenia
            if (task.EstimationJunior > 0)
            {
                task.EstimationJunior = estimation.Junior;
                task.EstimationMid = 0;
                task.EstimationSenior = 0;
            }
            else if (task.EstimationMid > 0)
            {
                task.EstimationJunior = 0;
                task.EstimationMid = estimation.Mid;
                task.EstimationSenior = 0;
            }
            else if (task.EstimationSenior > 0)
            {
                task.EstimationJunior = 0;
                task.EstimationMid = 0;
                task.EstimationSenior = estimation.Senior;
            }
            else
            {
                // Jeśli żaden poziom doświadczenia nie został ustawiony, ustawiamy wartości domyślne
                task.EstimationJunior = estimation.Junior;
                task.EstimationMid = estimation.Mid;
                task.EstimationSenior = estimation.Senior;
            }

            // Integracja z GitHubem
            var repoName = $"project-{task.ProjectId}";
            await _gitHubService.CreateOrSyncRepository(repoName);
            await _gitHubService.CreateBranch(repoName, task.Title);

            // Zapis zadania do bazy danych
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }


        // PUT: api/Tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] Task updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Sprawdzenie czy zadanie istnieje
        private bool TaskExists(Guid id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
