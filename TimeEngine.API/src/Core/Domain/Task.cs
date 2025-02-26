
using TimeEngine.Core.Domain;

public class Task
{
    public Guid Id { get; private set; }
    public string Title { get; private set; }
    public string Description { get; private set; }
    public Guid ProjectId { get; private set; }
    public TaskStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }

    public Guid? AssignedUserId { get; private set; }
    public User? AssignedUser { get; private set; }
    public List<string> Skills { get; set; } = new List<string>();
    public double EstimationJunior { get; set; }
    public double EstimationMid { get; set; }
    public double EstimationSenior { get; set; }

    private Task() { }

    public Task(string title, string description, Guid projectId)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        ProjectId = projectId;
        Status = TaskStatus.New;
        CreatedAt = DateTime.UtcNow;
    }

    public void AssignUser(Guid userId)
    {
        AssignedUserId = userId;
        Status = TaskStatus.InProgress;
    }

    public void Complete()
    {
        Status = TaskStatus.Completed;
        CompletedAt = DateTime.UtcNow;
    }

    // 🆕 Nowa metoda domenowa do ustawiania ProjectId
    public void SetProjectId(Guid projectId)
    {
        ProjectId = projectId;
    }
}


public enum TaskStatus
{
    New,
    InProgress,
    UnderReview,
    Completed,
    Rejected
}

