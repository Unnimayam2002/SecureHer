import React, { useState } from 'react';

const Anorep = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      reportType: 'Assault',
      incidentDetails: 'Physical assault reported near the subway station.',
      location: 'Central Subway Station',
      district: 'Downtown',
      reportingMethod: 'anonymous',
    },
    {
      id: 2,
      reportType: 'Abduction Attempt',
      name: 'Thomas Mathew',
      incidentDetails: 'A suspicious individual tried to lure a child into their vehicle.',
      location: 'Maplewood Elementary School',
      district: 'Eastside',
      reportingMethod: 'other',
    },
    {
      id: 3,
      reportType: 'Stalking',
      incidentDetails: 'Repeated sightings of the same person following a resident home.',
      location: 'Greenview Apartments',
      district: 'Uptown',
      reportingMethod: 'anonymous',
    },
  ];

  const filteredReports = reports.filter(
    (report) =>
      report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h2 className="text-4xl font-extrabold text-red-800 mb-8">📋 Incident Reports</h2>
      <p className="text-lg text-gray-700 mb-6">Review submitted reports and help ensure community safety.</p>
      <input
        type="text"
        placeholder="Search by incident type, location, or district..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-3/4 px-4 py-3 mb-8 border rounded-lg focus:ring-2 focus:ring-red-400 transition duration-200"
      />
      <div className="w-3/4 grid gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="bg-white p-8 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-red-600">{report.reportType}</h3>
              <p className="text-gray-900 mt-4"><strong className="text-red-700">Incident Details:</strong> {report.incidentDetails}</p>
              <p className="text-gray-900 mt-2"><strong className="text-red-700">Location:</strong> {report.location}</p>
              <p className="text-gray-900 mt-2"><strong className="text-red-700">District:</strong> {report.district}</p>
              {report.name && <p className="text-gray-900 mt-2"><strong className="text-red-700">Reporter:</strong> {report.name}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No reports available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Anorep;
