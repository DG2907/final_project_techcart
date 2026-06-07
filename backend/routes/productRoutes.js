import express from 'express';
import ProductController from '../controllers/ProductController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Admin only in real app, simplified for student project
router.post('/', authenticate, ProductController.createProduct);
router.put('/:id', authenticate, ProductController.updateProduct);
router.delete('/:id', authenticate, ProductController.deleteProduct);

export default router;
