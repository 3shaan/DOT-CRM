using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class Customer : BaseEntity
{
    public CustomerType Type { get; set; }

    public Guid? CompanyId { get; set; }

    public Company? Company { get; set; }



    public required string Name { get; set; }

    public required string Code { get; set; }

    public CustomerStatus Status { get; set; }

    public string? Source { get; set; }


}

//enum for customer type
public enum CustomerType
{
    Individual,
    Company
}

//enum for customer status
public enum CustomerStatus
{
    Active,
    Inactive,
}