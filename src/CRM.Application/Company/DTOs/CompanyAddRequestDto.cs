namespace CRM.Application.Company.DTOs;

public record CompanyAddRequestDto(
  string Name,
  string? Industry,
  string? Website,
  string Email,
  string Phone
);

