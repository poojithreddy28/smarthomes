import React from 'react';
import './category.css'; // Ensure you're importing the correct CSS

// Import doorbell product images
import product1 from '../assets/smart_doorbell.jpeg';

const SmartDoorbells = () => {
  const products = [
    { id: 1, name: 'Smart Doorbell Model 1', price: 299, rating: 4, reviews: 400, image: product1 }
  ];

  return (
    <div className="category-container no-background"> {/* Ensure no background is applied */}
      <h2>Smart Doorbells</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-rating">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span>({product.reviews})</span>
            </div>
            <div className="product-icons">
              <button className="icon-button add-to-cart-btn">
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button className="icon-button">❤️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartDoorbells;
