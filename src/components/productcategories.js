import React, { useState, useEffect } from 'react';
import './productcategories.css'; // Ensure you have the corresponding CSS file for styling
import axios from 'axios'; // Axios for API requests

const ProductCategories = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [selectedCategory, setSelectedCategory] = useState('All Products'); // State for active category

  // Fetch products based on the selected category
  const fetchProducts = async (category) => {
    try {
      // If category is 'All Products', fetch all products; otherwise, fetch products by category
      const url = category === 'All Products' 
        ? 'http://localhost:8080/smarthomes_backend/products' 
        : `http://localhost:8080/smarthomes_backend/products?category=${encodeURIComponent(category)}`;
      
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Fetch products on mount and when category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // Categories to filter products
  const categories = [
    { name: 'All Products', folder: 'all' },
    { name: 'Smart Doorbells', folder: 'smartdoorbells' },
    { name: 'Smart Doorlocks', folder: 'smartdoorlocks' },
    { name: 'Smart Speakers', folder: 'smartspeakers' },
    { name: 'Smart Lightings', folder: 'smartbulbs' },
    { name: 'Smart Thermostats', folder: 'smartthermostats' }
  ];

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.name);
  };

  // Handle add to cart functionality
  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:8080/smarthomes_backend/cart', { productName: product.name });
      console.log(response.data.message); // Log response from the server
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="categories-wrapper">
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
