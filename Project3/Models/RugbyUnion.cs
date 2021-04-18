using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Project3.Models
{
    public class RugbyUnion
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Teams> Teams { get; set; }

        public RugbyUnion()
        {
            this.Teams = new HashSet<Teams>();
        }

    }
}
