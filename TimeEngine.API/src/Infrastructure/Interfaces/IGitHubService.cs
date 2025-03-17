
namespace TimeEngine.Infrastructure.Interfaces
{
     public interface IGitHubService
    {
        System.Threading.Tasks.Task CreateOrSyncRepository(string repoName);
        Task<string> CreateBranch(string repoName, string branchName);
    }
}
