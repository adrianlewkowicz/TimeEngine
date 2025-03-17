using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly TimeEngineContext _context;

    public TestController(TimeEngineContext context)
    {
        _context = context;
    }

    [HttpGet("ping")]
    public IActionResult Ping()
    {
        try
        {
            var dbs = _context.Database.CanConnect();
            return Ok(dbs ? "Połączenie OK!" : "Brak połączenia z bazą danych.");
        }
        catch (Exception ex)
        {
            return BadRequest($"Błąd połączenia: {ex.Message}");
        }
    }
}
