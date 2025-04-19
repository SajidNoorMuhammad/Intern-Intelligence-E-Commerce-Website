import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Ban, RotateCcw } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constant/constant';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(AppRoutes.allusers); // replace with your actual URL
            setUsers(res.data.data || []);
            setFilteredUsers(res.data.data || []);
            toast.success("Users loaded successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to load users");
        }
    };

    const handleDisableUser = async (userId) => {
        try {
            const res = await axios.put(`${AppRoutes.updateuser}/${userId}`, {
                status: 'disabled',
            });

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, accountStatus: 'disabled' } : u
                )
            );

            setFilteredUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, accountStatus: 'disabled' } : u
                )
            );

            toast.success("User disabled successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to disable user");
        }
    };

    const handleEnableUser = async (userId) => {
        try {
            const res = await axios.put(`${AppRoutes.updateuser}/${userId}`, {
                status: 'approved',
            });

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, accountStatus: 'approved' } : u
                )
            );

            setFilteredUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, accountStatus: 'approved' } : u
                )
            );

            toast.success("User Approved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to approved user");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!value) {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.cnicNum?.toString().includes(value)
            );
            setFilteredUsers(filtered);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>

            <input
                type="text"
                placeholder="Search by CNIC Number"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full max-w-sm mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="text-left px-6 py-3">Full Name</th>
                            <th className="text-left px-6 py-3">Email</th>
                            <th className="text-left px-6 py-3">CNIC</th>
                            <th className="text-left px-6 py-3">Register Date</th>
                            <th className="text-left px-6 py-3">Status</th>
                            <th className="text-left px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4">{user.fullname}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.cnicNum}</td>
                                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${user.accountStatus === 'approved'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'}`}>
                                        {user.accountStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-3 pt-6">
                                    <Link
                                        to={`/admin/allusers/${user._id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="View Details"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDisableUser(user._id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Disable User"
                                    >
                                        <Ban size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleEnableUser(user._id)}
                                        className="text-green-600 hover:text-green-800"
                                        title="Enable User"
                                    >
                                        <RotateCcw size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No users found.</div>
                )}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AllUsers;
