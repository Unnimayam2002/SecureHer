import React from 'react'

const Anorep = () => {
    const reports = [
        {
            id: 1,
            reportType: 'Assault',
            incidentDetails: 'Physical assault reported near the subway station.',
            location: 'Central Subway Station',
            reportingMethod: 'anonymous',
          },
          {
            id: 2,
            reportType: 'Abduction Attempt',
            name: 'Thomas Mathew',
            incidentDetails: 'A suspicious individual tried to lure a child into their vehicle.',
            location: 'Maplewood Elementary School',
            reportingMethod: 'other',
          },
          {
            id: 3,
            reportType: 'Stalking',
            incidentDetails: 'Repeated sightings of the same person following a resident home.',
            location: 'Greenview Apartments',
            reportingMethod: 'anonymous',
          }
        ];
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <h2 className="text-4xl font-extrabold text-red-800 mb-8">📋 Anonymous Reports</h2>
        <p className="text-lg text-gray-700 mb-6">Review submitted reports and help ensure community safety.</p>
        <div className="w-3/4 grid gap-6">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="bg-white p-8 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-2xl font-semibold text-red-600">{report.reportType}</h3>
                <p className="text-gray-900 mt-4"><strong className="text-red-700">Incident Details:</strong> {report.incidentDetails}</p>
                <p className="text-gray-900 mt-2"><strong className="text-red-700">Location:</strong> {report.location}</p>
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