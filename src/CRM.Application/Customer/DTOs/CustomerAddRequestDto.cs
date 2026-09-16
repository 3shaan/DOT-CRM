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
    public required string Position { get; set; }
    public required string Department { get; set; }
    public required string Notes { get; set; }
}

public record CustomerAddressAddRequestDto
{
    public required string Address { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string Zip { get; set; }
    public required string Country { get; set; }
}