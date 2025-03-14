import { useState, useEffect } from 'react';

const Realtimelocation = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

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

  const handleSearch = async () => {
    if (!searchInput) return;

    try {
      const response = await fetch(`/api/getUserLocation?query=${searchInput}`);
      const data = await response.json();

      if (data.location) {
        setUserLocation(data.location);
        setError('');
      } else {
        setUserLocation(null);
        setError('User not found or location unavailable');
      }
    } catch (err) {
      console.error('Error fetching user location:', err);
      setError('Failed to fetch user location');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🔍 View User Location & Live Tracker</h2>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter email or phone number"
          className="p-3 rounded-xl shadow-md w-72 text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-600 cursor-pointer"
        >
          Search
        </button>
      </div>

      <iframe
        width="75%"
        height="400"
        style={{ borderRadius: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '24px' }}
        src={userLocation ? `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed` : `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=15&output=embed`}
        allowFullScreen
      ></iframe>

      {error && <p className="text-red-500 text-lg">⚠️ {error}</p>}

      {userLocation && (
        <div className="h-40 w-3/4 rounded-2xl shadow-2xl bg-white p-6">
          <p className="text-lg text-gray-800">📍 Searched Location: {userLocation.lat}, {userLocation.lng}</p>
          <p className="text-sm text-gray-500">🕒 Last updated: {userLocation.time}</p>
        </div>
      )}

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
