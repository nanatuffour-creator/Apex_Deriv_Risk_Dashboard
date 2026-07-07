using System;

namespace Apex_Deriv_Server.Models
{
    public class Portfolio
    {
        public int PortfolioId { get; set; }

        public string UserId { get; set; }

        public UserModel User { get; set; }

        public string PortfolioName { get; set; }

        public decimal TotalValue { get; set; }
    }
}