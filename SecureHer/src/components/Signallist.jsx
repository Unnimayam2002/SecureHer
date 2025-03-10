import React, { useState } from 'react';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye 
} from "react-icons/fa";

const distressSignals = [
  { id: 1, helper: "Alice Johnson", victim: "Emma White", district: "Downtown", location: "New York", status: "Active" },
  { id: 2, helper: "Bob Smith", victim: "Olivia Green", district: "Westside", location: "Los Angeles", status: "Resolved" },
  { id: 3, helper: "Charlie Brown", victim: "Sophia Blue", district: "Uptown", location: "Chicago", status: "Pending" }
];

const Signallist = () => {
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex">
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

      {/* Distress Signals Cards */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Distress Signals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distressSignals.map((signal) => (
            <div key={signal.id} className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-700">Name: {signal.victim}</h2>
              <p className="text-gray-600"><strong>Helper:</strong> {signal.helper}</p>
              <p className="text-gray-600"><strong>District:</strong> {signal.district}</p>
              <p className="text-gray-600"><strong>Location:</strong> {signal.location}</p>
              <p className={`text-lg font-semibold mt-4 ${signal.status === 'Active' ? 'text-red-500' : signal.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}`}>Status: {signal.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signallist;