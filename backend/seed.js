import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techcart';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Seed Users
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('user123', 10);

    await User.create([
      { name: 'Admin Account', email: 'admin@techcart.com', password: hashedAdminPassword, role: 'admin' },
      { name: 'Student User', email: 'student@techcart.com', password: hashedUserPassword, role: 'customer' }
    ]);
    console.log('Users seeded!');

    // Seed Products
    await Product.create([
      { name: 'Student Laptop', price: 500, category: 'Laptops', stock: 15, description: 'Good for studies with 8GB RAM and 256GB SSD.', image: 'https://via.placeholder.com/400x300/2980b9/ffffff?text=Laptop' },
      { name: 'Wireless Mouse', price: 20, category: 'Accessories', stock: 50, description: 'Ergonomic wireless mouse with USB receiver.', image: 'https://via.placeholder.com/400x300/27ae60/ffffff?text=Mouse' },
      { name: 'Noise Cancelling Headphones', price: 80, category: 'Audio', stock: 30, description: 'Over-ear headphones with active noise cancellation.', image: 'https://via.placeholder.com/400x300/8e44ad/ffffff?text=Headphones' },
      { name: 'Mechanical Keyboard', price: 60, category: 'Accessories', stock: 20, description: 'RGB mechanical keyboard with blue switches.', image: 'https://via.placeholder.com/400x300/c0392b/ffffff?text=Keyboard' }
    ]);
    console.log('Products seeded!');

    mongoose.connection.close();
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
