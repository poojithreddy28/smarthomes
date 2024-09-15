import React, { useState, useEffect } from 'react';
import './productcategories.css';
import axios from 'axios';

const ProductCategories = ({ username }) => { 
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [quantity, setQuantity] = useState({}); // Tracks quantity of each product
  const [notification, setNotification] = useState(''); // State for success message

  // Define categories array
  const categories = [
    { name: 'All Products', folder: 'all' },
    { name: 'Smart Doorbells', folder: 'smartdoorbells' },
    { name: 'Smart Doorlocks', folder: 'smartdoorlocks' },
    { name: 'Smart Speakers', folder: 'smartspeakers' },
    { name: 'Smart Lightings', folder: 'smartbulbs' },
    { name: 'Smart Thermostats', folder: 'smartthermostats' }
  ];

  // Fetch products based on the selected category
  const fetchProducts = async (category) => {
    try {
      const url = category === 'All Products'
        ? 'http://localhost:8080/smarthomes_backend/products'
        : `http://localhost:8080/smarthomes_backend/products?category=${encodeURIComponent(category)}`;

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Fetch products when the component mounts or when selectedCategory changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);  

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.name);
  };

  // Handle quantity change for each product
  const handleQuantityChange = (product, change) => {
    const newQuantity = { ...quantity };
    newQuantity[product.name] = (newQuantity[product.name] || 0) + change;
    if (newQuantity[product.name] < 0) newQuantity[product.name] = 0; // Prevent negative quantity
    setQuantity(newQuantity);
  };

  // Handle adding product to cart
  const handleAddToCart = async (product) => {
    try {
      const selectedQuantity = quantity[product.name] || 1;
      const response = await axios.post('http://localhost:8080/smarthomes_backend/cart', {
        username,
        productName: product.name,
        productPrice: product.price,
        quantity: selectedQuantity
      });
      console.log(response.data.message); // Log success message
      showNotification('Cart updated successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Function to show notification and hide it after 3 seconds
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Hide after 3 seconds
  };

  return (
    <div className="categories-wrapper">
      {/* Display notification banner */}
      {notification && (
        <div className="notification-banner">
          <p>{notification}</p>
        </div>
      )}

      <div className="categories-container">
        {/* Category Header */}
        <div className="categories-header">
          {categories.map((category, index) => (
            <span
              key={index}
              className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={`/images/${categories.find(c => c.name === selectedCategory).folder}/${product.name}.jpeg`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>

                {/* Quantity controls */}
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                  <span>{quantity[product.name] || 1}</span>
                  <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                </div>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
