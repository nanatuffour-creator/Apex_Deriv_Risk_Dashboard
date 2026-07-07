using System;

namespace Apex_Deriv_Server.Models
{
    public class Assets
    {
        public int AssetId { get; set; }

        public string AssetName { get; set; }

        public string AssetType { get; set; }

        public decimal CurrentPrice { get; set; }
    }
}