using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project3.Data;
using Project3.Models;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RugbyUnionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RugbyUnionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RugbyUnions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RugbyUnion>>> GetRugbyUnions()
        {
            return await _context.RugbyUnions.Include(m => m.Teams).ToListAsync();
        }
    }
}
