import React, { useState } from 'react';

const Communitysupport = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Alice', location: 'Central Park, NY', need: 'Accompany me to my car', status: 'Open' },
    { id: 2, name: 'Sophia', location: '5th Avenue, NY', need: 'Walk with me to the station', status: 'Open' }
  ]);

  const handleSupport = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'In Progress' } : request
      )
    );
    alert('You’ve offered support! Stay connected and stay safe.');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">🤝 Community Support</h2>
      <div className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        {requests.length > 0 ? (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{request.name} - {request.location}</p>
                <p className="text-gray-700">🆘 {request.need}</p>
                <p className={`text-sm ${request.status === 'Open' ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {request.status}
                </p>
                {request.status === 'Open' && (
                  <button
                    onClick={() => handleSupport(request.id)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Offer Support
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-lg">No support requests at the moment. Check back later!</p>
        )}
      </div>
    </div>
  );
};

export default Communitysupport;
