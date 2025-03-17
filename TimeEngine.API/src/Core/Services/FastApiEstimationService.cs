using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace TimeEngine.Core.Services;

public class FastApiEstimationService
{
    private readonly HttpClient _client;

    public FastApiEstimationService(IHttpClientFactory clientFactory)
    {
        _client = clientFactory.CreateClient("FastApiClient");
    }

    public async Task<float> GetPredictionAsync(int experience, int complexity)
    {
        var response = await _client.GetAsync($"/predict/{experience}/{complexity}");
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<PredictionResult>();
        return result.estimated_time;
    }
}

public record PredictionResult(float estimated_time);
