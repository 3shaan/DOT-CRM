using CRM.Application.Company.DTOs;
using CRM.Application.Company.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CompanyController(ICompanyService companyService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(List<CompanyResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var companies = await companyService.GetAllCompanies(cancellationToken);
        return Ok(companies);
    }

    // get by id
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CompanyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var company = await companyService.GetCompanyById(id, cancellationToken);
        return Ok(company);
    }

    // create
    [HttpPost]
    [ProducesResponseType(typeof(CompanyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CompanyAddRequestDto companyRequestDto, CancellationToken cancellationToken)
    {
        var company = await companyService.CreateCompany(companyRequestDto, cancellationToken);
        return Ok(company);
    }

    // update   
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(CompanyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(Guid id, CompanyUpdateDto companyRequestDto, CancellationToken cancellationToken)
    {
        var company = await companyService.UpdateCompany(id, companyRequestDto, cancellationToken);
        return Ok(company);
    }

    // delete
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(CompanyResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var company = await companyService.DeleteCompany(id, cancellationToken);
        return Ok(company);
    }
}
