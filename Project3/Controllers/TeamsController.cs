using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teams>>> GetTeams()
        {
            return await _context.Teams.Include(m => m.Players).ToListAsync();
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teams>> GetTeams(int id)
        {
            var teams = await _context.Teams.Include(m => m.Players).FirstOrDefaultAsync(e => e.ID == id);

            if (teams == null)
            {
                return NotFound();
            }

            return teams;
        }
        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Teams>> PostTeams(Teams teams)
        {
            _context.Teams.Add(teams);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeams", new { id = teams.ID }, teams);
        }
    }
}
