using ContactListDb;

namespace ContactListApi;

public record Contact
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Address { get; set; }
    
    public static Contact FromDb(ContactEntity contactDb)
    {
        return new Contact
        {
            Id = contactDb.Id,
            Name = contactDb.Name,
            Email = contactDb.Email,
            PhoneNumber = contactDb.PhoneNumber,
            Address = contactDb.Address
        };
    }
}
