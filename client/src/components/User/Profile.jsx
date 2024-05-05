import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../../helper/validate";
import { passwordValidate } from "../../helper/validate";
import axios from "axios";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Profile (){

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(res => {
      if(res.data.status){
        console.log('Password reset successful. Navigating to login page.');
        navigate('/login')
      }
    }).catch(err => {
      console.log(err);
      console.error('Error occurred during password reset:', err);
    })
  }

    
    return (
       
        <div class="lg:m-10">
        <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
        <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Profile</h1>
      
        <div class="grid gap-3 md:grid-cols-2">
          <div> 
            <label class=""> First Name </label>
            <input type="text" placeholder="Your Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
          </div>
          <div>
            <label class=""> Last Name </label>
            <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
          </div>
        </div>
        <div>
          <label class=""> Username </label>
          <input type="text" placeholder="Username" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
        </div>
        <div>
          <label class=""> Email Address </label>
          <input type="email" placeholder="Info@example.com" name="email" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
        </div>
        <div>
          <label class=""> Password </label>
          <input type="password" placeholder="******" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
        </div>
        <div class="grid gap-3 lg:grid-cols-2">
          <div>
            <label class=""> Gender </label>
            <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
              <input class="peer hidden" type="checkbox" name="select-1" id="select-1" />
              <label for="select-1" class="flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring">Select Option </label>
              <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Male</li>
                <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Female</li>
                <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Other</li>
              </ul>
            </div>
          </div>
          <div>
            <label class=""> Phone: <span class="text-sm text-gray-400">(optional)</span> </label>
            <input type="text" placeholder="+543 5445 0543" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" />
          </div>
        </div>
      
        <div class="checkbox">
          <input type="checkbox" id="chekcbox1" checked="" />
          <label for="checkbox1">I agree to the <a href="#" target="_blank" class="text-blue-600"> Terms and Conditions </a> </label>
        </div>
      
        <div>
          <button type="button" onClick={handleLogout} class="grid w-full cursor-pointer select-none rounded-md border bg-primary py-2 px-5 text-center align-middle text-sm text-white shadow  hover:bg-primaryDark hover:text-white focus:primaryDark  focus:text-white focus:shadow-none">Log Out</button>
        </div>
      </form>
      
      </div>


        
    );
}
