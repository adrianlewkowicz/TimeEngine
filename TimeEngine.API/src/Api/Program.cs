using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TimeEngine.Core.Interfaces;
using TimeEngine.Core.Services;
using TimeEngine.Infrastructure.Interfaces;
using TimeEngine.Infrastructure.Service;

var builder = WebApplication.CreateBuilder(args);

// Dodaj usługi Swaggera
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TimeEngine API", Version = "v1" });
});

// Dodaj kontrolery
builder.Services.AddControllers();

// Dodaj DbContext
builder.Services.AddDbContext<TimeEngineContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
);

// Rejestracja DataSeeder
builder.Services.AddTransient<DataSeeder>();
builder.Services.AddScoped<ITaskEstimationService, TaskEstimationService>();
builder.Services.AddScoped<IGitHubService, GitHubService>();

var app = builder.Build();

// Użyj Swaggera w środowisku deweloperskim
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TimeEngine API v1");
        c.RoutePrefix = string.Empty; // Ustawienie Swagger na stronie głównej
    });
}

// Seedowanie danych przy starcie aplikacji
using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();
    await seeder.SeedAsync();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
