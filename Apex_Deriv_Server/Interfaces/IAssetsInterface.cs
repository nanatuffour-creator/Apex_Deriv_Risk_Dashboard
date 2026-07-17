using System;
using Apex_Deriv_Server.DTOs;

namespace Apex_Deriv_Server.Interfaces
{
    public interface IAssetInterface
    {
        Task<string> AddAssetsAsync(AssetDto assetDto);
    }
}