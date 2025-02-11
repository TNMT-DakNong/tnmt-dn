﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using tnmt_qn.Data;
using tnmt_qn.Dto;
using System.Security.Claims;
using tnmt_qn.Service;

namespace tnmt_qn.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _repo;

        public AuthController(IAuthService repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(UserDto dto)
        {
            var res = await _repo.RegisterAsync(dto);
            if (res == true)
            {
                return Ok(new { message = "Account registered successfully" });
            }
            else
            {
                return BadRequest(new { message = "Account registration failed, this account already exists", error = true });
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginViewDto dto)
        {
            var res = await _repo.LoginAsync(dto);
            if (string.IsNullOrEmpty(res))
            {
                return BadRequest(new { message = "Account information or password is incorrect", error = true });
            }
            return Ok(res);
        }

        [HttpPost]
        [Route("change-password")]
        public async Task<ActionResult<AspNetUsers>> UpdatePassword(PasswordChange password)
        {
            var res = await _repo.UpdatePasswordAsync(password);
            if (res.Message != null)
            {
                return Ok(new { message = res.Message, succeeded = res.Succeeded });
            }
            else
            {
                return BadRequest(new { message = "Password change failed", error = true, res });
            }
        }

        [HttpPost]
        [Route("set-password")]
        public async Task<ActionResult<AspNetUsers>> SetPassword(string username, string newPassword)
        {
            var res = await _repo.SetPasswordAsync(username, newPassword);
            if (res == true)
            {
                return Ok(new { message = "Set password successfully" });
            }
            else
            {
                return BadRequest(new { message = "Setting password failed", error = true });
            }
        }

        [HttpPost]
        [Route("assign-role")]
        public async Task<ActionResult> AssignRole(AssignRoleDto dto)
        {
            var res = await _repo.AssignRoleAsync(dto);
            if (res == true)
            {
                return Ok(new { message = "Assign roles successfully" });
            }
            else
            {
                return BadRequest(new { message = "Role assignment failed", error = true });
            }

        }

        [HttpPost]
        [Route("remove-role")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> RemoveRole(AssignRoleDto dto)
        {
            var res = await _repo.RemoveRoleAsync(dto);

            if (res == true)
            {
                return Ok(new { message = "Remove roles successfully" });
            }
            else
            {
                return Ok(new { message = "Remove roles failed", error = true });
            }
        }


        [HttpPost]
        [Route("check-access-permission")]
        public async Task<bool> CheckAccessPermission([FromQuery] string userName, string linkControl, string action)
        {
            return await _repo.CheckAccessPermission(userName, linkControl, action);
        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout(HttpContext context)
        {
            var res = await _repo.LogoutAsync(context);
            if (res == false)
            {
                return BadRequest(false);
            }
            return Ok(true);
        }
    }

}
