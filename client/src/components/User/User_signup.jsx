import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../../helper/validate";
import { registerValidation } from "../../helper/validate";
import { passwordValidate } from "../../helper/validate";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function SignUp() {


  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: ''
    },
    validate: values => {
      const errors = {};
      const usernameErrors = usernameValidate(values.username);
      const passwordErrors = passwordValidate(values.password);

      // Merge username and password errors
      Object.assign(errors, usernameErrors, passwordErrors);

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/signup', {
      firstName,
      lastName,
      email,
      password,
      phone,

    }).then(response => {
      if(response.data.status){
        navigate('/login')
      }
      
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div class="lg:m-10">
      <form class="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
       onSubmit={handleSubmit} >
        <h1 class="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class=""> First Name </label>
            <input type="text" placeholder="Your Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              onChange={(e) => setfirstName(e.target.value)} />
          </div>
          <div>
            <label class=""> Last Name </label>
            <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              onChange={(e) => setlastName(e.target.value)} />
          </div>
        </div>

        <div>
          <label class=""> Email Address </label>
          <input type="email" placeholder="Info@example.com" name="email" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label class=""> Password </label>
          <input type="password" placeholder="******" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="grid gap-3 lg:grid-cols-2">
          <div>
            <label class=""> Phone: <span class="text-sm text-gray-400">(optional)</span> </label>
            <input type="text" placeholder="+543 5445 0543" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div class="checkbox">
          <input type="checkbox" id="chekcbox1" checked="" />
          <label for="checkbox1">I agree to the <a href="#" target="_blank" class="text-blue-600"> Terms and Conditions </a> </label>
        </div>

        <div>
          <button type="submit" class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Get Started</button>
          <p className="mb-4 text-center">
                            Already have an account?
                            <Link to="/login" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">  Login </Link>
                        </p>        
        </div>
      </form>
      
    </div>
  );
}