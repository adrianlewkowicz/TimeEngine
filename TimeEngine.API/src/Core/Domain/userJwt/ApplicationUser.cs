using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace TimeEngine.Core.Domain.userJwt;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public bool IsEmailConfirmed { get; set; } = false;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    // 📌 Dodatkowe pola
    public string Position { get; set; } = "Developer";
    public string Bio { get; set; } = string.Empty;
    public List<string> Skills { get; set; } = new();

    // 🔐 MFA (Multi-Factor Authentication)
    public string? TotpSecret { get; set; }
    public bool IsMfaEnabled { get; set; } = false;

    // 🔄 Resetowanie hasła
    public string? ResetPasswordToken { get; set; }
    public DateTime? ResetPasswordTokenExpiry { get; set; }

    public ApplicationUser() { }

    public ApplicationUser(string userName, string email, string fullName)
    {
        UserName = userName;
        Email = email;
        FullName = fullName;
        CreatedAt = DateTime.UtcNow;
        IsActive = true;
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;
    public void UpdateLastLogin() => LastLoginAt = DateTime.UtcNow;

    public void SetResetPasswordToken(string token, int minutesValid = 30)
    {
        ResetPasswordToken = token;
        ResetPasswordTokenExpiry = DateTime.UtcNow.AddMinutes(minutesValid);
    }

    public bool IsResetTokenValid(string token)
    {
        return ResetPasswordToken == token && ResetPasswordTokenExpiry > DateTime.UtcNow;
    }
}
