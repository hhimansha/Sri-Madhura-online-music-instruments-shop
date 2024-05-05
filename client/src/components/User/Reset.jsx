import React from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../../helper/validate";
import { passwordValidate } from "../../helper/validate";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Reset (){

    const [password, setPassword] = useState('');
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/auth/reset', {
          token,
          password,
        }).then(response => {
          if(response.data.status){
            navigate('/login')
          }
          console.log(response.data)
        }).catch(err => {
          console.log(err)
        })
      }
      

    const formik = useFormik( {
        initialValues : {
            password : '',
            confirm_pwd : ''
        },
        validate: values => {
            const errors = {};
           // const usernameErrors = usernameValidate(values.username);
            const passwordErrors = passwordValidate(values.password);

            // Merge username and password errors
            Object.assign(errors,  passwordErrors);

            return errors;
        },
        validateOnBlur: false,
        validateOnChange:false,
        onSubmit : async values => {
            console.log(values)
        }
    } )

    
    return (
       
        <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
            <div className="relative">
                <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute left-20 top-20">
                <Toaster position="top-center" reverseOrder = {false}></Toaster>
            
                    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                                <rect x='0' y='0' width='100%' height='100%' fill='none'/>
                                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor'/>
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/>
                    </svg>
                </div>
                <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute right-20 bottom-20">
                    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                                <rect x='0' y='0' width='100%' height='100%' fill='none'/>
                                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor'/>
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)'/>
                    </svg>
                </div>
                {/* Register */}
                <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                    <div className="flex-auto p-6">
                        {/* Logo */}
                        
                        {/* /Logo */}
                        <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Reset Password</h4>
                        <p className="mb-6 text-gray-500">Please enter the New Password</p>

                        <form className="mb-4" action="#" method="POST" onSubmit = {handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">New Password</label>
                                <input type="text" onChange={(e) => setPassword(e.target.value)} className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="password" placeholder="New Password" autoFocus />
                               
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    
                                    <a href="auth-forgot-password-basic.html" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                                        <small className="">already </small>
                                    </a>
                                </div>
                                
                            </div>
                            <div className="mb-4">
                              
                            </div>
                            <div className="mb-4">
                                <button className="grid w-full cursor-pointer select-none rounded-md border bg-primary py-2 px-5 text-center align-middle text-sm text-white shadow  hover:bg-primaryDark hover:text-white focus:primaryDark  focus:text-white focus:shadow-none" type="submit">Reset</button>
                            </div>
                        </form>

                        
                    </div>
                </div>
                {/* /Register */}
            </div>
        </div>


        
    );
}
