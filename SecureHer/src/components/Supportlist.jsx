import React, { useState } from 'react';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";

const initialSupportRequests = [
  { id: 1, helper: "Alice Johnson", requester: "Jane Doe", district: "Downtown", location: "New York", supportType: "Medical Aid", supportDetails: "Needs immediate first aid and transport to hospital", status: "In Progress" },
  { id: 2, helper: "Bob Smith", requester: "Mike Ross", district: "Westside", location: "Los Angeles", supportType: "Legal Assistance", supportDetails: "Requires legal advice for domestic issues", status: "Completed" },
  { id: 3, helper: "Charlie Brown", requester: "Sarah Lee", district: "Uptown", location: "Chicago", supportType: "Counseling", supportDetails: "Seeks emotional support and counseling", status: "In Progress" }
];

const Supportlist = () => {
  const [supportRequests, setSupportRequests] = useState(initialSupportRequests);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  const handleLogout = () => {
    window.location.href = '/';
  };

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
            <li>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-white-400 hover:text-white-600 w-full cursor-pointer">
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Support Requests */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Community Support Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportRequests.map((request) => (
            <div key={request.id} className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-500 hover:scale-105">
              <p className="text-xl font-semibold text-gray-700">Name: {request.requester}</p>
              <p className="text-gray-700">Helper: {request.helper}</p>
              <p className="text-gray-700">District: {request.district}</p>
              <p className="text-gray-700">Location: {request.location}</p>
              <p className="text-gray-700">Support Details: {request.supportDetails}</p>
              <p className={`text-sm font-bold ${request.status === 'Completed' ? 'text-green-500' : request.status === 'In Progress' ? 'text-blue-500' : 'text-yellow-500'}`}>Status: {request.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supportlist;
