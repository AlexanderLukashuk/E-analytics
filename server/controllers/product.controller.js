import ProductService from '../application/product.service.js';

const ProductController = {
  async createProduct(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updatedProduct = await ProductService.updateProduct(productId, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.deleteProduct(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Товар не найден' });
      }
      res.json({ message: 'Товар успешно удален' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ProductController;
