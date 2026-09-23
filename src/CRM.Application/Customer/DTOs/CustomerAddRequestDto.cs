using CRM.Domain.Entity;

namespace CRM.Application.Customer.DTOs;

public record CustomerAddRequestDto
{
    public CustomerType Type { get; set; }

    public Guid? CompanyId { get; set; }

    public required string Name { get; set; }

    public required string Code { get; set; }

    public CustomerStatus Status { get; set; }

    public string? Source { get; set; }

    // public List<CustomerContact> Contacts { get; set; } = [];
    public List<CustomerContactAddRequestDto> Contacts { get; set; } = [];
    // public List<CustomerAddress> Addresses { get; set; } = [];
    public List<CustomerAddressAddRequestDto> Addresses { get; set; } = [];
}


public record CustomerContactAddRequestDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public string? Position { get; set; }
    public string? Department { get; set; }
    public string? Notes { get; set; }
}

public record CustomerAddressAddRequestDto
{
    public string AddressLine1 { get; set; } = null!;
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    public string Country { get; set; } = null!;
}