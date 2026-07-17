using System;
using System.ComponentModel.DataAnnotations;

namespace Apex_Deriv_Server.Models
{
    public class Portfolio
    {
        [Key]
        public int PortfolioId { get; set; }

        public string PortfolioName { get; set; } = string.Empty;

        public decimal TotalValue { get; set; }

        public string UserId { get; set; } = string.Empty;

        public UserModel? User { get; set; }

        public ICollection<Holding> Holdings { get; set; } = new List<Holding>();

        public ICollection<Trade> Trades { get; set; } = new List<Trade>();
    }
}