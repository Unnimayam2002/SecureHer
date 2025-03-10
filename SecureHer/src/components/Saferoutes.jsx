import React from 'react'

import { useState } from 'react';

const Saferoutes = () => {
  const [crowdedPlaces] = useState([
    { id: 1, name: 'Central Park, NY', crowdLevel: 'High', safetyRating: 4.8 },
    { id: 2, name: 'Times Square, NY', crowdLevel: 'Very High', safetyRating: 4.7 },
    { id: 3, name: 'Brooklyn Bridge, NY', crowdLevel: 'Moderate', safetyRating: 4.5 }
  ]);

  const getGoogleMapsLink = (place) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-green-800 mb-6">🌍 Safe Routes</h2>
      <div className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        {crowdedPlaces.length > 0 ? (
          <ul className="space-y-4">
            {crowdedPlaces.map((place) => (
              <li key={place.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{place.name}</p>
                <p className="text-gray-700">👥 Crowd Level: {place.crowdLevel}</p>
                <p className="text-gray-700">⭐ Safety Rating: {place.safetyRating} / 5</p>
                <a
                  href={getGoogleMapsLink(place.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  🌐 View on Google Maps
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-lg">No crowded places available at the moment. Check back later!</p>
        )}
      </div>
    </div>
  );
};

export default Saferoutes;