using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TimeEngine.Infrastructure.Interfaces;

namespace TimeEngine.Infrastructure.Service
{
    public class GitHubService : IGitHubService
    {
        private readonly HttpClient _httpClient;

        public GitHubService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://api.github.com/");

            // Pobranie tokena ze zmiennych środowiskowych
            var token = Environment.GetEnvironmentVariable("GITHUB_TOKEN");

            if (string.IsNullOrEmpty(token))
            {
                throw new InvalidOperationException("GitHub Token is missing. Set the GITHUB_TOKEN environment variable.");
            }

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("TimeEngine-App");
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }


        public async System.Threading.Tasks.Task CreateOrSyncRepository(string repoName)
        {
            if (string.IsNullOrEmpty(repoName))
            {
                throw new ArgumentNullException(nameof(repoName));
            }

            Console.WriteLine($"Creating or syncing repository: {repoName}");

            var requestBody = new { name = repoName };
            var response = await _httpClient.PostAsJsonAsync($"user/repos", requestBody);

            if (!response.IsSuccessStatusCode)
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                throw new Exception($"Failed to create repository: {response.StatusCode} - {errorMessage}");
            }
        }


        public async Task<string> CreateBranch(string repoName, string branchName)
        {
            if (string.IsNullOrEmpty(repoName) || string.IsNullOrEmpty(branchName))
            {
                throw new ArgumentNullException(nameof(repoName));
            }

            Console.WriteLine($"Creating branch '{branchName}' in repository '{repoName}'");

            // Pobranie ostatniego commit SHA z głównej gałęzi
            var branchInfo = await _httpClient.GetFromJsonAsync<GitHubBranchInfo>($"repos/{repoName}/branches/main");

            if (branchInfo == null || string.IsNullOrEmpty(branchInfo.Commit?.Sha))
            {
                throw new Exception("Failed to get main branch SHA.");
            }

            var requestBody = new
            {
                @ref = $"refs/heads/{branchName}", // Użycie `@ref` zamiast `ref`
                sha = branchInfo.Commit.Sha
            };

            var response = await _httpClient.PostAsJsonAsync($"repos/{repoName}/git/refs", requestBody);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadFromJsonAsync<GitHubBranchResponse>();
                return jsonResponse?.BranchUrl ?? string.Empty;
            }

            var errorMessage = await response.Content.ReadAsStringAsync();
            throw new Exception($"Failed to create branch: {response.StatusCode} - {errorMessage}");
        }
    }
}