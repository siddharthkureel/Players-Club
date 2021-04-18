using Microsoft.EntityFrameworkCore;
using Project3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project3.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Teams>().HasData(
                new Teams
                {
                    ID = 1,
                    Name = "Crusades",
                    Coach = "Scott Robertson",
                    Ground = "Orangetheory Stadium",
                    FoundedYear = "1996",
                    Region = "Canterbury",
                    RugbyUnionID = 1,
                },
                 new Teams
                 {
                     ID = 2,
                     Name = "Blues",
                     Coach = "Leon MacDonald",
                     Ground = "Eden Park",
                     FoundedYear = "1996",
                     Region = "Auckland",
                     RugbyUnionID = 1
                 }
            );

            modelBuilder.Entity<RugbyUnion>().HasData(
                new RugbyUnion
                {
                    ID = 1,
                    Name = "Rugby Union",
                    Description = "A player management system for Rugby Union"
                }
            );
        }
    }
}
