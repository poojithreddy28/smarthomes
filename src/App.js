import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Home from './components/home';  // We will create this next
import Register from './components/register';  // Another page for new customers to register
import SmartDoorbells from './components/SmartDoorbells';  // A page for smart doorbells
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/doorbells" element={<SmartDoorbells />} />
      </Routes>
    </Router>
  );
}

export default App;
