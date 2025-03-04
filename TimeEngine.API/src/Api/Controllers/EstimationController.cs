using Microsoft.AspNetCore.Mvc;
using TimeEngine.ML.Services;

namespace TimeEngine.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstimationController : ControllerBase
    {
        private readonly EstimationService _estimationService;

        public EstimationController(EstimationService estimationService)
        {
            _estimationService = estimationService;
        }

        [HttpPost]
        public IActionResult EstimateTask([FromBody] TaskData taskData)
        {
            var estimation = _estimationService.Estimate(taskData);
            return Ok(estimation);
        }
    }
}
