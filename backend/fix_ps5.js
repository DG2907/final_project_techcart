import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techcart';

const fixPS5 = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find the PS5 product
    const product = await Product.findOne({ name: 'PS5' });
    
    if (product) {
      // Update with a high quality PS5 controller image from Unsplash
      product.image = 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80';
      await product.save();
      console.log('Fixed PS5 image successfully!');
    } else {
      console.log('PS5 not found in database.');
    }

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

fixPS5();
