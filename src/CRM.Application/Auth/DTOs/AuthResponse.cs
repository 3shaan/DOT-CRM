namespace CRM.Application.Auth.DTOs;

public sealed class AuthResponse
{

    public UserResponse User { get; set; } = null!;

    public string AccessToken { get; set; } = string.Empty;

    public string RefreshToken { get; set; } = string.Empty;

    public DateTime AccessTokenExpiresAt { get; set; }


}
