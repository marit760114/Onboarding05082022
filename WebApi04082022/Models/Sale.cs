using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi04082022.Models
{
    public class Sale
    {
        public int ID { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
    }
}
