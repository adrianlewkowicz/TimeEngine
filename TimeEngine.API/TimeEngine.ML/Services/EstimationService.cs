using Microsoft.ML;
using Microsoft.ML.Data;
using System.Collections.Generic;
using System.IO;

namespace TimeEngine.ML.Services
{
    public class EstimationService
    {
        private readonly MLContext _mlContext;
        private readonly PredictionEngine<TaskData, TaskEstimation> _predictionEngine;

        public EstimationService()
        {
            _mlContext = new MLContext();

            // Wczytanie wytrenowanego modelu ML
            var modelPath = Path.Combine(Directory.GetCurrentDirectory(), "Models", "task_estimation_model.zip");
            ITransformer loadedModel = _mlContext.Model.Load(modelPath, out _);

            _predictionEngine = _mlContext.Model.CreatePredictionEngine<TaskData, TaskEstimation>(loadedModel);
        }

        public TaskEstimation Estimate(TaskData input)
        {
            return _predictionEngine.Predict(input);
        }
    }

    public class TaskData
    {
        [LoadColumn(0)] public required string Description { get; set; }
        [LoadColumn(1)] public float SkillComplexity { get; set; }
    }

    public class TaskEstimation
    {
        public float EstimationJunior { get; set; }
        public float EstimationMid { get; set; }
        public float EstimationSenior { get; set; }
    }
}
