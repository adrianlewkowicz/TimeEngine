using Microsoft.EntityFrameworkCore;
using TimeEngine.Core.Domain;
using TimeEngine.Core.Domain.Entities;

public class DataSeeder
{
    private readonly TimeEngineContext _context;

    public DataSeeder(TimeEngineContext context)
    {
        _context = context;
    }

    public async System.Threading.Tasks.Task SeedAsync()
    {
        await _context.Database.EnsureCreatedAsync();

        // 📦 Seedowanie projektów
        if (!_context.Projects.Any())
        {
            var projects = Enumerable.Range(1, 10).Select(i => 
                Project.Create($"Projekt {i}", $"Opis projektu {i}")
            ).ToList();

            await _context.Projects.AddRangeAsync(projects);
            await _context.SaveChangesAsync(); 
        }

        // 👥 Seedowanie użytkowników
        if (!_context.Users.Any())
        {
            var users = Enumerable.Range(1, 10).Select(i => 
                new User(
                    $"użytkownik{i}",
                    $"user{i}@example.com",
                    "Haslo123!"
                )
            ).ToList();

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();
        }

        // 📝 Seedowanie zadań
        if (!_context.Tasks.Any())
        {
            var random = new Random();
            var projects = await _context.Projects.ToListAsync();
            var users = await _context.Users.ToListAsync();

            var tasks = Enumerable.Range(1, 100).Select(i =>
            {
                var project = projects[random.Next(projects.Count)];
                var assignedUser = users[random.Next(users.Count)];

                var task = new Task(
                    $"Zadanie {i}",
                    $"Opis zadania {i}",
                    project.Id
                );

                task.AssignUser(assignedUser.Id);

                if (i % 2 == 0)
                {
                    task.Complete();
                }

                return task;
            }).ToList();

            await _context.Tasks.AddRangeAsync(tasks);
            await _context.SaveChangesAsync();
        }
    }
}
