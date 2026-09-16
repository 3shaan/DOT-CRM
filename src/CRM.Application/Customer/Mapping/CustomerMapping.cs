using CRM.Application.Customer.DTOs;
using Mapster;
using CustomerEntity = CRM.Domain.Entity.Customer;

namespace CRM.Application.Customer.Mapping;

public class CustomerMapping : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<CustomerEntity, CustomerResponseDto>()
            .Map(
    dest => dest.CompanyName,
    src => src.Company != null ? src.Company.Name : null
    );
    }
}
