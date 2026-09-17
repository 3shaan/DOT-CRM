using CRM.Application.Company.DTOs;
using CRM.Application.Company.Interface;
using CRM.Domain.Entity;
using CRM.Infrastructure.Persistence;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Services;

public class CompanyService(ApplicationDbContext dbContext, IMapper mapper) : ICompanyService
{
    public async Task<CompanyResponseDto> CreateCompany(CompanyAddRequestDto companyRequestDto, CancellationToken cancellationToken = default)
    {
        var company = mapper.Map<Company>(companyRequestDto);
        dbContext.Companies.Add(company);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<CompanyResponseDto>(company);
    }

    public async Task<CompanyResponseDto> DeleteCompany(Guid id, CancellationToken cancellationToken = default)
    {
        var company = await dbContext.Companies.FindAsync([id], cancellationToken);
        if (company == null)
        {
            throw new DllNotFoundException("Company not found");
        }
        dbContext.Companies.Remove(company);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<CompanyResponseDto>(company);
    }

    public async Task<List<CompanyResponseDto>> GetAllCompanies(CancellationToken cancellationToken = default)
    {
        var companies = await dbContext.Companies.ToListAsync(cancellationToken);
        return mapper.Map<List<CompanyResponseDto>>(companies);
    }

    public async Task<CompanyResponseDto> GetCompanyById(Guid id, CancellationToken cancellationToken = default)
    {
        var company = await dbContext.Companies.FindAsync([id], cancellationToken);
        if (company == null)
        {
            throw new DllNotFoundException("Company not found");
        }
        return mapper.Map<CompanyResponseDto>(company);
    }

    public async Task<CompanyResponseDto> UpdateCompany(Guid id, CompanyUpdateDto companyRequestDto, CancellationToken cancellationToken = default)
    {
        var company = await dbContext.Companies.FindAsync([id], cancellationToken);
        if (company == null)
        {
            throw new DllNotFoundException("Company not found");
        }
        mapper.Map(companyRequestDto, company);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<CompanyResponseDto>(company);
    }


}
