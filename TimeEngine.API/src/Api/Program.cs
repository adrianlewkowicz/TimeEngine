using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TimeEngine.Core.Interfaces;
using TimeEngine.Core.Services;
using TimeEngine.Infrastructure.Interfaces;
using TimeEngine.Infrastructure.Service;
using TimeEngine.ML.Services;

var builder = WebApplication.CreateBuilder(args);

// 📌 Konfiguracja Swaggera
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TimeEngine API", Version = "v1" });
});

// 📌 Rejestracja kontrolerów
builder.Services.AddControllers();

// 📌 Konfiguracja DbContext z SQL Server
builder.Services.AddDbContext<TimeEngineContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// 📌 Rejestracja usług aplikacji
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddScoped<ITaskEstimationService, TaskEstimationService>();
builder.Services.AddScoped<IGitHubService, GitHubService>();
builder.Services.AddSingleton<EstimationService>();

var app = builder.Build();

// 📌 Obsługa wyjątków i zabezpieczenia
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");  // Globalny handler błędów
    app.UseHsts();  // Wymusza HTTPS w produkcji
}

// 📌 Konfiguracja Swagger UI (dostępny w każdym środowisku)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TimeEngine API v1");
    c.RoutePrefix = string.Empty;  // Ustawienie Swaggera jako strony głównej
});

// 📌 Middleware do obsługi requestów
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

// 📌 Mapowanie kontrolerów
app.MapControllers();

// 📌 Seedowanie danych (sprawdzenie, czy baza istnieje)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TimeEngineContext>();
    if (dbContext.Database.EnsureCreated())
    {
        var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
        await seeder.SeedAsync();
    }
}

app.Run();
