import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Forgotpassword() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Password reset email sent to:', values.email);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-cover bg-center">
      <div className="bg-white/20 rounded-xl shadow-2xl backdrop-blur-xl w-full max-w-lg p-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Forgot Password?</h2>
        <p className="text-center text-gray-800 mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-900 font-medium text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-4 mt-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg text-xl"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-center text-gray-900 mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Forgotpassword;
