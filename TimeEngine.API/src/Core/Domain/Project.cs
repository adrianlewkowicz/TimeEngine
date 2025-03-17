public class Project
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string? Description { get; private set; }
    public DateTime StartDate { get; private set; }
    public DateTime? EndDate { get; private set; }

    private List<Task> _tasks = new List<Task>();
    public IReadOnlyCollection<Task> Tasks => _tasks.AsReadOnly();

    private Project() { }

    // Dodanie konstruktora przyjmującego nazwę i datę rozpoczęcia
    public Project(string name, string? description = null)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        StartDate = DateTime.UtcNow;
    }

    public static Project Create(string name, string? description = null)
    {
        return new Project(name, description);
    }
}
