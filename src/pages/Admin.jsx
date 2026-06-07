import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
      alert('Unauthorized access. Admin privileges required.');
      navigate('/');
      return;
    }
    fetchProducts();
  }, [navigate]);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${currentId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Reset form
      setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
      setIsEditing(false);
      setCurrentId(null);
      fetchProducts(); // Refresh list

    } catch (err) {
      console.error(err);
      alert('Failed to save product. Check console.');
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setCurrentId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock
    });
    window.scrollTo(0, 0); // scroll to top to see form
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Admin Dashboard</h1>
      
      <div className="card" style={{ marginBottom: '40px' }}>
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Product Name</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Stock Quantity</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category</label>
            <input name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g. Laptops" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Image URL</label>
            <input name="image" value={formData.image} onChange={handleInputChange} required placeholder="https://..." />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="primary">
              {isEditing ? 'Update Product' : 'Create Product'}
            </button>
            {isEditing && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Manage Existing Products</h2>
        {loading ? <p>Loading...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>No products found.</td></tr>
                ) : (
                  products.map(p => (
                    <tr key={p._id}>
                      <td>
                        <img src={p.image} alt="preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td style={{ fontWeight: '500' }}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>${p.price}</td>
                      <td>{p.stock}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="secondary" onClick={() => handleEditClick(p)} style={{ padding: '6px 12px', fontSize: '13px' }}>Edit</button>
                          <button className="danger" onClick={() => handleDelete(p._id)} style={{ padding: '6px 12px', fontSize: '13px' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
