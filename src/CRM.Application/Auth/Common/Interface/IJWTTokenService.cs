namespace CRM.Application.Auth.Common.Interface;

public class IJWTTokenService
{

    Task<(String Token, DateTime ExpiresAt)> GenerateAccesTokenAsync(
    Guid UserId,
    String Email,
    IList<String> roles
    );

}
