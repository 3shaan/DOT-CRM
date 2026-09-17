using CRM.Application.Lead.DTOs;
using CRM.Application.Lead.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadController(ILeadService leadService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(List<LeadResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken = default)
    {
        var leads = await leadService.GetAllLeadsAsync(cancellationToken);
        return Ok(leads);
    }

    // get lead by id
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(LeadResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken = default)
    {
        var lead = await leadService.GetLeadByIdAsync(id, cancellationToken);
        return Ok(lead);
    }

    // create lead
    [HttpPost]
    [ProducesResponseType(typeof(LeadResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(LeadCreateDTO leadCreateDTO, CancellationToken cancellationToken = default)
    {
        var lead = await leadService.CreateLeadAsync(leadCreateDTO, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = lead.Id }, lead);
    }

    // update lead
    [HttpPut]
    [ProducesResponseType(typeof(LeadResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(LeadUpdateDTO leadUpdateDTO, CancellationToken cancellationToken = default)
    {
        var lead = await leadService.UpdateLeadAsync(leadUpdateDTO, cancellationToken);
        return Ok(lead);
    }

    // delete lead
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
    {
        await leadService.DeleteLeadAsync(id, cancellationToken);
        return NoContent();
    }
}