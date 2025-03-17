using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TimeEngine.Core.Domain;
using TimeEngine.Core.Domain.userJwt;

public class TimeEngineContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public TimeEngineContext(DbContextOptions<TimeEngineContext> options)
        : base(options)
    {
    }

    // DbSety dla Identity (opcjonalnie)
    public DbSet<ApplicationUser> AspNetUsers { get; set; }

    // DbSety dla twoich encji domenowych
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<AuditEvent> AuditEvents { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // WAŻNE dla Identity!

         // Konfiguracja encji User
        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.ToTable("AspNetUsers");
        });
        
         modelBuilder.Entity<IdentityRole<Guid>>(entity =>
        {
            entity.ToTable("AspNetRoles"); // Przechowywanie ról jako Guid
        });
        
        // Konfiguracja encji User
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.UserName).HasMaxLength(100).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(200).IsRequired();
        });

        // Mapa Task i Project
        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("Projects");
            entity.HasKey(x => x.Id);
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.ToTable("Tasks");
            entity.HasKey(x => x.Id);
            
            entity.HasOne(t => t.AssignedUser)
                .WithMany()
                .HasForeignKey(t => t.AssignedUserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Mapa AuditEvent
        modelBuilder.Entity<AuditEvent>(entity =>
        {
            entity.ToTable("AuditEvents");
            entity.HasKey(x => x.Id);
        });
    }
}
