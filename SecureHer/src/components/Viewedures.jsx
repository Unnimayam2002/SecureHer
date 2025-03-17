import React, { useState } from 'react';
import { 
  FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaChevronDown, FaPlusCircle, FaEye, FaSignOutAlt
} from "react-icons/fa";

const initialResources = [
  { id: 1, title: "Self-Defense Basics", description: "Learn the essentials of self-defense.", resourceType: "article", link: "https://example.com/self-defense" },
  { id: 2, title: "Emergency Contact Guide", description: "Important numbers and emergency services.", resourceType: "video", link: "https://example.com/emergency-guide" }
];

const Viewedures = () => {
  const [resources, setResources] = useState(initialResources);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  const handleEdit = (id) => {
    const updatedResources = resources.map((resource) => {
      if (resource.id === id) {
        const newTitle = prompt("Edit title:", resource.title);
        const newDescription = prompt("Edit description:", resource.description);
        const newLink = prompt("Edit link:", resource.link);
        return { ...resource, title: newTitle || resource.title, description: newDescription || resource.description, link: newLink || resource.link };
      }
      return resource;
    });
    setResources(updatedResources);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

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
            <li><a href="/admin/admin-dashboard" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaChartBar /> <span>Dashboard</span></a></li>
            <li><a href="/admin/userlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaUser /> <span>Users</span></a></li>
            <li><a href="/admin/signallist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaSignal /> <span>Distress Signals</span></a></li>
            <li><a href="/admin/supportlist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaHandsHelping /> <span>Community Support</span></a></li>
            <li><a href="/admin/reportslist" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaFileAlt /> <span>Reports</span></a></li>
            <li>
              <div onClick={toggleEdures} className={`flex items-center space-x-2 cursor-pointer hover:text-blue-400`}>
                <FaBook /> <span>Educational Resources</span> <FaChevronDown className={`${isEduresOpen ? 'rotate-180' : ''} transition-transform`} />
              </div>
              {isEduresOpen && (
                <ul className="pl-6 space-y-4">
                  <li><a href="/admin/addedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaPlusCircle /> <span>Add Resource</span></a></li>
                  <li><a href="/admin/viewedures" className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer"><FaEye /> <span>View Resources</span></a></li>
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

      {/* View Resources Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Educational Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-500 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-700">{resource.title}</h2>
              <p className="text-gray-700">{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resource</a>
              <div className="mt-4 space-x-2">
                <button onClick={() => handleEdit(resource.id)} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(resource.id)} className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewedures;