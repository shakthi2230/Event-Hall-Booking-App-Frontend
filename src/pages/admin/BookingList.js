import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/AdminNavbar";
import axios from "axios";
import { FaUser, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import BASE_URL from '../../config';

const BookingList = () => {
  const { adminData } = useAdminContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      alert("Error fetching bookings:", error)
    } finally {
      setLoading(false);
    }
  };


  // Update Booking Status
  const updateStatus = async (id, newStatus) => {
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
      fetchBookings();

      // Set the success message
      alert("Status updated successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.")
      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking List</h2>
        {loading ? (
          <p className="text-gray-600">Loading bookings...</p>
        )
          : !Array.isArray(bookings) || bookings.length === 0 ? (
            <p className="text-gray-600">No bookings for you.</p>)

            : (
              <div className="space-y-6 max-w-2xl mx-auto">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between"
                  >
                    {/* Customer Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <FaUser className="mr-2 text-gray-500" />
                        {booking.user_name}
                      </h3>
                      <p className="text-sm text-gray-700 flex items-center mt-1">
                        <FaEnvelope className="mr-2 text-gray-500" />
                        {booking.user_email}
                      </p>
                      <p className="mt-2 text-sm text-gray-800 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-500" />
                        <strong>Function Dates:</strong> {booking.function_start_date} to {booking.function_end_date}
                      </p>
                      <p className="mt-1 text-sm text-gray-800 flex items-center">
                        <FaCheckCircle
                          className={`mr-2 ${booking.status === "Approved"
                            ? "text-green-500"
                            : booking.status === "Rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                            }`}
                        />
                        <strong>Status:</strong>
                        <span
                          className={`ml-2 font-semibold ${booking.status === "Approved"
                            ? "text-green-500"
                            : booking.status === "Rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 md:mt-0 flex space-x-3">
                      <button
                        onClick={() => updateStatus(booking.id, "Approved")}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                      >
                        <FaCheckCircle className="mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                      >
                        <FaTimesCircle className="mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "Pending")}
                        className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                      >
                        <FaClock className="mr-2" />
                        Pending
                      </button>
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
