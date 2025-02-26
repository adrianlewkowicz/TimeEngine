
namespace TimeEngine.Infrastructure.Interfaces
{
    public interface IGitHubService
    {
        System.Threading.Tasks.Task CreateOrSyncRepository(string repoName);
        System.Threading.Tasks.Task CreateBranch(string repoName, string branchName);
    }
}
