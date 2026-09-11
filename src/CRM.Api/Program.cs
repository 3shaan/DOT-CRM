using System.Text;
using CRM.Api.Transformers;
using CRM.Infrastructure;
using CRM.Infrastructure.Identity;
using CRM.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;


var builder = WebApplication.CreateBuilder(args);

// =============
//services
// =============


builder.Services.AddControllers();

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
    options.AddOperationTransformer<AuthorizeOperationTransformer>();
});

// infrastructure services
builder.Services.AddInfrastructure(builder.Configuration);

//jwt 
var jwtSettings = builder.Configuration.GetSection(JwtOptions.SectionName);

var jwtSecret = jwtSettings["Secret"];

if (string.IsNullOrWhiteSpace(jwtSecret))
{
    throw new InvalidOperationException("JWT Secret is not set.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ValidateIssuer = true,

        ValidIssuers = [jwtSettings["Issuer"]],
        ValidateAudience = true,
        ValidAudiences = [jwtSettings["Audience"]],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromSeconds(30),
    };
});

builder.Services.AddAuthorization();

// corse for web app

builder.Services.AddCors(options =>
{
    options.AddPolicy("WebApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowCredentials()
    .AllowAnyHeader()
    .AllowAnyMethod();
    });
});


var app = builder.Build();


// ============
//middleware
// ============

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .AddPreferredSecuritySchemes("Bearer")
            .AddHttpAuthentication("Bearer", _ => { });
    });

}


app.UseHttpsRedirection();
app.UseCors("WebApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


// --------------------------------------------------
// Seed Identity
// --------------------------------------------------

using (var scope = app.Services.CreateScope())
{
    await IdentitySeeder.SeedAsync(
        scope.ServiceProvider);
}



app.Run();


