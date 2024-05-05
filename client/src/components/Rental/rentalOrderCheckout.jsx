import React from "react";

export default function rentalOrderCheckout() {
  return (
    <div class="py-6 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div class="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-grey-light rounded-2xl drop-shadow-md">
              <p class="text-lg md:text-xl dark:text-black font-semibold leading-6 xl:leading-5 text-black">Customer’s Cart</p>
              
              <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div class="pb-4 md:pb-8 w-20 md:w-20">
                  <img class="w-96 hidden md:block" />
                  <img class="w-96 md:hidden" />
                </div>
                <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div class="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 class="text-md dark:text-black xl:text-md font-semibold leading-6 text-black">sdsdssd</h3>
                    <div class="flex justify-start items-start flex-col space-y-2">
                    </div>
                  </div>
                  <div class="flex justify-between space-x-8 items-start w-full">
                    <p class="text-base dark:text-black xl:text-lg leading-6">Unit price :</p>
                    <p class="text-base dark:text-black xl:text-lg leading-6 text-gray-800">Qty : </p>
                    <p class="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">sddsds</p>
                  </div>
                </div>
              </div>
          
              
            </div>
            <div class="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div class="flex flex-col px-4 md:p-6 xl:p-8 w-full py-4 bg-grey-light rounded-2xl drop-shadow-md space-y-2">
                    <h2 class="text-lg font-medium mb-4">Delivery Address</h2>
                    
                    
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
                        <p class="text-base text-black leading-4 ">$2332</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Discount <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">PROTEIN</span></p>
                        <p class="text-base text-black leading-4 ">-$23 (40%)</p>
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <p class="text-base text-black leading-4 ">Shipping</p>
                        <p class="text-base text-black leading-4 ">$8.00</p>
                    </div>
                    </div>
                    <div class="flex justify-between items-center w-full pt-6 border-gray-200 border-b pb-6">
                        <p class="text-base text-black font-semibold leading-4 ">Total</p>
                        <p class="text-base text-black font-semibold leading-4 ">$232323</p>
                    </div>

                
            </div>
          </div>
        </div>
        {success && <SuccessAlert onClose={() => navigate("/user")} />}
      </div>
  );
}