using System.Security.Cryptography;
using System.Text;

namespace CRM.Infrastructure.Services;

public sealed class RefreshTokenService
{
    public string GenerateToken()
    {
        var randomBytes = new byte[64];

        RandomNumberGenerator.Fill(randomBytes);

        var token = Convert.ToBase64String(randomBytes);

        return token;
    }

    public string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));

        return Convert.ToHexString(bytes);
    }


}
