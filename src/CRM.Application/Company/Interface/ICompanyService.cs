using CRM.Application.Company.DTOs;

namespace CRM.Application.Company.Interface;

public interface ICompanyService
{
    public Task<List<CompanyResponseDto>> GetAllCompanies(CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> GetCompanyById(Guid id, CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> CreateCompany(CompanyAddRequestDto companyRequestDto, CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> UpdateCompany(Guid id, CompanyUpdateDto companyRequestDto, CancellationToken cancellationToken = default);

    public Task<CompanyResponseDto> DeleteCompany(Guid id, CancellationToken cancellationToken = default);
}
