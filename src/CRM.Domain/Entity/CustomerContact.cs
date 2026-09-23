using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class CustomerContact : BaseEntity
{

    public Guid CustomerId { get; set; }
    public required Customer Customer { get; set; }

    public required string Name { get; set; }
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
    public string? Position { get; set; }
    public string? Department { get; set; }
    public string? Notes { get; set; }
}
