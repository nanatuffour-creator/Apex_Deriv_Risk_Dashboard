using System.ComponentModel.DataAnnotations;

namespace Apex_Deriv_Server.Models
{
    public class Trade
    {
        [Key]
        public int TradeId { get; set; }
        public decimal Quantity { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal CurrentPrice { get; set; }
        public DateTime TradeDate { get; set; }
        // BUY or SELL
        public string TradeType { get; set; } = string.Empty;
        // OPEN, CLOSED
        public string Status { get; set; } = "Open";
        // Portfolio Relationship
        public int PortfolioId { get; set; }
        public Portfolio Portfolio { get; set; } = null!;
        // Derivative Relationship
        public int DerivativeId { get; set; }
        public Derivative Derivative { get; set; } = null!;
    }
}