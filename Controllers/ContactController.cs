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
    public class ContactController : ControllerBase
    {
        private readonly ContactContext _contactContext;
        public ContactController(ContactContext contactContext)
        {
            _contactContext = contactContext;
        }

        // This is a HTTP GET request method for retrieving all contacts from the database.
        // It checks if there are any contacts available and returns a 404 Not Found status if there are none.
        // Otherwise, it returns a list of contacts in the response.

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            return await _contactContext.Contacts.ToListAsync();
        }

        // This is a HTTP GET endpoint method that returns a specific contact by ID.
        // It first checks if the list of contacts in the ContactContext is not null, and then uses the FindAsync method to find the contact with the specified ID.
        // If the contact is found, it is returned. If not, a 404 Not Found response is returned.

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            return contact;
        }

        // This C# code is a method that handles an HTTP POST request for creating a new Contact resource.
        // It takes a Contact object as input and saves it to the database using the _contactContext context object.
        // After the contact is saved, it returns an HTTP response with a status code of 201 (Created) and a location header that points to the newly created resource using the CreatedAtAction method.
        // This code also uses the async and await keywords to perform the database operation asynchronously, allowing the application to handle other requests while the operation is in progress.

        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            _contactContext.Contacts.Add(contact);
            await _contactContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.ID }, contact);
        }

        // This C# code is a method that handles an HTTP PUT request for updating an existing Contact resource.
        // It takes the id of the contact to update and a Contact object as input.

        // The method first checks if the id passed in the request matches the ID property of the Contact object.
        // If they do not match, the method returns a BadRequest response indicating that the request was invalid.

        // If the id and ID match, the method updates the Contact object in the _contactContext context object and
        // sets its state to EntityState.Modified.The SaveChangesAsync method is then called to persist the changes to the database.

        // If the update is successful, the method returns an HTTP response with a status code of 200 (OK).
        // If an error occurs during the update, such as a concurrency conflict, it is caught by a DbUpdateConcurrencyException and re-thrown to the caller.
        // Overall, this code uses async and await to allow for asynchronous execution and efficient handling of database updates in the application.

        [HttpPut("{id}")]
        public async Task<ActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.ID)
            {
                return BadRequest();
            }
            _contactContext.Entry(contact).State = EntityState.Modified;
            try
            {
                await _contactContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }

        // This C# code is a method that handles an HTTP DELETE request for deleting a Contact resource by ID.
        // The method takes an id parameter representing the ID of the contact to delete.

        // The method first checks if the collection of Contacts in the _contactContext context object is null.
        // If it is null, the method returns a NotFound response indicating that the resource was not found.

        // Next, the method attempts to retrieve the contact to delete from the database using the FindAsync method of the _contactContext.Contacts DbSet.
        // If the contact is not found, the method again returns a NotFound response.

        // If the contact is found, the method removes it from the _contactContext.Contacts DbSet using the Remove method,
        // and then saves the changes to the database using the SaveChangesAsync method.

        // If the delete operation is successful, the method returns an HTTP response with a status code of 200 (OK).

        // Overall, this code uses async and await to allow for asynchronous execution and efficient handling of database deletes in the application.

                [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            _contactContext.Contacts.Remove(contact);
            await _contactContext.SaveChangesAsync();
            return Ok();
        }
    }
}