import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Home from './components/home';  // We will create this next
import Register from './components/register';  // Another page for new customers to register
import CheckoutPage from './components/checkoutpage';  // A page for the cart
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
