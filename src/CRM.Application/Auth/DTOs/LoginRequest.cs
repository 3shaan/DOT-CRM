namespace CRM.Application.Auth.DTOs;

public sealed class LoginRequest
{

    public required string Email { get; set; }

    public required string Password { get; set; }

}
