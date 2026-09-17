using CRM.Application.Lead.DTOs;
using Mapster;
using LeadEntity = CRM.Domain.Entity.Lead;

namespace CRM.Application.Lead.Mapping;

public class LeaderMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<LeadEntity, LeadResponseDto>();

        config.Compile();
    }
}
