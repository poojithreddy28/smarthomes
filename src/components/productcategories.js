import React from 'react';
import './productcategories.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Import images for categories
import doorbellImage from '../assets/smart_doorbell.jpeg';
import doorlockImage from '../assets/product_image_2.jpeg';
import speakerImage from '../assets/product_image_3.jpeg';
import lightingImage from '../assets/product_image_4.jpeg';
import thermostatImage from '../assets/product_image_5.jpeg';

const ProductCategories = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = [
    { name: 'Smart Doorbells', image: doorbellImage, route: 'home/doorbells' },
    { name: 'Smart Doorlocks', image: doorlockImage, route: 'home/doorlocks' },
    { name: 'Smart Speakers', image: speakerImage, route: 'home/speakers' },
    { name: 'Smart Lightings', image: lightingImage, route: 'home/lightings' },
    { name: 'Smart Thermostats', image: thermostatImage, route: 'home/thermostats' }
  ];

  return (
    <div className="categories-container">
      <h2>Our Product Categories</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index} onClick={() => navigate(category.route)}>
            <h3>{category.name}</h3>
            <img src={category.image} alt={category.name} className="category-image" />
            <button>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
