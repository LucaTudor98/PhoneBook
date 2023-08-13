using Microsoft.EntityFrameworkCore;
using PhoneBook.Models;

namespace PhoneBook.Helpers
{
    public class PartnerContext : DbContext
    {
        public PartnerContext(DbContextOptions<PartnerContext> options) : base(options)
        {
        }

        public DbSet<Partner> Partners { get; set; }
    }
}
