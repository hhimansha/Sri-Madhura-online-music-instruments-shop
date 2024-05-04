import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]*$/, 'Invalid phone number')
    .nullable(),
});

const SignUp = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', values);
      if (response.data.status) {
        navigate('/login'); // Navigate to login after successful signup
      } else {
        setErrors({ submit: response.data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Error during signup, please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:m-10">
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form
            className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10"
          >
            <h1 className="mb-6 text-xl font-semibold lg:text-2xl text-left">Register</h1>

            {/* First Name and Last Name */}
            <div className="grid gap-3 md:grid-cols-2">
              <div className="text-left">
                <label>First Name</label>
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Your Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
                <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="text-left">
                <label>Last Name</label>
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
                <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Email Field */}
            <div className="text-left">
              <label>Email Address</label>
              <Field
                type="email"
                name="email"
                placeholder="Info@example.com"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Password Field */}
            <div className="text-left">
              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="******"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Phone Field */}
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="text-left">
                <label>Phone: <span className="text-sm text-gray-400">(optional)</span></label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="+543 5445 0543"
                  className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="checkbox">
              <Field
                type="checkbox"
                name="terms"
                id="checkbox1"
                className="mt-1"
              />
              <label htmlFor="checkbox1">
                I agree to the 
                <a href="#" target="_blank" className="text-blue-600"> Terms and Conditions</a>
              </label>
              <ErrorMessage name="terms" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="grid w-full cursor-pointer select-none rounded-md border bg-primary py-2 px-5 text-center text-white shadow hover:bg-primaryDark"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>

            {/* Redirect to Login */}
            <p className="mb-4 text-center">
              Already have an account? 
              <Link to="/login" className="text-indigo-500 hover:text-indigo-600"> Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
