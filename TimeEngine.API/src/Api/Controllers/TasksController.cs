using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeEngine.Core.Domain;
using TimeEngine.Core.Domain.userJwt;
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
        private readonly IMLEstimationService _mlEstimationService;


        public TasksController(TimeEngineContext context, ITaskEstimationService estimationService, IGitHubService gitHubService, IMLEstimationService mlEstimationService)
        {
            _context = context;
            _estimationService = estimationService;
            _gitHubService = gitHubService;
            _mlEstimationService = mlEstimationService;

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

        // POST: api/Tasks[Authorize]
        [HttpPost]
        public async Task<ActionResult<Task>> CreateTask([FromBody] Task task)
        {
            if (task == null || string.IsNullOrEmpty(task.Title))
            {
                return BadRequest(new { Message = "Tytuł zadania jest wymagany." });
            }

            if (task.ProjectId == Guid.Empty || !await _context.Projects.AnyAsync(p => p.Id == task.ProjectId))
            {
                var newProject = Project.Create($"Projekt dla zadania: {task.Title}");
                await _context.Projects.AddAsync(newProject);
                await _context.SaveChangesAsync();
                task.SetProjectId(newProject.Id);
            }

            // 1. Generowanie nazwy branch'a na podstawie ID zadania
            var branchName = $"feature/{task.Id}-{task.Title.Replace(" ", "-").ToLower()}";
            var repoName = $"project-{task.ProjectId}";

            // 2. Tworzenie nowego branch'a na GitHub
            var branchUrl = await _gitHubService.CreateBranch(repoName, branchName);
            if (string.IsNullOrEmpty(branchUrl))
            {
                return BadRequest("Nie udało się utworzyć branch'a w GitHub.");
            }
            task.SetGitBranch(branchUrl);

            // 3. Pobranie listy użytkowników i przypisanie najlepszego
            var candidates = await _context.Users
                .Where(u => u.Skills.Any(skill => task.Skills.Contains(skill)))
                .Select(u => new ApplicationUser
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Email = u.Email
                })
                .ToListAsync();

            var bestUser = await _mlEstimationService.PredictBestAssignee(task, candidates);
            if (bestUser == null)
            {
                return BadRequest("Brak odpowiedniego użytkownika do przypisania.");
            }

            task.AssignUser(bestUser.Id);

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
