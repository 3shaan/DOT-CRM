using Microsoft.AspNetCore.Identity;

namespace CRM.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid>
{

    public required string FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? LastLoginAt { get; set; } = null;

}
