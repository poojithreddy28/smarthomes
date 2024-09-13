import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './login.css';  // Import the CSS for styling
import './register.css'; // Reuse register styles if similar
import axios from 'axios';  // Use axios to make HTTP requests


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigating to another page

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:8080/smarthomes_backend/login', { email, password });

      if (response.status === 200) {
        const username = response.data.user; // Extract username from response
        setMessage(response.data.message);

        // Pass the username to the home page
        navigate('/home', { state: { username } }); // Pass username to home
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setMessage('Invalid email or password');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="register-text">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
