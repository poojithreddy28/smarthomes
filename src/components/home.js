import React from 'react';
import './home.css'; // Include styles
import Navbar from './navbar';
import ProductCategories from './productcategories';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import Footer from './footer';



const Home = () => {
  const location = useLocation(); // Get location object
  const { username } = location.state || {}; // Extract username from location state

  return (
    <div className="home-container">
      <Navbar username={username} /> {/* Pass username as prop */}
      <h1>Hey, <h1 className='home-user'>{username ? username : "Guest"}!</h1>Welcome to SmartHomes</h1> {/* Display the username */}
      <p>Browse through our categories and find the best products!</p>
      <ProductCategories username = {username} />
      <Footer/>
    </div>
  );
};

export default Home;
