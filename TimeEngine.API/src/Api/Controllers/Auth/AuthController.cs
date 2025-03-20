using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IO;
using System.Threading.Tasks;
using TimeEngine.Core.Domain.userJwt;
using TimeEngine.Core.Interfaces;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IEmailService _emailService;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailService emailService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService)); // ✅ Dodana kontrola null
    }

    // 🔹 Rejestracja użytkownika z linkiem aktywacyjnym
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName,
            CompanyName = request.CompanyName,
            Position = request.Position,
            Bio = request.Bio
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationLink = $"http://localhost:4200/confirm-email?userId={user.Id}&token={Uri.EscapeDataString(token)}";

        await _emailService.SendEmailAsync(user.Email, "Potwierdź rejestrację", $"Kliknij link: {confirmationLink}");

        return Ok(new { Message = "Rejestracja zakończona sukcesem! Sprawdź email." });
    }

    // 🔹 Potwierdzenie emaila
    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(Guid userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null) return NotFound("Użytkownik nie istnieje.");

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded) return BadRequest("Nie udało się potwierdzić emaila.");

        user.EmailConfirmed = true;
        await _userManager.UpdateAsync(user);

        return Ok("Konto aktywowane! Możesz się zalogować.");
    }

    // 🔹 Logowanie użytkownika
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return Unauthorized(new { Message = "Niepoprawny email lub hasło." });
        }

        if (!user.EmailConfirmed)
        {
            return BadRequest("Najpierw potwierdź swój email.");
        }

        var token = JwtTokenGenerator.GenerateToken(user);
        return Ok(new { Token = token });
    }

    // 🔹 Upload zdjęcia profilowego
    [HttpPost("upload-profile-picture")]
    public async Task<IActionResult> UploadProfilePicture(IFormFile file)
    {
        var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
        if (user == null) return Unauthorized();

        var filePath = $"wwwroot/profile_pictures/{user.Id}.jpg";
        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        user.ProfilePictureUrl = $"/profile_pictures/{user.Id}.jpg";
        await _userManager.UpdateAsync(user);

        return Ok(new { PictureUrl = user.ProfilePictureUrl });
    }
}
