import React, { useState } from 'react';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "Alice Johnson", district: "Downtown", location: "New York", email: "alice.johnson@example.com", phone: "123-456-7890" },
  { id: 2, name: "Bob Smith", district: "Westside", location: "Los Angeles", email: "bob.smith@example.com", phone: "987-654-3210" },
  { id: 3, name: "Charlie Brown", district: "Uptown", location: "Chicago", email: "charlie.brown@example.com", phone: "555-555-5555" }
];

const Userlist = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  const handleVerify = (id) => {
    alert(`User with ID ${id} has been verified.`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
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
              <div onClick={handleLogout} className="flex items-center space-x-2 text-white hover:text-gray-400 cursor-pointer">
                <FaSignOutAlt /> <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Users Table */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Users List</h1>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">District</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Phone</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b bg-gray-50 hover:bg-blue-50 transition duration-300">
                  <td className="py-3 px-6 font-medium text-gray-800">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700">{user.district}</td>
                  <td className="py-3 px-6 text-gray-700">{user.location}</td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700">{user.phone}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => handleVerify(user.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transform transition duration-200 hover:scale-105"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transform transition duration-200 hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
