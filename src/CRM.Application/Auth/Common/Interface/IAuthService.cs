using CRM.Application.Auth.DTOs;

namespace CRM.Application.Auth.Common.Interface;

public class IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);


    // login
    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    // get current userk

    Task<UserResponse> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken = default);

}
