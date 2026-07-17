using System;
using Apex_Deriv_Server.DTOs;
using Apex_Deriv_Server.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace Apex_Deriv_Server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AssetsController(IAssetInterface assetService) : ControllerBase
    {
        private readonly IAssetInterface _assetService = assetService;

        [HttpPost("add-assets")]
        public async Task<IActionResult> AddAssets([FromBody] AssetDto assetsDto)
        {
            try
            {
                await _assetService.AddAssetsAsync(assetsDto);
                return Ok(new { message = "Asset added successfully" });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}