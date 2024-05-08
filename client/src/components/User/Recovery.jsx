import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function Recovery() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await Axios.post("http://localhost:3000/auth/recover", {
        email: values.email,
      });

      if (response.data.status) {
        toast.success("Check your email for the reset password link.");
        // Redirect after a delay to allow the user to read the toast message
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50 text-gray-600">
      
      <div className="relative sm:w-[30rem] bg-white border-gray-400 shadow-lg px-4 rounded-lg">
        <div className="flex-auto p-6">
        <ToastContainer />
          <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Recovery</h4>
          <p className="mb-6 text-gray-500">Please enter your email to recover your account.</p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4 text-left">
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className="block w-full rounded-md border-gray-400 py-2 px-3 text-sm"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    className="grid w-full cursor-pointer select-none rounded-md border bg-primary py-2 px-5 text-white shadow hover:bg-primaryDark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Recover"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
