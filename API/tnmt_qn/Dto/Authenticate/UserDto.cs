﻿namespace tnmt_qn.Dto
{
    public class UserDto
    {
        public string? Id { get; set; } = string.Empty;
        public string? UserName { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
        public string? ConfirmPassword { get; set; } = string.Empty;
        public DateTime? LastPasswordChangedDate { get; set; }
        public string? FullName { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
        public List<PermissionDto>? Permission { get; set; }
    }

    public class PasswordChange
    {
        public string currentPassword { get; set; } = string.Empty;
        public string newPassword { get; set; } = string.Empty;
        public string newConfirmPassword { get; set; } = string.Empty;
    }

    public class PasswordChangeResult
    {
        public bool Succeeded { get; set; }
        public string? Message { get; set; }

        public PasswordChangeResult(bool succeeded, string? message)
        {
            Succeeded = succeeded;
            Message = message;
        }
    }


    public class FormFilterUser
    {
        public string? UserName { get; set; }
    }
}
