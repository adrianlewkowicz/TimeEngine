using Microsoft.AspNetCore.Identity;
using System;

namespace TimeEngine.Core.Domain.userJwt;
public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    public string? ResetPasswordToken { get; set; }
    public DateTime? ResetPasswordTokenExpiry { get; set; }

    public string? TotpSecret { get; set; }
    public bool IsMfaEnabled { get; set; } = false;

    public string Role { get; set; } = "User";

    public ApplicationUser() { }

    public ApplicationUser(string userName, string email, string fullName)
    {
        UserName = userName;
        Email = email;
        FullName = fullName;
        CreatedAt = DateTime.UtcNow;
        IsActive = true;
    }

    // Metoda blokowania użytkownika
    public void Deactivate()
    {
        IsActive = false;
    }

    // Metoda aktywowania użytkownika
    public void Activate()
    {
        IsActive = true;
    }

    // Metoda aktualizacji ostatniego logowania
    public void UpdateLastLogin()
    {
        LastLoginAt = DateTime.UtcNow;
    }

    // Metoda ustawiania tokenu do resetu hasła
    public void SetResetPasswordToken(string token, int minutesValid = 30)
    {
        ResetPasswordToken = token;
        ResetPasswordTokenExpiry = DateTime.UtcNow.AddMinutes(minutesValid);
    }

    // Sprawdzenie, czy token do resetu hasła jest ważny
    public bool IsResetTokenValid(string token)
    {
        return ResetPasswordToken == token && ResetPasswordTokenExpiry > DateTime.UtcNow;
    }
}
