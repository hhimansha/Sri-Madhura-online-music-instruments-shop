import React from "react";
import OrderDetails from "./OrderDetails";

const RentalOrdersCheckout = () => {


  


  return (
    <div class="py-6 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div class="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md">
            <p class="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Customer’s Cart</p>
            <div className="">

              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="http://localhost:5050/uploads/{rentalItem.image}" alt="rentalItem.title" />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">rentalItem.title</span>
                    <span className="float-right text-gray-400">rentalItem.category</span>
                    <p className="text-lg font-bold">rentalItem.rentalDate</p>
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

          </div>

        </div>
        <div class="bg-gray-100 rounded-2xl d w-full xl:w-3/5 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <div class="w-full max-w-lg mx-auto">


            <h2 class="text-lg  mb-8 mt-2 md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Payment Information</h2>
            <form name="orderForm">

              <p className="text-sm pb-6 text-left">To complete your order, please upload the bank payment slip for verification. Your order will be processed once we confirm the payment.</p>
              <ol class="list-decimal list-inside text-sm pb-6 text-left text-gray-400 leading-6">
                <li>Capture a clear photo or scan of the bank payment slip.</li>
                <li>Click the "Click to upload" button & upload.</li>
                <li>Click the "Place Order" button.</li>
              </ol>

              <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>


              <div class="mt-8">
                <button

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
    </div>
  );
};

export default RentalOrdersCheckout;
