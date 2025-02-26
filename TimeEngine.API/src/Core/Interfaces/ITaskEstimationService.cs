using System.Collections.Generic;
using TimeEngine.Core.Domain;

namespace TimeEngine.Core.Interfaces
{
    public interface ITaskEstimationService
    {
        EstimationResult EstimateTask(string description, List<string> skills);
    }
}
