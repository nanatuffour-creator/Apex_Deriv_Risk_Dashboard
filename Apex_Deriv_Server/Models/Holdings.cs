using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Apex_Deriv_Server.Models
{
    public class Holding
    {
        [Key]
        public int HoldingId { get; set; }

        // Portfolio that owns this holding
        public int PortfolioId { get; set; }

        [ForeignKey(nameof(PortfolioId))]
        public Portfolio Portfolio { get; set; } = null!;

        // Asset being held
        public int AssetId { get; set; }

        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; } = null!;

        // Number of units owned
        public decimal Quantity { get; set; }

        // Average purchase price per unit
        public decimal AveragePurchasePrice { get; set; }

        // Date the position was opened
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        // Whether the holding is still active
        public bool IsActive { get; set; } = true;
    }
}