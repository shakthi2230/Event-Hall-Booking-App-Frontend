import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/AdminNavbar";
import axios from "axios";
import { FaUser, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../config';
import NoBookingsMessage from './NoBookingsMessage'; // Import the new component

const BookingList = () => {
  const { adminData } = useAdminContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch Bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${adminData.access_token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update Booking Status
  const updateStatus = async (id, newStatus) => {
    setUpdating(true);
    try {
      await axios.put(
        `${BASE_URL}/admin/bookings/updatestatus`,
        { id: id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${adminData.access_token}`,
          },
        }
      );

      // After successful status update, fetch the updated bookings
      await fetchBookings();
      toast.success(`Status updated to ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Bookings list</h2>
       
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-gray-600" />
          </div>
        ) : !Array.isArray(bookings) || bookings.length === 0 ? (
          <NoBookingsMessage /> // Use the new component here
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Customer Details */}
                <div className="space-y-4">
                  {/* User Name */}
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <FaUser className="text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">User Name</p>
                      <p className="text-lg font-semibold text-gray-800">{booking.user_name}</p>
                    </div>
                  </div>

                  {/* User Email */}
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-50 rounded-full">
                      <FaEnvelope className="text-purple-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">{booking.user_email}</p>
                    </div>
                  </div>

                  {/* Function Dates */}
                  <div className="flex items-center">
                    <div className="p-3 bg-green-50 rounded-full">
                      <FaCalendarAlt className="text-green-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Function Dates</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {booking.function_start_date} to {booking.function_end_date}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-50 rounded-full">
                      <FaCheckCircle
                        className={`${booking.status === "Approved"
                          ? "text-green-500"
                          : booking.status === "Rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                          }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">Status</p>
                      <p
                        className={`text-lg font-semibold ${booking.status === "Approved"
                          ? "text-green-500"
                          : booking.status === "Rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                          }`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {booking.status === "Approved" ? (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        disabled={updating}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaTimesCircle className="mr-2" />}
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Pending")}
                        disabled={updating}
                        className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaClock className="mr-2" />}
                        Pending
                      </button>
                    </>
                  ) : booking.status === "Rejected" ? (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "Approved")}
                        disabled={updating}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaCheckCircle className="mr-2" />}
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Pending")}
                        disabled={updating}
                        className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaClock className="mr-2" />}
                        Pending
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "Approved")}
                        disabled={updating}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaCheckCircle className="mr-2" />}
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        disabled={updating}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 disabled:opacity-50 flex-1 justify-center"
                      >
                        {updating ? <FaSpinner className="animate-spin mr-2" /> : <FaTimesCircle className="mr-2" />}
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;