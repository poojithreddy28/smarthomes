import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 
import Login from './components/login';
import Home from './components/home';  // We will create this next
import Register from './components/register';  // Another page for new customers to register
import Cart from './components/cart';  // Page for displaying the cart
import Checkout from './components/checkout';  // Page for checkout
import Order from './components/orders';  // Page for viewing orders

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/vieworders" element={<Order />} />
        
  
      </Routes>
    </Router>
  );
}

export default App;
