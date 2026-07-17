using System;
using Apex_Deriv_Server.DTOs;
using Apex_Deriv_Server.Models;

namespace Apex_Deriv_Server.Interfaces
{
    public interface IUserInterface
    {
        Task<string> CreateUserAsync(UserDto user);
        Task<string> VerifyUser(UserLoginDto userLoginDto);
    }
}