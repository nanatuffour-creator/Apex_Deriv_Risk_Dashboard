using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Apex_Deriv_Server.DataContext;
using Apex_Deriv_Server.DTOs;
using Apex_Deriv_Server.Interfaces;
using Apex_Deriv_Server.Models;
using Apex_Deriv_Server.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Apex_Deriv_Server.Services
{
    public class UserService(ApexContext apexcontext, GenericRepo<UserModel> genericRepo, IConfiguration configuration) : IUserInterface
    {
        private readonly ApexContext _apexContext = apexcontext;
        private readonly GenericRepo<UserModel> _genericRepo = genericRepo;
        private readonly IConfiguration _configuration = configuration;
        private readonly UserModel newuser = new();
        public async Task<string> CreateUserAsync(UserDto user)
        {
            var emailExists = await _apexContext.Users.AnyAsync(u => u.Email == user.Email);
            if (emailExists)
                throw new Exception("Email already exists");
            if (user.PasswordHash != user.ConfirmPasswordHash)
                throw new Exception("Password and Confirm Password does not match");

            string newId = $"USER-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6]}";

            var passwordHash = new PasswordHasher<UserModel>().HashPassword(newuser, user.PasswordHash);

            var newUser = new UserModel
            {
                UserId = newId,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Email = user.Email,
                Password = passwordHash,
                CreatedAt = DateTime.UtcNow
            };

            await _genericRepo.AddAsync(newUser);
            await _genericRepo.SaveChangesAsync();

            return "User created successfully";
        }

        public async Task<string> VerifyUser(UserLoginDto userLoginDto)
        {
            var user = await _apexContext.Users.FirstOrDefaultAsync(u => u.Email == userLoginDto.Email) ?? throw new Exception("User not found");
            var passwordVerificationResult = new PasswordHasher<UserModel>().VerifyHashedPassword(user, user.Password, userLoginDto.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
                throw new Exception("Invalid password or username");

            return CreateToken(userLoginDto, user.UserId);
        }

        private string CreateToken(UserLoginDto userLoginDto, string userId)
        {

            var claim = new Claim[]
            {
                new(ClaimTypes.NameIdentifier, userId)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Token")!)); // Replace with your secret key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken
            (
                issuer: _configuration.GetValue<string>("Jwt:Issuer"),
                audience: _configuration.GetValue<string>("Jwt:Audience"),
                claims: claim,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}