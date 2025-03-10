import { useState, useEffect } from 'react';

const Realtimelocation = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const timestamp = new Date().toLocaleTimeString();
          const newLocation = { lat: latitude, lng: longitude, time: timestamp };

          setCurrentLocation({ lat: latitude, lng: longitude });
          setLocations((prevLocations) => [...prevLocations, newLocation]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👩 Live Journey Tracker</h2>
      <iframe
        width="75%"
        height="400"
        style={{ borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        src={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=15&output=embed`}
        allowFullScreen
      ></iframe>
      <div className="h-40 w-3/4 rounded-2xl shadow-2xl bg-white p-6 overflow-y-auto mt-6">
        {locations.length > 0 ? (
          <ul className="space-y-3">
            {locations.map((loc, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <span className="font-semibold text-blue-600">📍 Location {index + 1}:</span> {loc.lat}, {loc.lng}
                <span className="block text-sm text-gray-500 mt-1">🕒 {loc.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">⏳ Fetching your journey details...</p>
        )}
      </div>
    </div>
  );
};

export default Realtimelocation;
