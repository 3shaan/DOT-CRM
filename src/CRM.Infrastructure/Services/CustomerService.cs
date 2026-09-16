using CRM.Application.Customer.DTOs;
using CRM.Infrastructure.Persistence;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Services;

public class CustomerService(ApplicationDbContext dbContext, IMapper mapper)
{

    public async Task<List<CustomerResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var customers = await dbContext.Customers
        .Include(c => c.Company)
        .Include(c => c.Contacts)
        .Include(c => c.Addresses)
        .ToListAsync(cancellationToken);

        return mapper.Map<List<CustomerResponseDto>>(customers);
    }

}
