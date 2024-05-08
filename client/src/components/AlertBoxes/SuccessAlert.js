// SuccessAlert.js
import React from "react";

const SuccessAlert = ({ onClose }) => (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="rounded-lg bg-gray-50 p-8  animate-in zoom-in-50 fade-in">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-200 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">
        Order Placed !!!
      </h3>
      <p className="w-[230px] text-center font-normal text-gray-600">
        Your order has been placed.
      </p>
      <button
        onClick={onClose}
        className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300"
      >
        Great
      </button>
    </div>
  </div>
);

export default SuccessAlert;
