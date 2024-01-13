using System.ComponentModel.DataAnnotations.Schema;

namespace ContactListDb;

[Table("Contacts", Schema = "public")]
public class ContactEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Address { get; set; } = null!;
}
