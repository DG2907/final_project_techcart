import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      navigate('/');
      // Refresh to update navbar state
      window.location.reload();
    } catch (err) {
      toast.error('Login Failed. Check your credentials or register a new account.');
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2980b9' }}>Welcome Back</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '12px', backgroundColor: '#3498db', color: 'white', fontSize: '16px' }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2980b9' }}>Register here</Link>
      </p>

      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '10px' }}>Quick Demo Login</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="secondary" 
            style={{ flex: 1 }}
            onClick={() => { setEmail('admin@techcart.com'); setPassword('admin123'); }}
          >
            Admin
          </button>
          <button 
            className="secondary" 
            style={{ flex: 1 }}
            onClick={() => { setEmail('student@techcart.com'); setPassword('user123'); }}
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
