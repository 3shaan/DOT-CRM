using System.Security.Claims;
using CRM.Application.Auth.Common.Interface;
using CRM.Application.Auth.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    // register the user
    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.RegisterAsync(request, cancellationToken);

        return Ok(result);
    }

    // login the user

    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await authService.LoginAsync(request, cancellationToken);

        return Ok(result);
    }


    // rotate refresh token
    [AllowAnonymous]
    [HttpPost("refresh")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponse>> Refresh(RefreshTokenRequest request, CancellationToken cancellationToken)
    {

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

        var result = await authService.RefreshTokenAsync(request.RefreshToken, ipAddress, cancellationToken);

        return Ok(result);
    }

    // logout the user
    [AllowAnonymous]
    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Logout(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        await authService.LogoutAsync(request.RefreshToken, cancellationToken);
        return NoContent();
    }



    // me route to get the current user
    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<UserResponse>> Me(CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var result = await authService.GetCurrentUserAsync(userId, cancellationToken);

        return Ok(result);
    }
}
