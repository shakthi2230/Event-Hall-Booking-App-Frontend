import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Import the UserContext
import UserNavbar from "../../components/UserNavbar";

const UserDashboard = () => {
    const { user } = useContext(UserContext); // Access the current user from the context

    // Sample data for recent bookings (this can be dynamically fetched)
    const recentBookings = [
        { id: 1, event: "Conference Hall Booking", date: "2025-01-05", status: "Confirmed" },
        { id: 2, event: "Wedding Reception", date: "2025-02-14", status: "Pending" },
        { id: 3, event: "Business Meeting", date: "2025-03-01", status: "Confirmed" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <UserNavbar />

            {/* Main Content */}
            <main className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Personalized greeting */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {user ? `Hello, ${user}` : "Welcome to the User Dashboard"}
                    </h1>

                    {/* Introduction */}
                    <p className="text-lg text-gray-700">
                        Manage your event bookings and track your history in one place. Below you'll find your recent bookings, account updates, and more.
                    </p>

                    {/* Recent Bookings Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="border-b-2 pb-4 flex justify-between items-center">
                                    <div className="text-gray-800">
                                        <p className="font-bold">{booking.event}</p>
                                        <p className="text-sm text-gray-500">{`Date: ${booking.date}`}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span
                                            className={`inline-block py-1 px-3 text-xs rounded-full ${booking.status === "Confirmed" ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action/Features Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition">
                                <a href="/user-hall-list">
                                    <h3 className="text-xl">Create New Bookings</h3>
                                    <p className="text-sm text-gray-600 mt-2">Book a new event with us today.</p>
                                </a>
                               
                            </div>

                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition">
                                <h3 className="text-xl">View My Bookings</h3>
                                <p className="text-sm text-gray-600 mt-2">Check the status of your current bookings.</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition">
                                <h3 className="text-xl">Manage Profile</h3>
                                <p className="text-sm text-gray-600 mt-2">Update your contact and account details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
