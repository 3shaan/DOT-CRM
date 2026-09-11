using System.ComponentModel.DataAnnotations;

namespace CRM.Application.Auth.DTOs;

public sealed class RefreshTokenRequest
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
