using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Product: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Decimal Price { get; set; }
        public String PictureUrl { get; set; }
        public ProductType  ProductType { get; set; }
        public int ProductTypeID { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandID { get; set; }
    }
}
