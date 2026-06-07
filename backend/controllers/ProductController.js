import ProductRepository from '../repositories/ProductRepository.js';

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductRepository.findAll();
      res.json(products);
    } catch (error) {
      console.error('Get all products error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductRepository.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      console.error('Get product by id error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await ProductRepository.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await ProductRepository.update(req.params.id, req.body);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await ProductRepository.delete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new ProductController();
