import React from "react";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../AlertBoxes/SuccessAlert";

const RentalOrdersCheckout = () => {
  const location = useLocation();
  const { rentalOrder, totalPrice } = location.state;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [imageUploaded, setImageUploaded] = useState(false); // State to track if image is uploaded


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate('/rentals');
      }, 3000); // Set timeout duration in milliseconds
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [success, navigate]);

  const handlePlaceOrder = async () => {
    try {

      if (!imageUploaded) {
        throw new Error('Please upload the bank payment slip');
      }
      // Send POST request to create the order
    
      const response = await fetch('http://localhost:5050/api/rental-orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalOrder),
      });
      if (!response.ok) {
        throw new Error('Failed to place the order');
      }
      setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
    } catch (error) {
      console.error(error);
      // Handle error
    }

    
  };

  const handleSuccessBoxClose = () => {
    setSuccess(false);
    navigate('/rentals');
  };

  return (
    <div className="py-6 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md">
            <p className="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Customer’s Cart</p>
            <div className="">
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`http://localhost:5050/uploads/${rentalOrder.image}`} alt={rentalOrder.title} />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{rentalOrder.title}</span>
                    <span className="float-right text-gray-400">{rentalOrder.category}</span>
                    <p className="text-lg font-bold">{rentalOrder.rentalDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 my-10 border-b pb-6">
                <div className="flex justify-between w-full">
                  <p className="text-base text-black leading-4 ">Subtotal</p>
                  <p className="text-base text-black leading-4 ">{rentalOrder.totalPrice}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base text-black leading-4 ">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">PROTEIN</span></p>
                  <p className="text-base text-black leading-4 ">{rentalOrder.discount}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base text-black leading-4 ">Shipping</p>
                  <p className="text-base text-black leading-4 ">$8.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full pt-6 border-gray-200 border-b pb-6">
                <p className="text-base text-black font-semibold leading-4 ">Total</p>
                <p className="text-base text-black font-semibold leading-4 ">{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-2xl d w-full xl:w-3/5 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-lg  mb-8 mt-2 md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Payment Information</h2>
            <form name="orderForm">
              <p className="text-sm pb-6 text-left">To complete your order, please upload the bank payment slip for verification. Your order will be processed once we confirm the payment.</p>
              <ol className="list-decimal list-inside text-sm pb-6 text-left text-gray-400 leading-6">
                <li>Capture a clear photo or scan of the bank payment slip.</li>
                <li>Click the "Click to upload" button & upload.</li>
                <li>Click the "Place Order" button.</li>
              </ol>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                  {imageUploaded ? null : <p className="text-red-500">Please upload the bank payment slip</p>}

                </label>
              </div>
              <div className="mt-8">
                <button
                  onClick={handlePlaceOrder}
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-grey"
                >
                  Place order
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {success && <SuccessAlert onClose={handleSuccessBoxClose} />}
    </div>
  );
};

export default RentalOrdersCheckout;
