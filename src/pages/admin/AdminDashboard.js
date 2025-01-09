import React from 'react';
import { useAdminContext } from '../../context/AdminContext';
import Navbar from '../../components/AdminNavbar';

const AdminDashboard = () => {
    const { adminData , logout } = useAdminContext();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {adminData.admin_name }!
                </h1>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {/* Card: Total Halls */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-700">Total Halls</h2>
                        <p className="text-3xl font-bold text-blue-500 mt-2">25</p>
                    </div>

                    {/* Card: Booked Halls */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-700">Booked Halls</h2>
                        <p className="text-3xl font-bold text-green-500 mt-2">18</p>
                    </div>

                    {/* Card: Approved Halls */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-700">Approved Halls</h2>
                        <p className="text-3xl font-bold text-purple-500 mt-2">15</p>
                    </div>

                    {/* Card: Pending Approvals */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-700">Pending Approvals</h2>
                        <p className="text-3xl font-bold text-red-500 mt-2">5</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-800">Recent Bookings</h2>
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">Customer Name</th>
                                    <th className="py-3 px-6 text-left">Hall Name</th>
                                    <th className="py-3 px-6 text-left">Date</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">John Doe</td>
                                    <td className="py-3 px-6">Grand Hall</td>
                                    <td className="py-3 px-6">2025-01-10</td>
                                    <td className="py-3 px-6 text-green-500 font-semibold">Approved</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">Jane Smith</td>
                                    <td className="py-3 px-6">Conference Room</td>
                                    <td className="py-3 px-6">2025-01-15</td>
                                    <td className="py-3 px-6 text-red-500 font-semibold">Pending</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-6">Sam Wilson</td>
                                    <td className="py-3 px-6">Banquet Hall</td>
                                    <td className="py-3 px-6">2025-01-20</td>
                                    <td className="py-3 px-6 text-green-500 font-semibold">Approved</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
