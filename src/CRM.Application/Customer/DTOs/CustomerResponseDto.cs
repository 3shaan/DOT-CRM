using CRM.Domain.Entity;

namespace CRM.Application.Customer.DTOs;

public record CustomerResponseDto
{

    public Guid Id { get; set; }
    public CustomerType Type { get; set; }

    public Guid? CompanyId { get; set; }

    public Company? Company { get; set; }

    public required string Name { get; set; }

    public required string Code { get; set; }

    public CustomerStatus Status { get; set; }

    public string? Source { get; set; }

    public List<CustomerContact> Contacts { get; set; } = [];

    public List<CustomerAddress> Addresses { get; set; } = [];
}
