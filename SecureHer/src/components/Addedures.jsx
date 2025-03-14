import React, { useState } from 'react';
import { FaChartBar, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaBook, FaPlusCircle, FaEye, FaChevronDown } from "react-icons/fa";

const Addedures = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState('article');
  const [file, setFile] = useState(null);
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file');
      return;
    }
    const newResource = { title, description, resourceType, fileName: file.name };
    console.log('Resource added:', newResource);
    alert('Educational resource added successfully!');
    setTitle('');
    setDescription('');
    setResourceType('article');
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex">
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

      {/* Form Section */}
      <div className="flex-1 p-8 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-8 w-150 hover:shadow-2xl">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center animate-pulse">Add Educational Resource</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter resource title" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide a brief description" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Resource Type</label>
            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200">
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="tutorial">Tutorial</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload File</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200" required />
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-110 w-full">Add Resource</button>
        </form>
      </div>
    </div>
  );
};

export default Addedures;
