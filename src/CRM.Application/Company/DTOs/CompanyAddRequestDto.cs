using System.ComponentModel.DataAnnotations;

namespace CRM.Application.Company.DTOs;

public record CompanyAddRequestDto(
    [ Required(ErrorMessage = "Name is required")]
    string Name,

    string? Industry,

    [ Url(ErrorMessage = "Invalid website URL")]
    string? Website,

    [ Required(ErrorMessage = "Email is required")]
    [ EmailAddress(ErrorMessage = "Invalid email address")]
    string Email,

    [ Phone(ErrorMessage = "Invalid phone number")]
    string? Phone
);
