using CRM.Domain.Entity;

namespace CRM.Application.Customer.DTOs;

public record CustomerResponseDto
{

    public Guid Id { get; set; }
    public CustomerType Type { get; set; }

    public Guid? CompanyId { get; set; }

    // public Company? Company { get; set; }
    public string? CompanyName { get; set; }

    public required string Name { get; set; }

    public required string Code { get; set; }

    public CustomerStatus Status { get; set; }

    public string? Source { get; set; }

    public List<CustomerContactResponseDto> Contacts { get; set; } = [];

    public List<CustomerAddressResponseDto> Addresses { get; set; } = [];
}

public record CustomerContactResponseDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Position { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string Notes { get; set; } = null!;
}

public record CustomerAddressResponseDto
{
    public Guid Id { get; set; }
    public string AddressLine1 { get; set; } = null!;
    public string AddressLine2 { get; set; } = null!;
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string Zip { get; set; } = null!;
    public string Country { get; set; } = null!;
}
