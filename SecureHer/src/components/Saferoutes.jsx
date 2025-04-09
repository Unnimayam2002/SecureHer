import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { getReportAPI, safeRouteAPI } from '../services/saferouteServices';

const keralaPlaces = [/*... your existing place array ...*/];

const getCoordinates = async (placeName) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
  );
  const data = await response.json();
  if (data.length === 0) throw new Error('Location not found');
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

const Saferoutes = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);

  const {
    data: routeData,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['safeRoute'],
    queryFn: () =>
      safeRouteAPI({
        startLatitude: startCoords.lat,
        startLongitude: startCoords.lng,
        endLatitude: endCoords.lat,
        endLongitude: endCoords.lng,
      }),
    enabled: false,
  });

  const {
    data: reportData,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: getReportAPI,
  });

  const getSafeRoute = async () => {
    try {
      const startC = await getCoordinates(start);
      const endC = await getCoordinates(end);

      setStartCoords(startC);
      setEndCoords(endC);

      setTimeout(() => {
        refetch();
      }, 100);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      alert('Error generating route. Please check locations and try again.');
    }
  };

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
                {keralaPlaces.map((place, index) => (
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
        {isFetching ? (
          <p className="text-gray-500">Fetching route...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to get safe route. Please try again.</p>
        ) : routeData?.googleMapsUrl ? (
          <a
            href={routeData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            Open Safe Route in Google Maps
          </a>
        ) : (
          <p className="text-gray-500">Select locations and generate route to view it here.</p>
        )}
      </div>

      {/* Render the interactive map with route and incident markers */}
      {startCoords && endCoords && reportData && (
        <div className="mt-10 w-3/4">
          <InlineSafeRouteMap
            startCoords={startCoords}
            endCoords={endCoords}
            reportData={reportData}
          />
          
        </div>
      )}
    </div>
  );
};

export default Saferoutes;

const InlineSafeRouteMap = ({ startCoords, endCoords, reportData }) => {
  const mapRef = React.useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!startCoords || !endCoords) return;
  
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Missing Google Maps API key!');
      return;
    }
  
    const initMap = () => {
      if (!mapRef.current) {
        console.warn('Map container not yet mounted');
        return;
      }
  
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: startCoords,
        zoom: 10,
      });
  
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(mapInstance);
  
      directionsService.route(
        {
          origin: startCoords,
          destination: endCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
  
      // Report markers
      reportData?.forEach((report) => {
        new window.google.maps.Marker({
          position: {
            lat: parseFloat(report.latitude),
            lng: parseFloat(report.longitude),
          },
          map: mapInstance,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        });
      });
  
      setMap(mapInstance);
    };
  
    const loadGoogleMaps = () => {
      if (!window.google && !document.querySelector('#googleMapsScript')) {
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else if (window.google) {
        initMap();
      }
    };
  
    loadGoogleMaps();
  }, [startCoords, endCoords, reportData]);
}  