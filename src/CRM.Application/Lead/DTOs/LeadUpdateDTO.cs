using System.ComponentModel.DataAnnotations;
using CRM.Domain.Entity;

namespace CRM.Application.Lead.DTOs;

public record LeadUpdateDTO(
    [Required(ErrorMessage = "Id is required")]
    Guid Id,

     [Required(ErrorMessage = "Name is required")]
     [MaxLength(200, ErrorMessage = "Name must be less than 200 characters")]
     string Name,

     string? CompanyName,

    [EmailAddress(ErrorMessage = "Invalid email address")]
     string? Email,

    [Phone(ErrorMessage = "Invalid phone number")]
     string? Phone,

     [Required(ErrorMessage = "Status is required")]
     LeadStatus Status,

     [Required(ErrorMessage = "Source is required")]
     LeadSource Source,

     string? Notes,

     Guid? AssignedToUserId,

     // public ApplicationUser? AssignedToUser { get; set; }

     DateTime? NextFollowUpDate

);
