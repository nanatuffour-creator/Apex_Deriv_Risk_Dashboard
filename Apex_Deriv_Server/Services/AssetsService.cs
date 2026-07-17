using System;
using Apex_Deriv_Server.DataContext;
using Apex_Deriv_Server.DTOs;
using Apex_Deriv_Server.Interfaces;
using Apex_Deriv_Server.Models;
using Apex_Deriv_Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Apex_Deriv_Server.Services
{
    public class AssetsService(GenericRepo<Asset> genericRepo, ApexContext context) : IAssetInterface
    {
        private readonly GenericRepo<Asset> _genericRepo = genericRepo;
        private readonly ApexContext apexContext = context;

        public async Task<string> AddAssetsAsync(AssetDto assetsDto)
        {
            var existingAsset = await apexContext.Assets
                                                    .FirstOrDefaultAsync(a => a.AssetName == assetsDto.AssetName);

            if (existingAsset != null)
                throw new Exception("Asset already exists");

            var newAsset = new Asset
            {
                AssetName = assetsDto.AssetName,
                AssetType = assetsDto.AssetType,
                Currency = assetsDto.Currency,
                CurrentPrice = assetsDto.CurrentPrice
            };

            await _genericRepo.AddAsync(newAsset);
            await _genericRepo.SaveChangesAsync();

            return "Asset added successfully";
        }
    }
}