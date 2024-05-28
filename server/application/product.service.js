import ProductRepository from '../mongodb/product.repository.js';

const ProductService = {
  async createProduct(productData) {
    return ProductRepository.createProduct(productData);
  },

  async getProductById(productId) {
    return ProductRepository.findProductById(productId);
  },

  async updateProduct(productId, productData) {
    return ProductRepository.updateProduct(productId, productData);
  },

  async deleteProduct(productId) {
    return ProductRepository.deleteProduct(productId);
  },
};

export default ProductService;
