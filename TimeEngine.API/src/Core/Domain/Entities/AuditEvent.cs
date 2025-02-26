public class AuditEvent
{
    public Guid Id { get; private set; }
    public string EntityType { get; private set; }
    public Guid EntityId { get; private set; }
    public string Action { get; private set; }
    public string Payload { get; private set; }
    public DateTime Timestamp { get; private set; }

    private AuditEvent() { }
    public AuditEvent(string entityType, Guid entityId, string action, string payload)
    {
        Id = Guid.NewGuid();
        EntityType = entityType;
        EntityId = entityId;
        Action = action;
        Payload = payload;
        Timestamp = DateTime.UtcNow;
    }
}
