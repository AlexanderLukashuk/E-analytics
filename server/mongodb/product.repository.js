import Product from '../mongodb/models/product.js';

const ProductRepository = {
  async createProduct(productData) {
    return Product.create(productData);
  },

  async findProductById(productId) {
    return Product.findById(productId);
  },

  async updateProduct(productId, productData) {
    return Product.findByIdAndUpdate(productId, productData, { new: true });
  },

  async deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
  },
};

export default ProductRepository;
