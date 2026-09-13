using System.ComponentModel.DataAnnotations;

namespace CRM.Application.Auth.DTOs;

public sealed class RefreshTokenRequest
{
    public string? RefreshToken { get; set; } = string.Empty;
}
