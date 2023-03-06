using System;
using Newtonsoft.Json;


namespace web_app_crud_contacts.Models
{
    public class Login
    {
        public string? username { get; set; }
        public string? password { get; set; }
        public string? access_token { get; set; }
    }
} 