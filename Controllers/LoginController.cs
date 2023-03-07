using Azure.Core;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using web_app_crud_contacts.Models;
using static System.Net.WebRequestMethods;

//This code is a C# class that defines a controller for a RESTful API.
//It uses the ASP.NET Core attribute [Route] to specify the route prefix for the controller's actions,
//and [ApiController] to indicate that it should automatically handle model validation errors.
//It also has a constructor that takes an instance of ContactContext, which is used to interact with the database.

namespace web_app_crud_contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ContactContext _loginContext;
        public LoginController(ContactContext loginContext)
        {
            _loginContext = loginContext;
        }

        // This is a HTTP GET request method for retrieving username and password from the database.
        // It checks if there are any available and returns a 404 Not Found status if there are none.
        // Otherwise, it returns a list in the response.

        [HttpPost("login/{username}/{password}")]
        public async Task<ActionResult<string>> PostLogin(string username, string password)
        {
            if (username == "" || password == "")
            {
                return "Empty data";
            }

            var login = _loginContext.Users.Where<Login>(user => user.username == username && user.password == password).FirstOrDefault();
            
            if (login == null)
            {
                return "User not found";
            }

            return login.access_token;
        }
        // 
        [HttpPost("verify_token/{token}")]
        public async Task<ActionResult<bool>> PostToken(string token)
        {
            if (token == "" || token == null)
            {
                return false;
            }

            var _token = _loginContext.Users.Where<Login>(_token => _token.access_token == token).FirstOrDefault();

            if (_token == null)
            {
                return false;
            }

            return true;
        }

    }

}