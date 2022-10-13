using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        public Task<Product> GetProductByIDAsync(int id);
        public Task<IReadOnlyList<Product>> GetProductAsync();
        public Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        public Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}
