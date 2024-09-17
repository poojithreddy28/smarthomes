import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you could also clear session data or token if needed
    navigate('/login'); // Redirect to the login page on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          {/* Include username as a query parameter in Home link */}
          <Link to={`/?username=${username}`} className="logo-link">
            SmartHomes
            <img src={`/images/logo.png`} alt="SmartHomes Logo" className="logo-image" />
          </Link>
        </div>

        <ul className="navbar-menu">
          {/* Home link */}
          <li className="navbar-item">
            <Link to={`/?username=${username}`} className="navbar-link">
              Home
            </Link>
          </li>
          {/* About Us link */}
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
          </li>
          {/* Contact link */}
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
          {/* View Orders link, conditionally include username */}
          {username && (
            <li className="navbar-item">
              <Link to={`/vieworders?username=${username}`} className="navbar-link">
                View Orders
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-icons">
          {/* Display logout if logged in, otherwise show login */}
          {username ? (
            <div onClick={handleLogout} className="navbar-icon logout-button">
              <i className="fas fa-sign-out-alt"> Logout</i>
            </div>
          ) : (
            <Link to="/login" className="navbar-icon">
              <i className="fas fa-sign-in-alt"> Login</i>
            </Link>
          )}

          {/* Cart link, conditionally include username */}
          {username && (
            <Link to={`/cart?username=${username}`} className="navbar-icon">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  