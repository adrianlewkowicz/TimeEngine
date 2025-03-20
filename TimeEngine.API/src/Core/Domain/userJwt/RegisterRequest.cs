namespace TimeEngine.Core.Domain.userJwt;

public record RegisterRequest(
    string? FullName,
    string? Email,
    string? Password,
    string? CompanyName,
    string Position = "Developer",
    string? Bio = ""
);
