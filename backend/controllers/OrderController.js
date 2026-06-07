import OrderRepository from '../repositories/OrderRepository.js';
import { sendPushNotification } from '../utils/push.js';

class OrderController {
  async createOrder(req, res) {
    try {
      const orderData = {
        ...req.body,
        user: req.user.userId
      };
      
      const order = await OrderRepository.create(orderData);
      
      // Attempt to send push notification to the user
      sendPushNotification(req.user.userId, JSON.stringify({
        title: 'Order Placed Successfully!',
        body: `Your order #${order._id} has been placed.`
      }));

      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }

  async getMyOrders(req, res) {
    try {
      const orders = await OrderRepository.findByUserId(req.user.userId);
      res.json(orders);
    } catch (error) {
      console.error('Get my orders error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const order = await OrderRepository.updateStatus(req.params.id, req.body.status);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      
      sendPushNotification(order.user.toString(), JSON.stringify({
        title: 'Order Status Updated',
        body: `Your order #${order._id} is now ${req.body.status}.`
      }));

      res.json(order);
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(400).json({ message: 'Bad request' });
    }
  }
}

export default new OrderController();
