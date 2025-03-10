import React from 'react'

import { useState } from 'react';

const Customizablesettings = () => {
  const [emergencyContacts, setEmergencyContacts] = useState(['']);
  const [settings, setSettings] = useState({
    notifications: true,
    privacyMode: false
  });

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
    const { name, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : e.target.value;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Saved:', { ...settings, emergencyContacts });
    alert('Settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">⚙️ Customizable Settings</h2>
      <form onSubmit={handleSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        <span className="text-gray-700 block mb-2">📞 Emergency Contacts</span>
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="flex items-center mb-4">
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
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addContactField}
          className="mb-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700"
        >
          ➕ Add Contact
        </button>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <span>🔔 Enable Notifications</span>
        </label>
        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            name="privacyMode"
            checked={settings.privacyMode}
            onChange={handleChange}
            className="mr-2"
          />
          <span>🛡️ Enable Privacy Mode</span>
        </label>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};


export default Customizablesettings;