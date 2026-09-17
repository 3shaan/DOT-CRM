using CRM.Application.Company.DTOs;
using Mapster;
using CompanyEntity = CRM.Domain.Entity.Company;

namespace CRM.Application.Company.Mapping;

public class CompanyMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<CompanyEntity, CompanyResponseDto>();

    }

}
