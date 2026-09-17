using CRM.Application.Lead.DTOs;
using CRM.Application.Lead.Interface;
using CRM.Domain.Entity;
using CRM.Infrastructure.Persistence;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Services;

public class LeadService(ApplicationDbContext dbContext, IMapper mapper) : ILeadService
{
    public async Task<LeadResponseDto> CreateLeadAsync(LeadCreateDTO leadCreateDTO, CancellationToken cancellationToken = default)
    {
        var lead = mapper.Map<Lead>(leadCreateDTO);
        await dbContext.Leads.AddAsync(lead, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<LeadResponseDto>(lead);
    }

    public async Task<LeadResponseDto> DeleteLeadAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lead = await dbContext.Leads.FindAsync([id], cancellationToken);
        if (lead is null)
        {
            throw new DllNotFoundException("Lead not found");
        }
        dbContext.Leads.Remove(lead);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<LeadResponseDto>(lead);
    }

    public async Task<List<LeadResponseDto>> GetAllLeadsAsync(CancellationToken cancellationToken = default)
    {
        var leads = await dbContext.Leads.ToListAsync(cancellationToken);
        return mapper.Map<List<LeadResponseDto>>(leads);
    }

    public async Task<LeadResponseDto> GetLeadByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lead = await dbContext.Leads.FindAsync([id], cancellationToken);
        if (lead is null)
        {
            throw new DllNotFoundException("Lead not found");
        }
        return mapper.Map<LeadResponseDto>(lead);
    }

    public async Task<LeadResponseDto> UpdateLeadAsync(LeadUpdateDTO leadUpdateDTO, CancellationToken cancellationToken = default)
    {
        var lead = await dbContext.Leads.FindAsync([leadUpdateDTO.Id], cancellationToken);
        if (lead is null)
        {
            throw new DllNotFoundException("Lead not found");
        }
        mapper.Map(leadUpdateDTO, lead);
        await dbContext.SaveChangesAsync(cancellationToken);
        return mapper.Map<LeadResponseDto>(lead);
    }
}
