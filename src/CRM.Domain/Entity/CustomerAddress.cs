using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class CustomerAddress : BaseEntity
{

    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public string AddressLine1 { get; set; } = null!;
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    public required string Country { get; set; }
}
