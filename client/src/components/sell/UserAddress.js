import React, { useState, useReducer } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from "../../hooks/useAuthContext";

function UserAddress() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  // New state variables
  const [street, setStreet] = useState(user.DeliveryAddress ? user.DeliveryAddress.street : "");
  const [city, setCity] = useState(user.DeliveryAddress ? user.DeliveryAddress.city : "");
  const [state, setState] = useState(user.DeliveryAddress ? user.DeliveryAddress.state : "");
  const [zipCode, setZipCode] = useState(user.DeliveryAddress ? user.DeliveryAddress.zipCode : "");


  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Update userAddress object with new variables
    const DeliveryAddress = {
      street,
      city,
      state,
      zipCode,
    };

    const response = await fetch(`http://localhost:9092/api/users/user/address/${user._id}`, {
    method: "POST",
    body: JSON.stringify(DeliveryAddress),
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
    },
    });

    forceUpdate();

    const json = await response.json();
    console.log('Backend Response:', json);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);

      setStreet("");
      setCity("");
      setState("");
      setZipCode("");
      setEmptyFields([]);
      dispatch({ type: "UPDATE_DELIVERY_ADDRESS", payload: json.DeliveryAddress });
      navigate("/user");

    }
  };

  return (
    <div>
        <div className="grid justify-center bg-grey-light mx-auto mb-16 mt-12 p-5 rounded-xl max-w-lg drop-shadow-md">
            <h1 className="text-2xl text-black text-center mb-4">Update Address</h1>
            <form className="w-96 grid" onSubmit={handleSubmit}>
                <label className="text-gray-500">Street</label>
                <input type="text" className="rounded-lg p-2 px-5 mb-4 border border-gray-300"  onChange={(e) => setStreet(e.target.value)}
              value={street}></input>

                <label className="text-gray-500">City</label>
                <input type="text" className="rounded-lg p-2 px-5 mb-4 border border-gray-300" onChange={(e) => setCity(e.target.value)}
              value={city}></input>
                
                <label className="text-gray-500">State</label>
                <input type="text" className="rounded-lg p-2 px-5 mb-4 border border-gray-300" onChange={(e) => setState(e.target.value)}
              value={state}></input>
                
                <label className="text-gray-500">Zip code</label>
                <input
                    type="text"
                    className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
                  
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode}
                    /> 
              
                
                              
                <div className="btn section flex m-4 ml-0">
                <button className="mx-auto px-5 py-2 px-10 text-20 text-white font-semibold rounded-lg border focus:outline-none bg-primary">
                  Add address
                </button>
                </div>

                {error && (
                    
                    
                    <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-full bg-red-50 dark:text-red-400 justify-center border-red-400 border-2 " role="alert">
                        <svg class="flex-shrink-0 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div class="ms-3 text-lg font-medium">
                        {error}
                        </div>
                    </div>
                )}
            </form>
            
        </div>
        {error && <div className="error text-red-600">{error}</div>}
        </div>



  );
}

export default UserAddress;
