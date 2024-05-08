import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import MainLogo from '../assets/MainLogo.png';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
});

export default function LoginForm() {

    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await Axios.post('http://localhost:3000/auth/login', values);
            // Handle successful login (e.g., redirect, store token, etc.)
             if (response.data.status) {

                //localStorage.setItem('token', response.data.token);

                const token = response.data.token; // Get the token from the response
                localStorage.setItem('token', token); // Save token to local storage
                
                const userRole = response.data.role;
                
                if (userRole === 'admin') {
                    toast.success("Login as Admin");
                    console.log('Login successful', response.data);
                    setTimeout(() => {
                        navigate('/admindash'); // Redirect to user dashboard
                      }, 3000);
                     // Redirect to admin dashboard
                } else {
                    toast.success("Login successful");
                    console.log('Login successful', response.data);
                    setTimeout(() => {
                        navigate('/') // Redirect to user dashboard
                      }, 3000);
                   
                }
                
                
            }else {
                // If login status is false, trigger an error toast
                toast.error("Invalid login credentials");
                setErrors({ submit: "Invalid login credentials" });
              }
        } catch (error) {
            toast.error("An error occurred during login. Please try again.");
            // Handle error, e.g., display error message
            setErrors({ submit: 'Invalid login credentials' });
        } finally {
            
            setSubmitting(false);
        }
    };


    return (

        <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
            <div className="relative">
                <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute left-20 top-20">
                <ToastContainer />
                    <Toaster position="top-center" reverseOrder={false}></Toaster>

                    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' />
                    </svg>
                </div>
                <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute right-20 bottom-20">
                    <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                        <defs>
                            <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                                <rect x='0' y='0' width='100%' height='100%' fill='none' />
                                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' strokeWidth='1' stroke='none' fill='currentColor' />
                            </pattern>
                        </defs>
                        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' />
                    </svg>
                </div>
                {/* Register */}
                <div>
                    {/* Formik Form */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                                <div className="flex-auto p-6">
                                    {/* Logo */}
                                    <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                        <img src={MainLogo} className="h-20 mx-auto my-4" alt="#" />
                                    </div>
                                    <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome to Sri Madhura</h4>
                                    <p className="mb-6 text-gray-500">Please sign in to access your account</p>

                                    {/* Email Field */}
                                    <div className="mb-4 text-left">
                                        <label htmlFor="email" className="mb-2 inline-block justify-left text-xs font-medium uppercase text-gray-700">
                                            Email
                                        </label>
                                        <Field
                                            type="text"
                                            name="email"
                                            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500"
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <div className="flex justify-between">
                                            <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                                Password
                                            </label>
                                            <Link to="/recover" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500"
                                            placeholder="············"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Remember Me */}
                                    <div className="mb-4">
                                        <div className="block">
                                            <Field
                                                type="checkbox"
                                                name="rememberMe"
                                                className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-indigo-500"
                                            />
                                            <label htmlFor="rememberMe" className="inline-block"> Remember Me </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="grid w-full cursor-pointer select-none rounded-md border bg-primary py-2 px-5 text-center text-white shadow hover:bg-primaryDark"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                                        </button>
                                        {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}
                                    </div>
                                </div>

                                {/* Create Account */}
                                <p className="mb-4 text-center">
                                    New on Sri Madhura?
                                    <Link to="/signup" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Create an account </Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
                {/* /Register */}
            </div>
        </div>



    );
}
