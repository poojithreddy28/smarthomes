import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Redirect to the login page on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">SmartHomes</Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
          <li className="navbar-item"><Link to="/about" className="navbar-link">About Us</Link></li>
          <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact</Link></li>
          <li className="navbar-item"><Link to="/orders" className="navbar-link">View Orders</Link></li>
        </ul>
        <div className="navbar-icons">
          {username ? (
            <div onClick={handleLogout} className="navbar-icon">
              <i className="fas fa-sign-out-alt"> Logout</i>
            </div>
          ) : (
            <Link to="/login" className="navbar-icon">
              <i className="fas fa-sign-in-alt"> Login</i>
            </Link>
          )}
          {/* Pass username as a query parameter */}
          <Link to={`/cart?username=${username}`} className="navbar-icon">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
