import { Link, useNavigate } from 'react-router-dom';
import { subscribeToPushNotifications } from '../utils/pushHelper';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={{ 
      backgroundColor: '#1e293b', 
      padding: '15px 40px', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, color: 'white', fontWeight: '700', letterSpacing: '-0.5px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>TechCart</Link>
      </h2>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
        <Link to="/cart" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>Cart</Link>
        
        {token ? (
          <>
            {localStorage.getItem('role') === 'admin' && (
              <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Admin Dashboard</Link>
            )}
            <button 
              className="secondary"
              onClick={async () => {
                const success = await subscribeToPushNotifications();
                if (success) toast.success('Subscribed to notifications!');
                else toast.error('Failed to subscribe. Please ensure notifications are allowed in your browser settings.');
              }}
              style={{ padding: '6px 12px', fontSize: '13px' }}
            >
              🔔 Enable Alerts
            </button>
            <button 
              className="danger"
              onClick={handleLogout} 
              style={{ padding: '6px 16px' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="primary" style={{ padding: '6px 20px' }}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
