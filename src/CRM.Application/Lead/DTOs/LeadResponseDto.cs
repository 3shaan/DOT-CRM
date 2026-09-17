using CRM.Domain.Entity;

namespace CRM.Application.Lead.DTOs;

public record LeadResponseDto(

      Guid Id,

     string Name,

     string? CompanyName,

     string? Email,

     string? Phone,

     LeadStatus Status,

     LeadSource Source,

     string? Notes,

     Guid? AssignedToUserId,

     // public ApplicationUser? AssignedToUser { get; set; }

     DateTime? NextFollowUpDate
);
