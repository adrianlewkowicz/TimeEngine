using Microsoft.AspNetCore.Mvc;
using TimeEngine.Core.Services;
using TimeEngine.ML.Services;

namespace TimeEngine.Api.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class EstimationController : ControllerBase
{
    private readonly TaskEstimationService _localEstimationService;
    private readonly FastApiEstimationService _aiEstimationService;

    public EstimationController(
        TaskEstimationService localService, 
        FastApiEstimationService aiService)
    {
        _localEstimationService = localService;
        _aiEstimationService = aiService;
    }

    [HttpPost("estimate")]
    public async Task<IActionResult> EstimateTask([FromBody] TaskRequest request)
    {
        var localEstimation = _localEstimationService.EstimateTask(request.Description, request.Skills);
        var aiEstimation = await _aiEstimationService.GetPredictionAsync(request.Experience, request.Complexity);

        return Ok(new { localEstimation, aiEstimation });
    }
}

public class TaskRequest
{
    public required string Description { get; set; }
    public List<string>? Skills { get; set; }
    public int Experience { get; set; }
    public int Complexity { get; set; }
}

}
