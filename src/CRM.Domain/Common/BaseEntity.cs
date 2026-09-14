namespace CRM.Domain.Common;

public class BaseEntity
{
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; } // for now, this will be used in future for soft delete. not now.

}
