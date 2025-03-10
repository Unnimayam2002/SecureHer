import React from 'react'
import { useState } from 'react';

const Educationalresources = () => {
  const [resources] = useState([
    { id: 1, title: 'Self-Defense Techniques', type: 'Article', link: 'https://example.com/self-defense' },
    { id: 2, title: 'Know Your Legal Rights', type: 'Video', link: 'https://example.com/legal-rights' },
    { id: 3, title: 'Emergency Safety Tips', type: 'Tutorial', link: 'https://example.com/safety-tips' }
  ]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-green-800 mb-6">📚 Educational Resources</h2>
      <div className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        {resources.length > 0 ? (
          <ul className="space-y-4">
            {resources.map((resource) => (
              <li key={resource.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{resource.title}</p>
                <p className="text-gray-700">📝 Type: {resource.type}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  🔗 Access Resource
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-lg">No resources available at the moment. Check back later!</p>
        )}
      </div>
    </div>
  );
};


export default Educationalresources;