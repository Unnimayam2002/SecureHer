import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  name: yup.string().min(5, 'Please enter a name with at least 5 characters').required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Signup Data', values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/signup-bg.jpg')" }}>
      <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Create an Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Full Name</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your name"
              />
            </div>
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Email</label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-600" />
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Password</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-600" />
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Create a password"
              />
            </div>
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md text-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-900 mt-4 text-sm">
          Already have an account? <a href="/Login" className="text-purple-900 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;