using System;
using System.Collections.Generic;
using TimeEngine.Core.Domain;
using TimeEngine.Core.Interfaces;

namespace TimeEngine.Core.Services
{
    public class TaskEstimationService : ITaskEstimationService
    {
        public EstimationResult EstimateTask(string description, List<string> skills)
        {
            int baseEstimation = description.Length + (skills?.Count ?? 0) * 10;

            var juniorEstimation = (int)Math.Round((double)(baseEstimation * 1.2));
            var midEstimation = (int)Math.Round((double)(baseEstimation * 0.8));
            var seniorEstimation = (int)Math.Round((double)(baseEstimation * 0.5));

            return new EstimationResult
            {
                Junior = juniorEstimation,
                Mid = midEstimation,
                Senior = seniorEstimation
            };
        }
    }
}
