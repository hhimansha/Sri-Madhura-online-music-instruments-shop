import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import SuccessAlert from "../../components/AlertBoxes/SuccessAlert";

const Order = () => {
  const { user } = useAuthContext();
  const [carts, setCarts] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isValidCardNumber, setIsValidCardNumber] = useState(true);
  const [isValidExpirationDate, setIsValidExpirationDate] = useState(true);
  const [isValidCVV, setIsValidCVV] = useState(true);
  const [isValidCardHolder, setIsValidCardHolder] = useState(true);
  const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      console.log("Success:", success); // Log success when it's true
    }, [success]);

  const handlePlaceOrder = async () => {
    // Check if the user has a delivery address
    if (!user?.DeliveryAddress || Object.keys(user.DeliveryAddress).length === 0) {
      alert("Please provide a delivery address.");
      return;
    }
  
    // Check the validity of all input fields
    if (
      !isValidCardNumber ||
      !isValidExpirationDate ||
      !isValidCVV ||
      !isValidCardHolder
    ) {
      alert("Please fill in all required fields with valid information.");
      return;
    }
  
    // Check if any of the card details is empty
    if (!cardNumber || !expirationDate || !cvv || !cardHolder) {
      alert("Please enter all card details.");
      return;
    }
  
    // Formatting card number and expiration date
    const formattedCardNumber = cardNumber.replace(/\D/g, "");
    const formattedExpirationDate = expirationDate.replace(/\D/g, "");
  
    // Rest of your code for placing the order
    try {
      const response = await fetch("http://localhost:9092/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          carts,
          cardNumber: formattedCardNumber,
          expirationDate: formattedExpirationDate,
          cvv,
          cardHolder,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Order placed successfully:", data);
        // Remove cart details from local storage
        localStorage.removeItem("cart");

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        console.error("Error placing order:", data);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle unexpected errors
    }
  };
  
  
    useEffect(() => {
      // Retrieve cart items from local storage
      const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
      setCarts(storedCarts);
    }, []);

    const formatCardNumber = (input) => {
      // Remove non-numeric characters
      const numericValue = input.replace(/\D/g, "");
  
      // Insert space every 4 digits
      const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ").trim();
  
      return formattedValue;
    };
  
    const formatExpirationDate = (input) => {
      // Remove non-numeric characters
      const numericValue = input.replace(/\D/g, "");
  
      // Insert "/" after the first 2 digits
      const formattedValue = numericValue.replace(/^(\d{2})/, "$1 /");
  
      return formattedValue;
    };
  
  
    // Calculate total price
    const total = carts.reduce((acc, cart) => acc + cart.TotPrice, 0);
    const discounted = total * 40/100;
    const grandTotal = (total - discounted) + 8

    return(
        <div class="py-6 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div class="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md">
              <p class="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Customer’s Cart</p>
              {carts.map((cart) => (
              <div key={cart.id} class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div class="pb-4 md:pb-8 w-20 md:w-20">
                  <img class="w-96 hidden md:block" src={cart.imageSrc} alt={cart.proteinName} />
                  <img class="w-96 md:hidden" src={cart.imageSrc} alt={cart.proteinName} />
                </div>
                <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div class="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 class="text-md dark:text-black xl:text-md font-semibold leading-6 text-black">{cart.proteinName}</h3>
                    <div class="flex justify-start items-start flex-col space-y-2">
                    </div>
                  </div>
                  <div class="flex justify-between space-x-8 items-start w-full">
                    <p class="text-base dark:text-black xl:text-lg leading-6">Unit price : {cart.price}</p>
                    <p class="text-base dark:text-black xl:text-lg leading-6 text-gray-800">Qty : {cart.qty}</p>
                    <p class="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">${cart.TotPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
          ))}
              
            </div>
            <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div class="flex flex-col px-4 md:p-6 xl:p-8 w-full py-4 bg-grey-light rounded-2xl drop-shadow-md space-y-2">
                    <h2 class="text-lg font-medium mb-4">Delivery Address</h2>
                    
                    {/* Check if user has a delivery address */}
                    {(user?.DeliveryAddress && Object.keys(user.DeliveryAddress).length > 0) ? (
                    <>
                      <div className="delivery info border-gray-200 flex">
                        <p className="text-base text-gray-400 font-semibold leading-4">
                          {user.DeliveryAddress.street}
                        </p>
                      </div>
                      <div className="delivery info border-gray-200 flex">
                        <p className="text-base text-gray-400 font-semibold leading-4">
                          {user.DeliveryAddress.city}
                        </p>
                      </div>
                      <div className="delivery info border-gray-200 flex">
                        <p className="text-base text-gray-400 font-semibold leading-4">
                          {user.DeliveryAddress.state}
                        </p>
                      </div>
                      <div className="delivery info border-gray-200  flex">
                        <p className="text-base text-gray-400 font-semibold leading-4 ">
                          {user.DeliveryAddress.zipCode}
                        </p>
                      </div>
                    </>
                    ) : (
                    <Link to="/user/order-address"> 
                    <button
                        className="bg-grey text-white px-4 py-2 rounded-md mb-4">
                        Add Delivery Address
                      </button></Link>
                    )}
                </div>
                <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md space-y-6">
                    <h3 class="text-xl  font-semibold leading-5 text-black">Shipping</h3>
                    <div class="flex justify-between items-start w-full">
                    <div class="flex justify-center items-center space-x-4">
                        <div class="w-8 h-8">
                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                        </div>
                        <div class="flex flex-col justify-start items-center">
                        <p class="text-lg leading-6 text-black font-semibold ">Hima-Express Delivery<br /><span class="font-normal">Delivery with 24 Hours</span></p>
                        </div>
                    </div>
                    <p class="text-lg font-semibold leading-6 text-black">$8.00</p>
                    </div>
            
                </div>
                </div>
            </div>
          <div class="bg-grey-light rounded-2xl drop-shadow-md w-full xl:w-1/2 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <div class="w-full max-w-lg mx-auto">
                    <h3 class="text-xl e font-semibold leading-5 text-black pb-6">Summary</h3>
                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-6">
                    <div class="flex justify-between w-full">
                        <p class="text-base text-black leading-4 ">Subtotal</p>
                        <p class="text-base text-black leading-4 ">${total.toFixed(2)}</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Discount <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">PROTEIN</span></p>
                        <p class="text-base text-black leading-4 ">-${discounted.toFixed(2)} (40%)</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Shipping</p>
                        <p class="text-base text-black leading-4 ">$8.00</p>
                    </div>
                    </div>
                    <div class="flex justify-between items-center w-full pt-6 border-gray-200 border-b pb-6">
                        <p class="text-base text-black font-semibold leading-4 ">Total</p>
                        <p class="text-base text-black font-semibold leading-4 ">${grandTotal.toFixed(2)}</p>
                    </div>

                <h2 class="text-lg font-medium mb-6 mt-6">Payment Information</h2>
                <form name="orderForm">
                <div class="mb-8">
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" class="h-8 ml-3"/>
                        </div>
                    <div class="grid grid-cols-2 gap-6">
                        
                    
                    <div class="col-span-2 sm:col-span-1">
                      <label for="card-number" class="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                          type="text"
                          name="card-number"
                          id="card-number"
                          placeholder="0000 0000 0000 0000"
                          className={`w-full py-3 px-4 border ${isValidCardNumber ? 'border-gray-400' : 'border-red-500'} rounded-lg focus:outline-none focus:border-blue-500`}
                          value={formatCardNumber(cardNumber)}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                            setIsValidCardNumber(true);
                          }}
                          onBlur={() => setIsValidCardNumber(/\d{4} \d{4} \d{4} \d{4}/.test(cardNumber))}
                          required
                        />
                        {!isValidCardNumber && (
                          <p class="text-xs text-red-500 mt-1">Please enter a valid card number.</p>
                        )}
                      </div>

                      <div class="col-span-2 sm:col-span-1">
                            <label for="expiration-date" class="block text-sm font-medium text-gray-700 mb-2">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              name="expiration-date"
                              id="expiration-date"
                              placeholder="MM / YY"
                              className={`w-full py-3 px-4 border ${isValidExpirationDate ? 'border-gray-400' : 'border-red-500'} rounded-lg focus:outline-none focus:border-blue-500`}
                              onChange={(e) => {
                                const formattedValue = e.target.value
                                  .replace(/\D/g, '') // Remove non-numeric characters
                                  .replace(/(\d{2})(\d{0,2})/, "$1 / $2"); // Add "/" between month and year
                                setExpirationDate(formattedValue);
                                setIsValidExpirationDate(true);
                              }}
                              onBlur={() => {
                                setIsValidExpirationDate(/^(0[1-9]|1[0-2]) \/ (24|25|26|27|28)$/.test(expirationDate));
                              }}
                              maxLength="7" // Set the maximum length of the input to 7 characters (MM / YY)
                              value={expirationDate}
                              required
                            />
                            {!isValidExpirationDate && (
                              <p class="text-xs text-red-500 mt-1">
                                Please enter a valid expiration date (MM / YY).
                              </p>
                            )}
                          </div>


                          <div class="col-span-2 sm:col-span-1">
                            <label for="cvv" class="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              id="cvv"
                              placeholder="000"
                              className={`w-full py-3 px-4 border ${isValidCVV ? 'border-gray-400' : 'border-red-500'} rounded-lg focus:outline-none focus:border-blue-500`}
                              pattern="\d{3}"
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                setCVV(numericValue);
                                setIsValidCVV(true);
                              }}
                              onBlur={() => {
                                setIsValidCVV(/^\d{3}$/.test(cvv));
                              }}
                              value={cvv}  // Ensure the displayed value is the state value
                              required
                            />
                            {!isValidCVV && (
                              <p class="text-xs text-red-500 mt-1">Please enter a valid CVV (3 digits).</p>
                            )}
                          </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="card-holder" class="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder
                      </label>
                      <input
                        type="text"
                        name="card-holder"
                        id="card-holder"
                        placeholder="Full Name"
                        className={`w-full py-3 px-4 border ${isValidCardHolder ? 'border-gray-400' : 'border-red-500'} rounded-lg focus:outline-none focus:border-blue-500`}
                        onChange={(e) => {
                          setCardHolder(e.target.value);
                          setIsValidCardHolder(true);
                        }}
                        onBlur={() => setIsValidCardHolder(/^[a-zA-Z\s]+/.test(cardHolder))}
                        required
                      />
                      {!isValidCardHolder && (
                        <p class="text-xs text-red-500 mt-1">Please enter a valid card holder name.</p>
                      )}
                    </div>
                    
                    </div>
                    <div class="mt-8">
                    <button 
                     onClick={handlePlaceOrder}
                     type="button" class="group inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-grey">
                        Place order
                        <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                
                    </div>
                </form>
            </div>
          </div>
        </div>
        {success && <SuccessAlert onClose={() => navigate("/user")} />}
      </div>
      
    )
}

export default Order;