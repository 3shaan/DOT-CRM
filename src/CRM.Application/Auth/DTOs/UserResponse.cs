namespace CRM.Application.Auth.DTOs;

public sealed class UserResponse
{

    public Guid Id { get; set; }

    public required string FirstName { get; set; }

    public string? LastName { get; set; }

    public required string Email { get; set; }

}
