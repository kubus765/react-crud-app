using Microsoft.EntityFrameworkCore;
using System.Data;
// This is a C# code defining a database context class called "ContactContext" that inherits from the "DbContext" class provided by Entity Framework Core.
// It includes a constructor that takes a parameter of type "DbContextOptions<ContactContext>"
// to configure the database connection, and a property called "Contacts" of type "DbSet<Contact>"
// that represents a collection of contacts in the database.
namespace web_app_crud_contacts.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options)
        {

        }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Login> Users { get; set; }
    }
}