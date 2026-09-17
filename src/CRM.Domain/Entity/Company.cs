using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class Company : BaseEntity
{
    public required string Name { get; set; }

    public string? Industry { get; set; }
    public string? Website { get; set; }

    public required string Email { get; set; }

    public string? Phone { get; set; }

}
