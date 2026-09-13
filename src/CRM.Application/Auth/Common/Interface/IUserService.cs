using CRM.Application.Auth.DTOs;

namespace CRM.Application.Auth.Common.Interface;

public interface IUserService
{
    Task<List<UserResponse>> GetAllUsersAsync(CancellationToken cancellationToken = default);

    Task<UserResponse?> GetUserByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<UserResponse?> GetByEmailAsync(
           string email,
           CancellationToken cancellationToken = default);



}
