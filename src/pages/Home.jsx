import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToCartDB } from '../utils/db';
import { toast } from 'react-toastify';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products', err);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }

    try {
      await saveToCartDB({ ...product, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="card" style={{ 
        backgroundColor: '#2563eb', 
        color: 'white', 
        textAlign: 'center', 
        padding: '60px 20px',
        marginBottom: '40px',
        border: 'none'
      }}>
        <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '10px' }}>Welcome to TechCart</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
          Your one-stop shop for the best student laptops, premium audio, and essential tech accessories.
        </p>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Products</h2>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No products found in the database.</p>
          <p>Login and go to the <strong>Admin Dashboard</strong> to add some!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {products.map(p => (
            <div key={p._id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
              <img 
                src={p.image || `https://loremflickr.com/320/240/${encodeURIComponent(p.name.split(' ')[0])}`} 
                alt={p.name} 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                onError={(e) => { 
                  // If the image fails to load, dynamically fetch a placeholder based on the product's first word
                  const keyword = p.name ? p.name.split(' ')[0] : 'tech';
                  e.target.src = `https://loremflickr.com/320/240/${encodeURIComponent(keyword)}?lock=${p._id.slice(-5)}`; 
                }}
              />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>{p.category}</span>
                <h3 style={{ margin: '5px 0 10px 0', fontSize: '1.25rem' }}>{p.name}</h3>
                <p style={{ color: '#2563eb', fontWeight: '700', fontSize: '1.2rem', margin: '0 0 10px 0' }}>${p.price}</p>
                <p style={{ flexGrow: 1, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>{p.description}</p>
                
                <button 
                  className="primary"
                  onClick={() => addToCart(p)}
                  style={{ width: '100%', marginTop: '15px' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
