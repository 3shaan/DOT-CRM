using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace CRM.Infrastructure.Identity;

public static class IdentitySeeder
{
    public static async Task SeedAsync(
        IServiceProvider services)
    {
        var roleManager =
            services.GetRequiredService<
                RoleManager<IdentityRole<Guid>>>();

        var roles = new[]
        {
            "Admin",
            "Manager",
            "User"
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(
                    new IdentityRole<Guid>(role));
            }
        }
    }
}