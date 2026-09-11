using CRM.Application.Auth.DTOs;

namespace CRM.Application.Auth.Common.Interface;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);


    // login
    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    // refresh token
    Task<AuthResponse> RefreshTokenAsync(
        string refreshToken,
        string? ipAddress,
        CancellationToken cancellationToken = default);

    // get current userk

    Task<UserResponse> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken = default);

    // logout
    Task LogoutAsync(
       string refreshToken,
       CancellationToken cancellationToken = default);

}
