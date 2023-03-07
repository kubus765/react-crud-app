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


        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
            if (_loginContext.Users == null)
            {
                return NotFound();
            }
            var login = await _loginContext.Users.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }
            return login;
        }
    }

}