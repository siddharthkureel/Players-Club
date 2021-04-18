using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Project3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project3.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<Players> Players { get; set; }
        public DbSet<Teams> Teams { get; set; }
        public DbSet<RugbyUnion> RugbyUnions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Teams>().HasKey(l => l.ID);
            modelBuilder.Entity<Players>().HasKey(r => r.ID);
            modelBuilder.Entity<RugbyUnion>().HasKey(d => d.ID);
            modelBuilder.Seed();
        }
    }
}
