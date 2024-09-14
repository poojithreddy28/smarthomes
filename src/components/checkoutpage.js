import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './checkout.css';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the server
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/smarthomes_backend/cart');
        setCartItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
