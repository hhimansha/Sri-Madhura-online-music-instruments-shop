import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Library to decode JWT
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Function to get a specific cookie by name
function getCookie(name) {
  const cookieValue = Cookies.get(name);
  return cookieValue;
}



  useEffect(() => {
              // Retrieve token from local storage
              const jwtToken = getCookie('jwt');

          console.log('JWT Token:', jwtToken);

          

         

         

    if (!jwtToken) {
      setError("Token not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Decode the JWT to get the payload
      const decodedToken = jwtDecode(jwtToken);

      // Decode the token to get the user ID
      // Extract the user ID and other information
          const user_id = decodedToken.id;
          const userRole = decodedToken.role;

          console.log('User ID:', user_id);
          console.log('User Role:', userRole);
      setUserId(user_id);
      

      //Fetch user data based on the user ID
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5050/api/users/${user_id}`);
          setUser(response.data); // Store user data
          setLoading(false); // Update loading state
        } catch (err) {
          setError("Failed to fetch user data");
          setLoading(false);
        }
      };

      fetchUserData(); // Fetch user data

    } catch (e) {
      setError("Invalid token");
      setLoading(false);
    }
  }, []); // Run once on component mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div>
      <h1>Profile</h1>
      {/* Display user information */}
      <p>User ID: {userId}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
