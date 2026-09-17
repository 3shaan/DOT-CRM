namespace CRM.Application.Company.DTOs;

public record CompanyUpdateDto(
  string Name,
  string? Industry,
  string? Website,
  string Email,
  string Phone
) : CompanyAddRequestDto(Name, Industry, Website, Email, Phone);
