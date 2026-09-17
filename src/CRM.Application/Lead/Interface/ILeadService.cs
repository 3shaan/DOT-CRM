using CRM.Application.Lead.DTOs;

namespace CRM.Application.Lead.Interface;

public interface ILeadService
{
    Task<LeadResponseDto> CreateLeadAsync(LeadCreateDTO leadCreateDTO, CancellationToken cancellationToken = default);
    Task<LeadResponseDto> GetLeadByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<LeadResponseDto> UpdateLeadAsync(LeadUpdateDTO leadUpdateDTO, CancellationToken cancellationToken = default);
    Task<LeadResponseDto> DeleteLeadAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<LeadResponseDto>> GetAllLeadsAsync(CancellationToken cancellationToken = default);
}
