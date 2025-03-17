using TimeEngine.Core.Domain.userJwt;

public interface IMLEstimationService
{
    Task<ApplicationUser?> PredictBestAssignee(Task task, List<ApplicationUser> candidates);
}
