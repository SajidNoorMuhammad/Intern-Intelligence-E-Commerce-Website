import React from 'react';
import { Users, ShieldCheck, UserPlus, Settings, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ordersData = [
  { week: 'Week 1', orders: 25 },
  { week: 'Week 2', orders: 40 },
  { week: 'Week 3', orders: 60 },
  { week: 'Week 4', orders: 45 },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
          <Users className="text-blue-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-xl font-semibold">128</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
          <ShieldCheck className="text-green-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">Approved Users</p>
            <h3 className="text-xl font-semibold">94</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
          <ShieldCheck className="text-red-500" size={28} />
          <div>
            <p className="text-sm text-gray-500">Disabled Users</p>
            <h3 className="text-xl font-semibold">34</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4">
          <UserPlus className="text-purple-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">New Registrations</p>
            <h3 className="text-xl font-semibold">7 Today</h3>
          </div>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart4 size={20} />
          Monthly Orders Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Actions Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/all-users"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View All Users
          </Link>
          <Link
            to="/create-user"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add New User
          </Link>
          <Link
            to="/admin/settings"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <Settings className="inline-block mr-1 -mt-1" size={18} />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
