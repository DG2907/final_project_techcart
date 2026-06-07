import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCartFromDB, clearCartDB } from '../utils/db';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartFromDB().then(setCartItems);
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first to checkout!');
      navigate('/login');
      return;
    }

    try {
      // In a real app, calculate total properly on backend
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const items = cartItems.map(item => ({ product: item._id, quantity: item.quantity, price: item.price }));
      
      await axios.post('http://localhost:5000/api/orders', 
        { shippingAddress: address, items, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Order Placed! Check your notifications.');
      await clearCartDB();
      navigate('/');
    } catch (err) {
      toast.error('Failed to place order.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Checkout</h1>
      <p>Items in cart: {cartItems.length}</p>
      <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Shipping Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#E67E22', color: 'white' }}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
