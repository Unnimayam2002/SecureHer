import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    location: 'Kochi, Kerala',
    phoneNumber: '9876543210'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch user details from API or state management when integrated
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', userProfile);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New password and confirm password do not match!');
      return;
    }
    console.log('Password Changed:', passwordData);
    alert('✅ Password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">👤 User Profile</h2>
      <form onSubmit={handleProfileSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={userProfile.fullName}
            onChange={handleProfileChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleProfileChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={userProfile.location}
            onChange={handleProfileChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userProfile.phoneNumber}
            onChange={handleProfileChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300 cursor-pointer"
        >
          Update Profile
        </button>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handleChangePassword} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">🔒 Change Password</h3>
        <div className="mb-4 relative">
          <label className="block text-gray-900 font-medium">Old Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-900 font-medium">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-900 font-medium">Confirm New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-11 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            
          </button>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
