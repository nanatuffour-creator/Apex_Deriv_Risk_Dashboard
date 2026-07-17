using System;
using System.ComponentModel.DataAnnotations;

namespace Apex_Deriv_Server.Models
{
    public class Asset
    {
        [Key]
        public int AssetId { get; set; }

        public string AssetName { get; set; } = string.Empty;

        public string AssetType { get; set; } = string.Empty;

        public decimal CurrentPrice { get; set; }

        public string Currency { get; set; } = string.Empty;

        public ICollection<Holding> Holdings { get; set; } = new List<Holding>();

        public ICollection<Derivative> Derivatives { get; set; } = new List<Derivative>();
    }
}