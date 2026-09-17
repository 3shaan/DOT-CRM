using CRM.Application.Company.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController(ICompanyService companyService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var companies = await companyService.GetAllCompanies();
        return Ok(companies);
    }
}
