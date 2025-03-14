import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';

const keralaPlaces = [
  'Thiruvananthapuram', 'Neyyattinkara', 'Varkala', 'Attingal',
  'Kollam', 'Karunagappally', 'Punalur', 'Paravur',
  'Pathanamthitta', 'Adoor', 'Ranni', 'Thiruvalla',
  'Alappuzha', 'Cherthala', 'Kayamkulam', 'Mavelikkara',
  'Kottayam', 'Changanassery', 'Vaikom', 'Pala',
  'Idukki', 'Munnar', 'Thodupuzha', 'Kattappana',
  'Ernakulam', 'Kochi', 'Aluva', 'Perumbavoor', 'Kothamangalam', 'Angamaly',
  'Thrissur', 'Guruvayur', 'Chalakudy', 'Kunnamkulam', 'Irinjalakuda',
  'Palakkad', 'Ottapalam', 'Shoranur', 'Mannarkkad', 'Alathur',
  'Malappuram', 'Manjeri', 'Tirur', 'Perinthalmanna', 'Nilambur', 'Ponnani',
  'Kozhikode', 'Koyilandy', 'Vadakara', 'Feroke', 'Ramanattukara',
  'Wayanad', 'Kalpetta', 'Sulthan Bathery', 'Mananthavady',
  'Kannur', 'Thalassery', 'Payyannur', 'Taliparamba', 'Mattannur',
  'Kasaragod', 'Nileshwaram', 'Kanhangad', 'Bekal', 'Cheruvathur',
  'Pattambi', 'Malappuram City', 'Kodungallur', 'Edappal', 'Valanchery',
  'Vadakkancherry', 'Chavakkad', 'Parappanangadi', 'Tirurangadi', 'Kondotty',
  'Kunnamangalam', 'Thamarassery', 'Nadapuram', 'Payyanur', 'Kuthuparamba',
  'Pappinisseri', 'Iritty', 'Cherupuzha', 'Peravoor', 'Kudiyanmala'
];

const Saferoutes = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [currentDistrict, setCurrentDistrict] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const district = data.address.state_district || data.address.county || 'Unknown District';
          setCurrentDistrict(district);
        },
        (error) => console.error('Error fetching location:', error)
      );
    }
  }, []);

  const getSafeRoute = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&travelmode=walking`;
    setRoute(googleMapsUrl);
  };

  const allPlaces = ['Current Location', currentDistrict, ...keralaPlaces];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-4xl font-extrabold text-green-900 mb-8">🌍 Safe Routes Navigator</h2>
      <div className="w-3/4 bg-white p-8 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-lg font-semibold text-gray-800">Starting Point</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
              <input
                list="places"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full pl-10 pr-4 py-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Choose starting location"
              />
              <datalist id="places">
                {allPlaces.map((place, index) => (
                  <option key={index} value={place} />
                ))}
              </datalist>
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800">Destination</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
              <input
                list="places"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full pl-10 pr-4 py-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Choose destination"
              />
            </div>
          </div>
        </div>
        <button
          onClick={getSafeRoute}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300 text-lg flex items-center justify-center space-x-2 shadow-md cursor-pointer"
        >
          <FaRoute />
          <span>Get Safe Route</span>
        </button>
      </div>

      <div className="mt-10 w-3/4">
        <h3 className="text-2xl font-bold text-green-900 mb-4">🗺️ Your Safe Route Map</h3>
        {route ? (
          <a
            href={route}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            Open Safe Route in Google Maps
          </a>
        ) : (
          <iframe
            title="Current Location Map"
            src={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=15&output=embed`}
            width="100%"
            height="500"
            style={{ borderRadius: '16px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Saferoutes;
