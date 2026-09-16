using CRM.Domain.Entity;

namespace CRM.Application.Customer.DTOs;

public record CustomerUpdateRequestDto
{
    public CustomerType Type { get; set; }

    public Guid? CompanyId { get; set; }

    public Company? Company { get; set; }

    public required string Name { get; set; }

    public required string Code { get; set; }

    public CustomerStatus Status { get; set; }

    public string? Source { get; set; }

    public List<CustomerContactUpdateRequestDto> Contacts { get; set; } = [];

    public List<CustomerAddressUpdateRequestDto> Addresses { get; set; } = [];
}

public record CustomerContactUpdateRequestDto : CustomerContactAddRequestDto
{
    public Guid Id { get; set; }
}

public record CustomerAddressUpdateRequestDto : CustomerAddressAddRequestDto
{
    public Guid Id { get; set; }
}
