using System;
using System.Net.Sockets;
using Apex_Deriv_Server.DTOs;
using Apex_Deriv_Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apex_Deriv_Server.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController(IUserInterface userInterface) : ControllerBase
    {
        private readonly IUserInterface _userInterface = userInterface;

        [HttpPost("create-new-user")]
        public async Task<ActionResult<string>> CreateNewUser([FromBody] UserDto userDto)
        {
            try
            {
                var newUser = await _userInterface.CreateUserAsync(userDto);
                return Ok(new { message = newUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("verify-user")]
        public async Task<ActionResult<string>> VerifyUser([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                var verifiedUser = await _userInterface.VerifyUser(userLoginDto);
                return Ok(new { message = verifiedUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize]
        [HttpGet]
        public IActionResult AuthorAPI()
        {
            return Ok("Nana Tuffour");
        }
    }
}