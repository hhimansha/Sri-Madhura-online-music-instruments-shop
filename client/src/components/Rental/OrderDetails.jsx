import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const OrderDetails = () => {
    const { id } = useParams();
    const [userId, setUserId] = useState(null);
    const [rentalItem, setRentalItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rentalDate, setRentalDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(null);

  // Function to get a specific cookie by name
  function getCookie(name) {
    const cookieValue = Cookies.get(name);
    return cookieValue;
  }

//   useEffect(() => {
//     // Retrieve token from cookies
//     const jwtToken = getCookie('jwt');

//     if (!jwtToken) {
//       setError("Token not found. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Decode the JWT to get the payload
//       const decodedToken = jwtDecode(jwtToken);

//       // Extract the user ID from the decoded token
//       const userId = decodedToken.id;

//       // Set the user ID state
//       setUserId(userId);

//       // Fetch rental orders for the user
//       const fetchRentalOrders = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5050/api/rental-orders/${userId}`);
//           setRentalOrders(response.data);
//           setLoading(false);
//         } catch (error) {
//           setError("Failed to fetch rental orders");
//           setLoading(false);
//         }
//       };

//       fetchRentalOrders();
//     } catch (error) {
//       setError("Invalid token");
//       setLoading(false);
//     }
//   }, []);


useEffect(() => {
    

    const fetchRentalItem = async () => {
        try {
          const response = await fetch(`http://localhost:5050/api/rentals/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch rental item');
          }
          const data = await response.json();
          setRentalItem(data);
          setRentalDate(data.rentalDate); // Set the rental date state
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      

    fetchRentalItem();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        
          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{rentalItem.title}</span>
              <span className="float-right text-gray-400">{rentalItem.category}</span>
              <p className="text-lg font-bold">{rentalItem.rentalDate}</p>
            </div>
          </div>

        
      </div>

                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 my-10 border-b pb-6">
                    <div class="flex justify-between w-full">
                        <p class="text-base text-black leading-4 ">Subtotal</p>
                        <p class="text-base text-black leading-4 ">1111</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Discount <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">PROTEIN</span></p>
                        <p class="text-base text-black leading-4 ">-111(40%)</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Shipping</p>
                        <p class="text-base text-black leading-4 ">$8.00</p>
                    </div>
                    </div>
                    <div class="flex justify-between items-center w-full pt-6 border-gray-200 border-b pb-6">
                        <p class="text-base text-black font-semibold leading-4 ">Total</p>
                        <p class="text-base text-black font-semibold leading-4 ">$1111</p>
                    </div>
    </div>
  );
};

export default OrderDetails;
