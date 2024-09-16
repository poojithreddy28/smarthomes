import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './checkout.css';

const Checkout = () => {
  // Extract the username from query parameters (assuming it's passed in the URL)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');  // Get the username from URL
  console.log('Username:', username);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    shippingMethod: 'Home Delivery',
    storeLocation: '' // New field for in-store pickup
  });

  const storeLocations = [
    { zip: '60601', location: 'Downtown Chicago' },
    { zip: '60605', location: 'South Loop' },
    { zip: '60610', location: 'Gold Coast' },
    { zip: '60615', location: 'Hyde Park' },
    { zip: '60616', location: 'Chinatown' },
    { zip: '60622', location: 'Wicker Park' },
    { zip: '60640', location: 'Uptown' },
    { zip: '60647', location: 'Logan Square' },
    { zip: '60007', location: 'Elk Grove Village' },
    { zip: '60540', location: 'Naperville' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare order data with username
    const orderData = {
      username: username,  // Include the username
      ...formData,         // Include all form fields
    };

    // Handle form submission logic (e.g., send data to backend)
    console.log('Order Placed:', orderData);

    // Example: Sending data to backend using axios (you should replace this with your backend API endpoint)
    axios.post('http://localhost:8080/smarthomes_backend/place_order', orderData)
      .then(response => {
        console.log('Order successful:', response.data);
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });
  };

  return (
    <div className="checkout-container">
      <h2>CheckOut</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+48"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="storename@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
        </div>
        <div className="form-group">
          <label>Postal code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal code"
            required
          />
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234123412341234"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry</label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>

        <div className="form-group">
          <label>Shipping Method</label>
          <div>
            <label>
              <input
                type="radio"
                name="shippingMethod"
                value="Home Delivery"
                checked={formData.shippingMethod === 'Home Delivery'}
                onChange={handleChange}
              />
              Home Delivery
            </label>
            <label>
              <input
                type="radio"
                name="shippingMethod"
                value="InStore Pickup"
                checked={formData.shippingMethod === 'InStore Pickup'}
                onChange={handleChange}
              />
              InStore Pickup
            </label>
          </div>
        </div>

        {/* Conditionally show dropdown for InStore Pickup */}
        {formData.shippingMethod === 'InStore Pickup' && (
          <div className="form-group">
            <label>Select Store Location</label>
            <select
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select a store location</option>
              {storeLocations.map((location, index) => (
                <option key={index} value={location.zip}>
                  {location.location} - {location.zip}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="checkout-button">Place Order</button>
        <button type="button" className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default Checkout;
