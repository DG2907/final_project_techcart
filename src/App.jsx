import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={localStorage.getItem('token') ? <Home /> : <Navigate to="/login" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true} />
      </div>
    </Router>
  );
}

export default App;
