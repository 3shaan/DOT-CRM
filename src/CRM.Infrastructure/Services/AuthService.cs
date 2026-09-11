using CRM.Application.Auth.Common.Interface;
using CRM.Application.Auth.DTOs;
using CRM.Application.Common.Interface;
using CRM.Infrastructure.Identity;
using CRM.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CRM.Infrastructure.Services;

public sealed class AuthService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenService jwtTokenService,
        RefreshTokenService refreshTokenService,
        IOptions<JwtOptions> jwtOptions,
        ApplicationDbContext dbContext

        ) : IAuthService
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

        return await CreateAuthResponseAsync(user, null);
    }


    private async Task<AuthResponse> CreateAuthResponseAsync(ApplicationUser user, string? ipAddress = null)
    {
        var roles = await userManager.GetRolesAsync(user);

        var (token, expiresAt) = await jwtTokenService.GenerateAccesTokenAsync(
            user.Id,
            user.Email!,
            roles);


        var rawRefreshToken = refreshTokenService.GenerateToken();

        var hashedRefreshToken = refreshTokenService.HashToken(rawRefreshToken);

        var refreshToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = hashedRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(jwtOptions.Value.RefreshTokenExpirationDays),
            CreatedAt = DateTime.UtcNow,
            CreatedByIp = ipAddress,
        };

        await dbContext.RefreshTokens.AddAsync(refreshToken);
        await dbContext.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = token,
            RefreshToken = rawRefreshToken,
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

        return await CreateAuthResponseAsync(newUser, null);


    }

    public async Task<AuthResponse> RefreshTokenAsync(string refreshToken, string? ipAddress, CancellationToken cancellationToken = default)
    {
        var hashedRefreshToken = refreshTokenService.HashToken(refreshToken);

        var existingRefreshToken = await dbContext.RefreshTokens.FirstOrDefaultAsync(x => x.TokenHash == hashedRefreshToken, cancellationToken);

        if (existingRefreshToken is null)
            throw new UnauthorizedAccessException("Invalid refresh token");

        if (!existingRefreshToken.IsActive)
            throw new UnauthorizedAccessException("Refresh token is Expired or revoked");


        var user = await userManager.FindByIdAsync(existingRefreshToken.UserId.ToString());

        if (user is null)
            throw new UnauthorizedAccessException("User not found");

        // rotate refresh token
        existingRefreshToken.RevokedAt = DateTime.UtcNow;

        var newRawRefreshToken = refreshTokenService.GenerateToken();

        var newHashedRefreshToken = refreshTokenService.HashToken(newRawRefreshToken);

        var newRefreshToken = new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = newHashedRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(jwtOptions.Value.RefreshTokenExpirationDays),
            CreatedAt = DateTime.UtcNow,
            CreatedByIp = ipAddress,
        };

        dbContext.RefreshTokens.Add(newRefreshToken);

        var roles = await userManager.GetRolesAsync(user);

        var (accessToken, accessTokenExpiresAt) = await jwtTokenService.GenerateAccesTokenAsync(
            user.Id,
            user.Email!,
            roles);

        await dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = newRawRefreshToken,
            AccessTokenExpiresAt = accessTokenExpiresAt,
            User = new UserResponse
            {
                Id = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
            }
        };


    }

    public Task LogoutAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
