using Microsoft.EntityFrameworkCore;

namespace ContactListDb;

public class ContactListDbContext : DbContext
{
    public DbSet<ContactEntity> Contacts { get; init; } = null!;
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var host = Environment.GetEnvironmentVariable("CONTACT_LIST_DB_HOST") ?? throw new Exception("CONTACT_LIST_DB_HOST is not set");
        var port = Environment.GetEnvironmentVariable("CONTACT_LIST_DB_PORT") ?? throw new Exception("CONTACT_LIST_DB_PORT is not set");
        var user = Environment.GetEnvironmentVariable("CONTACT_LIST_DB_USER") ?? throw new Exception("CONTACT_LIST_DB_USER is not set");
        var password = Environment.GetEnvironmentVariable("CONTACT_LIST_DB_PASSWORD") ?? throw new Exception("CONTACT_LIST_DB_PASSWORD is not set");
        var name = Environment.GetEnvironmentVariable("CONTACT_LIST_DB_NAME") ?? throw new Exception("CONTACT_LIST_DB_NAME is not set");
        optionsBuilder.UseNpgsql($"Host={host};Port={port};Database={name};Username={user};Password={password}");  
    } 
}