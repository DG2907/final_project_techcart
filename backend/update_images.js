import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techcart';

const updateImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB to update images...');

    const products = await Product.find({});
    
    for (let product of products) {
      if (product.name.includes('Laptop')) {
        product.image = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80';
      } else if (product.name.includes('Mouse')) {
        product.image = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80';
      } else if (product.name.includes('Headphone')) {
        product.image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
      } else if (product.name.includes('Keyboard')) {
        product.image = 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80';
      } else {
        product.image = 'https://placehold.co/400x300/2980b9/ffffff?text=Product';
      }
      await product.save();
    }

    console.log('Images updated successfully to Unsplash high-quality photos!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error updating images:', err);
    mongoose.connection.close();
  }
};

updateImages();
