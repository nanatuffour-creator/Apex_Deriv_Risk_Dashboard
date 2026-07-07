using System;
using System.ComponentModel.DataAnnotations;

namespace Apex_Deriv_Server.Models
{
    public class UserModel
    {
        [Key]
        public string UserId {get;set;} = string.Empty;
        [Required]
        [MaxLength(50)]
        public string FirstName{ get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string LastName{ get; set; } = string.Empty;
        [Required]
        [MinLength(8)]
        [MaxLength(100)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}