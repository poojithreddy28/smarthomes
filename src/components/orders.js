import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './orders.css';
import Navbar from './navbar';

const Order = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username'); // Extract username from URL
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user's orders when the component is mounted
    if (username) {
      axios
        .get(`http://localhost:8080/smarthomes_backend/orders?username=${username}`)
        .then((response) => {
          setOrders(response.data); // Store orders in the state
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [username]);

  // Function to calculate the total price of an order
  const calculateTotalPrice = (products) => {
    return Object.keys(products).reduce((total, productName) => {
      return total + products[productName].quantity * products[productName].productPrice;
    }, 0);
  };

  // Function to handle cancel order
  const handleCancelOrder = (orderId) => {
    axios
      .delete(`http://localhost:8080/smarthomes_backend/cancel_order?orderId=${orderId}`)
      .then((response) => {
        // Remove the canceled order from the state
        setOrders(orders.filter(order => order.orderId !== orderId));
        alert('Order canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling order:', error);
      });
  };

  return (
    <div className="order-container">
      <Navbar username={username} />
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h3>Order ID: {order.orderId}</h3>
              <h4>Products:</h4>
              <ul className="product-list">
                {Object.keys(order.products).map((productName) => (
                  <li key={productName} className="product-item">
                    {/* Display product image */}
                    <img
                      src={`/images/All/${productName}.jpeg`}
                      alt={productName}
                      className="product-image"
                    />
                    {/* Product details */}
                    <p>
                      {productName} - {order.products[productName].quantity} x $
                      {order.products[productName].productPrice}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Display the total price */}
              <p className="total-price">
                <strong>Total Price: </strong>${calculateTotalPrice(order.products).toFixed(2)}
              </p>

              {/* Display the delivery date */}
              <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>

              {/* Display all order details */}
              <div className="order-details">
                <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.postalCode}</p>
                <p><strong>Shipping Method:</strong> {order.shippingMethod}</p>
                {order.shippingMethod === 'InStore Pickup' && (
                  <p><strong>Store Location:</strong> {order.storeLocation}</p>
                )}
              </div>

              {/* Add the Cancel Order button */}
              <button className="cancel-order-button" onClick={() => handleCancelOrder(order.orderId)}>
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
