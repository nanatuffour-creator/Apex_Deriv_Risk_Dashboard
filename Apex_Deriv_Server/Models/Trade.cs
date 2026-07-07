using System;

namespace Apex_Deriv_Server.Models
{
    public class Trade
    {
        public int TradeId { get; set; }

        public int PortfolioId { get; set; }

        public Portfolio Portfolio { get; set; }

        public int AssetId { get; set; }

        public Assets Asset { get; set; }

        public int DerivativeTypeId { get; set; }

        public Deriv DerivativeType { get; set; }

        public decimal Quantity { get; set; }

        public decimal PurchasePrice { get; set; }

        public decimal CurrentPrice { get; set; }

        public DateTime TradeDate { get; set; }
    }
}