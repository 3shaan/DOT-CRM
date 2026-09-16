using CRM.Application.Customer.DTOs;
using CRM.Application.Customer.Interface;
using CRM.Infrastructure.Persistence;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Services;

public class CustomerService(ApplicationDbContext dbContext, IMapper mapper) : ICustomerService
{
    public Task<CustomerResponseDto> AddAsync(CustomerAddRequestDto customerAddRequestDto, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerResponseDto> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<List<CustomerResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var customers = await dbContext.Customers
        .Include(c => c.Company)
        .Include(c => c.Contacts)
        .Include(c => c.Addresses)
        .ToListAsync(cancellationToken);

        return mapper.Map<List<CustomerResponseDto>>(customers);
    }

    public Task<CustomerResponseDto> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<CustomerResponseDto> UpdateAsync(Guid id, CustomerUpdateRequestDto customerUpdateRequestDto, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
