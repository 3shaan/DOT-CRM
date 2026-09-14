using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class CustomerContact : BaseEntity
{

    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public required string Name { get; set; }
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Position { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string Notes { get; set; } = null!;
}
