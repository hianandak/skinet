
namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Decimal Price { get; set; }
        public String PictureUrl { get; set; }
        public string  ProductType { get; set; }
        public string ProductBrand { get; set; }
    }
}