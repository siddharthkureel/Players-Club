using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Project3.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Teams
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Ground { get; set; }
        public string Coach { get; set; }
        public string FoundedYear { get; set; }
        public string Region { get; set; }

        [ForeignKey("RugbyUnion")]
        public int RugbyUnionID { get; set; }
        public virtual RugbyUnion RugbyUnion { get; set; }
        public virtual ICollection<Players> Players { get; set; }
        public Teams()
        {
            this.Players = new HashSet<Players>();
        }
    }
}
