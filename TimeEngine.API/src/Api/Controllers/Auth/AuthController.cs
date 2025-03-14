using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TimeEngine.Core.Domain.userJwt;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    // 🔹 Rejestracja użytkownika
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { Message = "Email i hasło są wymagane." });
        }

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            return BadRequest(new { Message = "Użytkownik o tym emailu już istnieje." });
        }

        var user = new ApplicationUser(request.Email, request.Email, request.FullName ?? "Anonim");

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        // Upewniamy się, że użytkownik istnieje przed generowaniem tokena
        var createdUser = await _userManager.FindByEmailAsync(request.Email);
        if (createdUser == null)
        {
            return StatusCode(500, new { Message = "Błąd serwera: użytkownik nie został poprawnie zapisany." });
        }

        var token = JwtTokenGenerator.GenerateToken(createdUser);
        return Ok(new { Message = "Rejestracja zakończona sukcesem!", Token = token });
    }

    // 🔹 Logowanie użytkownika
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { Message = "Email i hasło są wymagane." });
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return Unauthorized(new { Message = "Niepoprawny email lub hasło." });
        }

        var token = JwtTokenGenerator.GenerateToken(user);
        return Ok(new { Token = token });
    }
}
