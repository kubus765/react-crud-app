using System;

//This C# code defines a Contact class that contains properties
//for various contact details such as name, surname, email, password, phone number, category, and date of birth.
//The properties have getters and setters that allow access to their values.
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