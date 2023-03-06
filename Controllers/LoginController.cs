using Azure.Core;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using web_app_crud_contacts.Models;
using static System.Net.WebRequestMethods;

namespace web_app_crud_contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginContext _loginContext;
        public LoginController(LoginContext loginContext)
        {
            _loginContext = loginContext;
        }
        [HttpPost]
        public async Task<ActionResult<Login>> PostLogin(Login login)
        {
            return BadRequest();
        }

}
}
