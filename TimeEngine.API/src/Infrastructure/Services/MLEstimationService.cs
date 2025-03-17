using System.Net.Http.Json;
using TimeEngine.Core.Domain.userJwt;

public class MLEstimationService : IMLEstimationService
{
    private readonly HttpClient _httpClient;

    public MLEstimationService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ApplicationUser?> PredictBestAssignee(Task task, List<ApplicationUser> candidates)
    {
        var request = new { task = task, candidates = candidates };
        var response = await _httpClient.PostAsJsonAsync("/predict", request);

        if (!response.IsSuccessStatusCode) return null;

        var responseBody = await response.Content.ReadFromJsonAsync<PredictionResponse>();
        return candidates.FirstOrDefault(c => c.Id.ToString() == responseBody?.UserId);
    }
}

