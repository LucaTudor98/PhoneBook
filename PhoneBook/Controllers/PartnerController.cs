﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Helpers;
using PhoneBook.Models;

namespace PhoneBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        private readonly PartnerContext _partnerContext;
        public PartnerController(PartnerContext partnerContext)
        {
            _partnerContext = partnerContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartners()
        {
            if(_partnerContext.Partners == null)
            {
                return NotFound();
            }

            return await _partnerContext.Partners.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Partner>> GetPartner(int id)
        {
            if (_partnerContext.Partners == null)
            {
                return NotFound();
            }

            var partner = await _partnerContext.Partners.FindAsync(id);

            if (partner == null)
            {
                return NotFound();
            }

            return partner;
        }

        [HttpPost()]
        public async Task<ActionResult<Partner>> PostPartner(Partner partner)
        {
            _partnerContext.Partners.Add(partner);
            await _partnerContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPartner), new {id = partner.ID}, partner);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> PutPartner(int id, Partner partner)
        {
            if (id != partner.ID)
            {
                return BadRequest();
            }

            _partnerContext.Entry(partner).State = EntityState.Modified;

            try
            {
                await _partnerContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex) 
            {
                throw ex;
            }

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeletePartner(int id)
        {
            if (_partnerContext.Partners == null)
            {
                return NotFound();
            }

            var employee = await _partnerContext.Partners.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _partnerContext.Partners.Remove(employee);
            await _partnerContext.SaveChangesAsync();

            return Ok();
        }
    }
}
