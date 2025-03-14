import React from 'react';

function Notification() {
  const distressSignals = [
    { id: 1, name: "Aisha Khan", location: "Central Park, NY", coordinates: { lat: 40.785091, lng: -73.968285 }, time: "2025-03-09 14:23", signalPassed: true },
    { id: 2, name: "Meera Patel", location: "5th Avenue, NY", coordinates: { lat: 40.775036, lng: -73.965635 }, time: "2025-03-09 15:45", signalPassed: false }
  ];

  const openLocation = (coordinates) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Distress Signals</h1>
      <div className="grid grid-cols-1 gap-4">
        {distressSignals.filter(signal => signal.signalPassed).map((signal) => (
          <div key={signal.id} className="bg-white rounded-2xl shadow-lg p-4">
            <h2 className="text-xl font-semibold">{signal.name}</h2>
            <p className="text-gray-600">Location: {signal.location}</p>
            <p className="text-gray-600">Time: {signal.time}</p>
            <button
              onClick={() => openLocation(signal.coordinates)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              📍 View Location
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
