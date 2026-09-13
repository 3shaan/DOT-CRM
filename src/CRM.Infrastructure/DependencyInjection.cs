using CRM.Application.Auth.Common.Interface;
using CRM.Application.Common.Interface;
using CRM.Infrastructure.Identity;
using CRM.Infrastructure.Persistence;
using CRM.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRM.Infrastructure;

public static class DependencyInjection
{

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {

        var connectionString = configuration.GetConnectionString("DefaultConnection");

        // connect to postgresql 
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));


        services.AddIdentityCore<ApplicationUser>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 5;

            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15); // Lockout for 15 minutes after 5 failed attempts
        })
        .AddRoles<IdentityRole<Guid>>()
        .AddEntityFrameworkStores<ApplicationDbContext>().AddSignInManager()
            .AddDefaultTokenProviders();


        //jwt

        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));


        //auth service

        services.AddScoped<IAuthService, AuthService>();

        // jwt token service
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        // refresh token service
        services.AddScoped<RefreshTokenService>();

        // user service
        services.AddScoped<IUserService, UserService>();


        return services;
    }

}
