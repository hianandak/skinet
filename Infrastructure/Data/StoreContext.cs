using Infrastructure.Data;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : 
        base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //Sqlite Support Double , So this is required
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach(var entirtType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entirtType.ClrType.GetProperties().Where(p => 
                        p.PropertyType==typeof(Decimal));

                        foreach(var property in properties)
                        {
                            modelBuilder.Entity(entirtType.Name).Property(property.Name)
                             .HasConversion<Double>();
                        }
                }
            }
        }
    }
}
