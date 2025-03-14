import React, { useState } from "react";
import { 
  FaUsers, FaBell, FaBook, FaRoute, 
  FaExclamationTriangle, FaChartBar, FaChevronDown, FaUser, FaSignal, FaHandsHelping, FaFileAlt, FaPlusCircle, FaEye
} from "react-icons/fa";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dashboardStats = [
  { title: "Total Users", count: 1245, icon: <FaUsers className="text-blue-500 text-3xl" /> },
  { title: "Distress Alerts", count: 68, icon: <FaBell className="text-red-500 text-3xl" /> },
  { title: "Educational Resources", count: 25, icon: <FaBook className="text-purple-500 text-3xl" /> },
  { title: "Safe Routes Reviewed", count: 142, icon: <FaRoute className="text-green-500 text-3xl" /> },
  { title: "Anonymous Reports", count: 31, icon: <FaExclamationTriangle className="text-yellow-500 text-3xl" /> },
];

const barChartData = [
  { name: 'Users', value: 1245 },
  { name: 'Alerts', value: 68 },
  { name: 'Resources', value: 25 },
  { name: 'Routes', value: 142 },
  { name: 'Reports', value: 31 }
];

const pieChartData = [
  { name: 'Users', value: 1245 },
  { name: 'Alerts', value: 68 },
  { name: 'Resources', value: 25 },
  { name: 'Routes', value: 142 },
  { name: 'Reports', value: 31 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#ff69b4'];

const Admindashboard = () => {
  const [isEduresOpen, setIsEduresOpen] = useState(false);

  const toggleEdures = () => setIsEduresOpen(!isEduresOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1">
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

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg flex items-center space-x-3">
                {stat.icon}
                <div>
                  <h2 className="text-md font-semibold">{stat.title}</h2>
                  <p className="text-lg font-bold">{stat.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Bar Chart Report</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Pie Chart Report</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admindashboard;
