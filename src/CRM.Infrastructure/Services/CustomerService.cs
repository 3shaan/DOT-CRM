using CRM.Application.Customer.DTOs;
using CRM.Application.Customer.Interface;
using CRM.Domain.Entity;
using CRM.Infrastructure.Persistence;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Services;

public class CustomerService(ApplicationDbContext dbContext, IMapper mapper) : ICustomerService
{
    public async Task<CustomerResponseDto> AddAsync(CustomerAddRequestDto customerAddRequestDto, CancellationToken cancellationToken = default)
    {
        var customer = mapper.Map<Customer>(customerAddRequestDto);
        await dbContext.Customers.AddAsync(customer, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(customer.Id, cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var customer = await GetByIdAsync(id, cancellationToken);
        dbContext.Customers.Remove(mapper.Map<Customer>(customer));
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<List<CustomerResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var customers = await dbContext.Customers.AsNoTracking()
        .Include(c => c.Company)
        .Include(c => c.Contacts)
        .Include(c => c.Addresses)
        .ToListAsync(cancellationToken);

        return mapper.Map<List<CustomerResponseDto>>(customers);
    }

    public async Task<CustomerResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var customer = await dbContext.Customers.AsNoTracking()
        .Include(c => c.Company)
        .Include(c => c.Contacts)
        .Include(c => c.Addresses)
        .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

        if (customer is null)
        {
            throw new DllNotFoundException(
                $"Customer with ID '{id}' was not found."
            );
        }


        return mapper.Map<CustomerResponseDto>(customer);

    }

    public async Task<CustomerResponseDto> UpdateAsync(Guid id, CustomerUpdateRequestDto customerUpdateRequestDto, CancellationToken cancellationToken = default)
    {
        var customer = await GetByIdAsync(id, cancellationToken);
        mapper.Map(customerUpdateRequestDto, customer);
        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(customer.Id, cancellationToken);
    }
}
