import express from 'express';
import OrderController from '../controllers/OrderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, OrderController.createOrder);
router.get('/', authenticate, OrderController.getMyOrders);
router.put('/:id/status', authenticate, OrderController.updateOrderStatus);

export default router;
