
using CRM.Domain.Common;

namespace CRM.Domain.Entity;

public class Lead : BaseEntity
{
    public required string Name { get; set; }

    public string? CompanyName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public LeadStatus Status { get; set; }

    public LeadSource Source { get; set; }


    public string? Notes { get; set; }

    public Guid? AssignedToUserId { get; set; }

    // public ApplicationUser? AssignedToUser { get; set; }

    public DateTime? NextFollowUpDate { get; set; }
}


public enum LeadStatus
{
    New,
    Contacted,
    Qualified,
    Unqualified,
    Converted,
    Lost
}

public enum LeadSource
{
    Website,
    Referral,
    SocialMedia,
    Phone,
    Email,
    Advertisement,
    Other
}