using CRM.Application.Customer.DTOs;
using CRM.Domain.Entity;

namespace CRM.Application.Customer.Interface;

public interface ICustomerService
{
    // get all Customers
    Task<List<CustomerResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);

    // get customer by id
    Task<CustomerResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    // add customer
    Task<CustomerResponseDto> AddAsync(CustomerAddRequestDto customerAddRequestDto, CancellationToken cancellationToken = default);

    // update customer
    Task<CustomerResponseDto> UpdateAsync(Guid id, CustomerUpdateRequestDto customerUpdateRequestDto, CancellationToken cancellationToken = default);

    // delete customer
    Task<CustomerResponseDto> DeleteAsync(Guid id, CancellationToken cancellationToken = default);

}
