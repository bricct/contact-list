using ContactListDb;
using Microsoft.AspNetCore.Mvc;

namespace ContactListApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactsController(ILogger<ContactsController> logger, ContactListDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public IEnumerable<Contact> GetAll()
    {
        logger.LogInformation("Getting all contacts");
        return dbContext.Contacts.Select(Contact.FromDb).ToArray();
    }
}
