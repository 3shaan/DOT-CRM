using CRM.Application.Company.DTOs;

namespace CRM.Application.Company.Interface;

public interface ICompanyService
{
    public Task<List<CompanyResponseDto>> GetAllCompanies(CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> GetCompanyById(int id, CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> CreateCompany(CompanyAddRequestDto companyRequestDto, CancellationToken cancellationToken = default);
    public Task<CompanyResponseDto> UpdateCompany(int id, CompanyUpdateDto companyRequestDto, CancellationToken cancellationToken = default);

    public Task<CompanyResponseDto> DeleteCompany(int id, CancellationToken cancellationToken = default);
}
