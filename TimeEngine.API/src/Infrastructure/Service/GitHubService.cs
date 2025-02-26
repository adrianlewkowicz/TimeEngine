using TimeEngine.Infrastructure.Interfaces;

namespace TimeEngine.Infrastructure.Service
{
    public class GitHubService : IGitHubService
    {
        public async System.Threading.Tasks.Task CreateOrSyncRepository(string repoName)
        {
            if (string.IsNullOrEmpty(repoName))
            {
                // Rzucenie wyjątku zamiast błędnego zwracania Task
                throw new ArgumentNullException(nameof(repoName));
            }

            Console.WriteLine($"Creating or syncing repository: {repoName}");

            // Symulacja operacji asynchronicznej z użyciem poprawnego aliasu Task
            await System.Threading.Tasks.Task.Delay(1000);

            Console.WriteLine("Repository created/synced successfully.");
            await System.Threading.Tasks.Task.CompletedTask;
        }

        public async System.Threading.Tasks.Task CreateBranch(string repoName, string branchName)
        {
            if (string.IsNullOrEmpty(repoName))
            {
                throw new ArgumentNullException(nameof(repoName));
            }
           
            if (string.IsNullOrEmpty(branchName))
            {
                throw new ArgumentNullException(nameof(branchName));
            }

            Console.WriteLine($"Creating branch '{branchName}' in repository '{repoName}'");

            // Symulacja operacji asynchronicznej z użyciem poprawnego aliasu Task
            await System.Threading.Tasks.Task.Delay(1000);

            Console.WriteLine("Branch created successfully.");
        }
    }
}
