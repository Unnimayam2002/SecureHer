import React from 'react'

const Coms = () => {
    let request = {
      name: '',
      location: '',
      need: '',
      status: 'Open'
    };
  
    let sharedLocation = '';
    let locationCaptured = false;
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          sharedLocation = `${latitude}, ${longitude}`;
          locationCaptured = true;
          alert(`📍 Location captured: ${sharedLocation}`);
          document.getElementById('location-status').textContent = `✅ Location shared: ${sharedLocation}`;
        }, () => {
          alert('⚠️ Location access denied. Please enter your location manually.');
          document.getElementById('location-status').textContent = '❌ Location not shared';
        });
      } else {
        alert('⚠️ Geolocation is not supported by your browser.');
        document.getElementById('location-status').textContent = '❌ Location not supported';
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const requestData = Object.fromEntries(formData);
      requestData.location = sharedLocation;
  
      if (requestData.name && requestData.need && requestData.location) {
        alert(`🚨 Support request submitted!\nName: ${requestData.name}\nLocation: ${requestData.location}\nNeed: ${requestData.need}`);
        e.target.reset();
        sharedLocation = '';
        document.getElementById('location-status').textContent = '';
      } else {
        alert('⚠️ Please fill out all fields before submitting.');
      }
    };
  
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">🆘 Request Community Support</h2>
        <form onSubmit={handleSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-900 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 font-medium">Location</label>
            <button
              type="button"
              onClick={getLocation}
              className="w-full p-4 border-2 rounded-lg focus:outline-none border-blue-500 bg-blue-100 hover:bg-blue-200"
            >
              📍 Share Current Location
            </button>
            <p id="location-status" className="text-sm text-gray-700 mt-2"></p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 font-medium">What support do you need?</label>
            <textarea
              name="need"
              className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300"
              placeholder="Describe the situation and support needed"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer"
          >
            Request Support
          </button>
        </form>
      </div>
    );
  };
  
export default Coms;
