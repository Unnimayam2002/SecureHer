import React, { useState } from 'react';
import { FaChartBar, FaChevronDown, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaPlusCircle, FaEye } from "react-icons/fa";

const initialReports = [
  { id: 1, reporter: "Anonymous", reportType: "Harassment", incidentDetails: "Verbal harassment reported near central park", district: "Downtown", location: "New York" },
  { id: 2, reporter: "Emily White", reportType: "Theft", incidentDetails: "Stolen belongings from a parked car", district: "Westside", location: "Los Angeles" },
  { id: 3, reporter: "Anonymous", reportType: "Assault", incidentDetails: "Physical altercation witnessed near shopping mall", district: "Uptown", location: "Chicago" }
];

const Reportslist = () => {
  const [reports, setReports] = useState(initialReports);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center space-x-3 mb-6">
          <img src="/images/logo.png" alt="SecureHer Logo" className="h-12" />
          <h2 className="text-xl font-bold">SecureHer</h2>
        </div>
        <nav>
          <ul className="space-y-6 text-md">
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400"><FaChartBar /> <span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400"><FaUser /> <span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400"><FaSignal /> <span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400"><FaHandsHelping /> <span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400"><FaFileAlt /> <span>Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
                <FaBook /> <span>Educational Resources</span> <FaChevronDown className={`${isEduresOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li><a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400"><FaPlusCircle /> <span>Add Resource</span></a></li>
                  <li><a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400"><FaEye /> <span>View Resources</span></a></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Reports Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Incident Reports</h1>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-500 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-700">{report.reportType} reported by {report.reporter}</h2>
              <p className="text-gray-700">Incident Details: {report.incidentDetails}</p>
              <p className="text-gray-700">District: {report.district}</p>
              <p className="text-gray-700">Location: {report.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reportslist;
