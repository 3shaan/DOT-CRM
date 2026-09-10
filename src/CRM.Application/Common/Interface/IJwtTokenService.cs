namespace CRM.Application.Common.Interface;

public interface IJwtTokenService
{

    Task<(String Token, DateTime ExpiresAt)> GenerateAccesTokenAsync(
    Guid UserId,
    String Email,
    IList<String> roles
    );

}
