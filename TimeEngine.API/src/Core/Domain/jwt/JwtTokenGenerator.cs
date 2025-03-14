using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TimeEngine.Core.Domain.userJwt;

public static class JwtTokenGenerator
{
    private static IConfiguration _configuration;

    public static void Configure(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public static string GenerateToken(ApplicationUser user)
    {
        if (_configuration == null)
        {
            throw new InvalidOperationException("❌ JWTTokenGenerator is not configured. Call Configure() first!");
        }

        var secretKey = _configuration["Jwt:Key"];
        if (string.IsNullOrWhiteSpace(secretKey))
        {
            throw new InvalidOperationException("❌ JWT Key is missing in appsettings.json!");
        }

        Console.WriteLine($"✅ Loaded JWT Key: {secretKey}");

        // Zamiana klucza Base64 na bajty
        var keyBytes = Convert.FromBase64String(secretKey);
        var key = new SymmetricSecurityKey(keyBytes);

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Role, "User")
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
