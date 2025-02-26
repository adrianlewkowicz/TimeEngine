// src/Core/Domain/Entities/User.cs
using TimeEngine.Core.Domain.Entities;

namespace TimeEngine.Core.Domain
{
public class User
{
    public Guid Id { get; private set; }
    public string UserName { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public bool IsLocked { get; private set; }

    // Przykład ról w postaci listy stringów lub obieatu Role
    private List<UserRole> _roles = new List<UserRole>();
    public IReadOnlyCollection<UserRole> Roles => _roles.AsReadOnly();

    // Dla MFA
    public string? TotpSecret { get; private set; }

    // Dla audytu
    public DateTime CreatedAt { get; private set; }
    public DateTime? LastLoginAt { get; private set; }

    // Konstruktor i metody domenowe (np. ZmianaHasla, BlokujKonto, UstawMfaSecret)
    private User() { /* EF Core */ }
    public User(string userName, string email, string passwordHash)
    {
        Id = Guid.NewGuid();
        UserName = userName;
        Email = email;
        PasswordHash = passwordHash;
        CreatedAt = DateTime.UtcNow;
    }

    public void Lock() => IsLocked = true;
    public void Unlock() => IsLocked = false;
}

}
