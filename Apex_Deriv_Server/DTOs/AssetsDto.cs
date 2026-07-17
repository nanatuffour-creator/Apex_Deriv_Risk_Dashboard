using System;

namespace Apex_Deriv_Server.DTOs
{
    public class AssetDto
    {
        public string AssetName { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty;
        public decimal CurrentPrice { get; set; }
        public string Currency { get; set; } = string.Empty;
    }
}