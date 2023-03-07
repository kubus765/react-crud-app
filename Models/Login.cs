using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;


namespace web_app_crud_contacts.Models
{
    public class Login
    {
        [Key]
        public int ID { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? access_token { get; set; }
    }
} 