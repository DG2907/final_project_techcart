import { useState, useEffect } from 'react';
import { getCartFromDB, clearCartDB } from '../utils/db';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await getCartFromDB();
    setCartItems(items);
  };

  const handleClear = async () => {
    await clearCartDB();
    loadCart();
  };

  return (
    <div>
      <h1>Your Cart (Offline Support)</h1>
      {cartItems.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <h4>{item.name}</h4>
              <p>Price: ${item.price} x {item.quantity}</p>
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleClear} style={{ marginRight: '10px' }}>Clear Cart</button>
            <button onClick={() => navigate('/checkout')} style={{ backgroundColor: '#E67E22', color: 'white' }}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
