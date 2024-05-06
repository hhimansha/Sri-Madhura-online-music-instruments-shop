import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const RentalOrdersCheckout = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentalOrders, setRentalOrders] = useState([]);

  // Function to get a specific cookie by name
  function getCookie(name) {
    const cookieValue = Cookies.get(name);
    return cookieValue;
  }

  useEffect(() => {
    // Retrieve token from cookies
    const jwtToken = getCookie('jwt');

    if (!jwtToken) {
      setError("Token not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Decode the JWT to get the payload
      const decodedToken = jwtDecode(jwtToken);

      // Extract the user ID from the decoded token
      const userId = decodedToken.id;

      // Set the user ID state
      setUserId(userId);

      // Fetch rental orders for the user
      const fetchRentalOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:5050/api/rental-orders/${userId}`);
          setRentalOrders(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch rental orders");
          setLoading(false);
        }
      };

      fetchRentalOrders();
    } catch (error) {
      setError("Invalid token");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Rental Orders</h1>
      <ul>
        {rentalOrders.map((order) => (
          <li key={order._id}>
            {/* Display rental order details */}
            <p>Rental Item ID: {order.rentalItemID}</p>
            <p>Title: {order.title}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Image: <img src={order.image} alt="Rental Item" /></p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Rental Date: {order.rentalDate}</p>
            <p>Number of Days: {order.numberOfDays}</p>
            <p>Order Date: {order.orderDate}</p>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalOrdersCheckout;
