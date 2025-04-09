import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserProfileAPI, changePswdAPI } from '../services/userServices';

const Userprofile = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfileAPI,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const mutation = useMutation({
    mutationKey: ['changepswd'],
    mutationFn: changePswdAPI,
    onSuccess: () => {
      alert('✅ Password changed successfully!');
      setIsChangingPassword(false);
    },
    onError: () => {
      alert('❌ Failed to change password. Please try again.');
    },
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('❌ New password and confirm password do not match!');
      return;
    }
    mutation.mutate({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading user profile...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading user profile.</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
        {[{ label: "Name", key: "username" }, { label: "Email", key: "email" }, { label: "Phone Number", key: "phone" }, { label: "Address", key: "address" }].map(({ label, key }) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
              type="text"
              name={key}
              value={userProfile?.user?.[key] || ''}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
              disabled
            />
          </div>
        ))}
        <div className="flex flex-col gap-3 mt-4">
          <button className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300" onClick={() => navigate('/editprofile')}>Edit Profile</button>
          <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300" onClick={() => setIsChangingPassword(!isChangingPassword)}>Change Password</button>
        </div>
      </div>
      {isChangingPassword && (
        <form onSubmit={handleChangePasswordSubmit} className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🔒 Change Password</h3>
          {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input
                type="password"
                name={field}
                value={passwordData[field]}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300" disabled={mutation.isLoading}>Submit</button>
            <button type="button" onClick={() => setIsChangingPassword(false)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Userprofile;
