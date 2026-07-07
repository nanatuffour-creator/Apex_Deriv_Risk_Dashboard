using System;

namespace Apex_Deriv_Server.Models
{
    public class Deriv
    {
        public int DerivativeId { get; set; }

        public string DerivativeName { get; set; }

        public string DerivativeType { get; set; }

        public decimal CurrentPrice { get; set; }
    }
}