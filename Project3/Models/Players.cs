using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Models
{
    public class Players
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public int Age { get; set; }
        public string PlaceOfBirth { get; set; }

        [ForeignKey("TeamID")]
        public int TeamID { get; set; }
        public virtual Teams Team { get; set; }
    }
}
