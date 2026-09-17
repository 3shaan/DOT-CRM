namespace CRM.Application.Company.DTOs;

public record CompanyResponseDto(
  Guid Id,
  string Name,
  string Industry,
  string Website,
  string Email,
  string Phone
);
