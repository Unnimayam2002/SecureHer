import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  name: yup.string().min(5, 'Please enter a name with at least 5 characters').required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
  district: yup.string().required('District is required'),
  location: yup.string().required('Location is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      district: '',
      location: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Signup Data', values);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/signup-bg.jpg')" }}>
   <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-xl p-6">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Create an Account</h2>
    <form onSubmit={formik.handleSubmit}>

          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone Number */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Phone Number</label>
            <div className="relative flex items-center">
              <FaPhone className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your phone number"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
          </div>

          {/* District */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">District</label>
            <div className="relative flex items-center">
              <FaCity className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="district"
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your district"
              />
            </div>
            {formik.touched.district && formik.errors.district && <p className="text-red-500 text-sm mt-1">{formik.errors.district}</p>}
          </div>

          {/* Location */}
          <div className="mb-4 relative">
            <label className="block text-gray-900 font-medium">Location</label>
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-gray-600" />
              <input
                type="text"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-3 py-2 bg-white/40 text-gray-800 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="Enter your location"
              />
            </div>
            {formik.touched.location && formik.errors.location && <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>}
          </div>

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md text-lg cursor-pointer"
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
