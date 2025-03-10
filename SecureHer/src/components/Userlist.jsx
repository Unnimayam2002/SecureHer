import React, { useState } from 'react';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye 
} from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "Alice Johnson", district: "Downtown", location: "New York" },
  { id: 2, name: "Bob Smith", district: "Westside", location: "Los Angeles" },
  { id: 3, name: "Charlie Brown", district: "Uptown", location: "Chicago" }
];

const Userlist = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  const handleEdit = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        const newName = prompt("Edit name:", user.name);
        const newDistrict = prompt("Edit district:", user.district);
        const newLocation = prompt("Edit location:", user.location);
        return { ...user, name: newName || user.name, district: newDistrict || user.district, location: newLocation || user.location };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
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
          </ul>
        </nav>
      </aside>

      {/* Users Table */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Users List</h1>
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden  ">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">District</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-left uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b bg-gray-50 hover:bg-blue-50 transition duration-300">
                  <td className="py-3 px-6 font-medium text-gray-800">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700">{user.district}</td>
                  <td className="py-3 px-6 text-gray-700">{user.location}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transform transition duration-200 hover:scale-105"
                    >
                      Edit
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
