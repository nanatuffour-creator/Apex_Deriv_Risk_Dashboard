using System;
using System.ComponentModel.DataAnnotations;

namespace Apex_Deriv_Server.Models
{
    public class Derivative
    {
        [Key]
        public int DerivativeId { get; set; }
        public string DerivativeName { get; set; } = string.Empty;
        // Option, Future, Forward
        public string DerivativeType { get; set; } = string.Empty;
        public decimal CurrentPrice { get; set; }
        // Underlying Asset
        public int AssetId { get; set; }
        public Asset Asset { get; set; } = null!;
        // One Derivative can have many Trades
        public ICollection<Trade> Trades { get; set; } = new List<Trade>();
    }
}