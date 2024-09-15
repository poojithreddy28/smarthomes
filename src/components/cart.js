import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const location = useLocation();

  // Extract username from query params
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = useCallback(async () => {
    if (!username) {
      console.error("No username found in Cart.js");
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/smarthomes_backend/cart', {
        params: { username },  // Pass username to backend
      });

      setCartItems(response.data);
      const total = response.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }, [username]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.productName} - ${item.price} x {item.quantity}</p>
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
