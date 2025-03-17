import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Customizablesettings = () => {
  const [emergencyContacts, setEmergencyContacts] = useState(['']);
  const [settings, setSettings] = useState({
    notifications: true,
    privacyMode: false,
  });
  const [policeStation, setPoliceStation] = useState('Fetching nearest police station...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.example.com/nearest-police?lat=${latitude}&lng=${longitude}`);
          const data = await response.json();
          setPoliceStation(data.name || 'Police station not found');
        } catch (error) {
          setPoliceStation('Unable to fetch police station');
        }
      });
    } else {
      setPoliceStation('Geolocation not supported');
    }
  }, []);

  const handleContactChange = (index, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index] = value;
    setEmergencyContacts(updatedContacts);
  };

  const addContactField = () => {
    setEmergencyContacts([...emergencyContacts, '']);
  };

  const removeContactField = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Saved:', { ...settings, emergencyContacts, policeStation });
    alert('✅ Settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl">
        {/* Emergency Contacts Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">📞 Emergency Contacts</h3>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={contact}
                onChange={(e) => handleContactChange(index, e.target.value)}
                placeholder={`Emergency Contact ${index + 1}`}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeContactField(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContactField}
            className="w-full py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 transition duration-300 cursor-pointer"
          >
            ➕ Add Contact
          </button>
        </div>

        {/* Nearest Police Station */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">🚓 Nearest Police Station</h3>
          <input
            type="text"
            value={policeStation}
            readOnly
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        {/* Notification and Privacy Settings */}
        <div className="mb-8 space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 text-lg">🔔 Enable Notifications</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacyMode"
              checked={settings.privacyMode}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 text-lg">🛡️ Enable Privacy Mode</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Save Settings
          </button>
          <Link
            to="/userprofile"
            className="block text-center w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            View Profile
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Customizablesettings;
