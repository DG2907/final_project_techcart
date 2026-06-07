import Order from '../models/Order.js';

class OrderRepository {
  async create(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  async findByUserId(userId) {
    return await Order.find({ user: userId }).populate('items.product');
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default new OrderRepository();
