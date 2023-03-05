using System;

namespace web_app_crud_contacts.Models
{
    public class Contact
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string? Category { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
} 