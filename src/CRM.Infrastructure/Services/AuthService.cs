using CRM.Application.Auth.Common.Interface;
using CRM.Application.Auth.DTOs;
using CRM.Application.Common.Interface;
using CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CRM.Infrastructure.Services;

public sealed class AuthService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenService jwtTokenService) : IAuthService
{



    public async Task<UserResponse> GetCurrentUserAsync(
      Guid userId,
      CancellationToken cancellationToken = default)
    {
        ApplicationUser? user = await userManager.FindByIdAsync(userId.ToString());

        if (user is null)
            throw new UnauthorizedAccessException("User not found");

        return new UserResponse
        {
            Id = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
        };
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var user = await userManager.FindByEmailAsync(email);

        if (user is null)
            throw new UnauthorizedAccessException("Invalid email or password");

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);

        if (!passwordValid)
            throw new UnauthorizedAccessException("Invalid email or password");

        user.LastLoginAt = DateTime.UtcNow;

        await userManager.UpdateAsync(user);

        return await CreateAuthResponseAsync(user);
    }


    private async Task<AuthResponse> CreateAuthResponseAsync(ApplicationUser user)
    {
        var roles = await userManager.GetRolesAsync(user);

        var (token, expiresAt) = await jwtTokenService.GenerateAccesTokenAsync(
            user.Id,
            user.Email!,
            roles);

        return new AuthResponse
        {
            AccessToken = token,
            RefreshToken = String.Empty, // TODO: Implement refresh token generation
            AccessTokenExpiresAt = expiresAt,
            User = new UserResponse
            {
                Id = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
            }
        };
    }



    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var existingUser = await userManager.FindByEmailAsync(email);

        if (existingUser is not null)
            throw new InvalidOperationException("Email is already registered");

        var newUser = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            Email = email,
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName?.Trim(),
            UserName = email.Split('@')[0],
            CreatedAt = DateTime.UtcNow,

        };

        var result = await userManager.CreateAsync(newUser, request.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join(
                ", ",
                result.Errors.Select(x => x.Description));

            throw new InvalidOperationException(errors);
        }

        // new role for the user
        await userManager.AddToRoleAsync(newUser, "User");

        return await CreateAuthResponseAsync(newUser);


    }
}
