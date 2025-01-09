import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/AdminNavbar";
import axios from "axios";
import { FaEnvelope, FaCalendarAlt, FaCheckCircle, FaFileInvoice } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config';
const InvoiceSendPage = () => {
  const { adminData } = useAdminContext();
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [maintenanceCharge, setMaintenanceCharge] = useState(0);
  const [cleaningCharge, setCleaningCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  // Fetch Approved Bookings
  const fetchApprovedBookings = async () => {
    setLoading(true);
    setError(null);  // Reset any previous errors
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/bookings/approved`,
        {
          headers: {
            Authorization: `Bearer ${adminData.access_token}`,
          },
        }
      );
      setApprovedBookings(response.data);
    } catch (error) {
      setError("No approved bookings. Please wait for booking.");
      console.error("Error fetching approved bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedBookings();
  }, []);

  const handleSendInvoice = async () => {
    const bookingId = selectedBooking.id;
    const hallId = selectedBooking.hall_id;
    const userId = selectedBooking.user_id;
    const hallTotalPrice = selectedBooking.total_price;
    const useremail = selectedBooking.user_email;

    // Calculate total amount
    const totalWithCharges = hallTotalPrice + maintenanceCharge + cleaningCharge;
    const gstAmount = (totalWithCharges * 18) / 100;
    const finalTotal = totalWithCharges + gstAmount;

    setTotalAmount(finalTotal);

    // Send the invoice data to backend
    try {
      await axios.post(
        `${BASE_URL}/admin/invoices/`,
        {
          booking_id: bookingId,
          hall_id: hallId,
          user_id: userId,
          maintenance_charge: maintenanceCharge,
          cleaning_charge: cleaningCharge,
          hall_total_price: hallTotalPrice,
          useremail: useremail
        },
        {
          headers: {
            Authorization: `Bearer ${adminData.access_token}`,
          },
        }
      );
      alert("Invoice sent successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error sending invoice. Please try again.");
      console.error("Error sending invoice:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Invoice Send Page</h2>

        {/* Loading and Error Handling */}
        {loading && <p className="text-gray-600">Loading approved bookings...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && approvedBookings.length > 0 ? (
          <div className="space-y-6 max-w-xl mx-auto">
            {approvedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl p-6 space-y-4"
              >
                {/* Header with User Name and Send Invoice Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">{booking.user_name}</h3>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setMaintenanceCharge(0);
                      setCleaningCharge(0);
                      setTotalAmount(0);
                    }}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    <FaFileInvoice className="mr-2" />
                    Send Invoice
                  </button>
                </div>

                {/* User Email */}
                <p className="flex items-center text-sm text-gray-700">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  Email: {booking.user_email}
                </p>

                {/* Hall Price */}
                <p className="flex items-center text-sm text-gray-800 font-medium">
                  ₹ {booking.total_price} <span className="ml-1 text-gray-500">(Total Hall Per / Day)</span>
                </p>

                {/* GST */}
                <p className="text-sm text-gray-700">
                  GST: {booking.gst}%
                </p>

                {/* Function Dates */}
                <p className="flex items-center text-sm text-gray-700">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  Function Dates: {booking.function_start_date} to {booking.function_end_date}
                </p>

                {/* Status */}
                <p className="flex items-center text-sm text-gray-700">
                  <FaCheckCircle className={`mr-2 ${booking.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`} />
                  Status: {booking.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-600">No approved bookings available.</p>
        )}

        {/* Modal for Admin to input charges */}
        {selectedBooking && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Enter Charges for Invoice</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Maintenance Charge</label>
                <input
                  type="number"
                  value={maintenanceCharge}
                  onChange={(e) => setMaintenanceCharge(parseFloat(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Cleaning Charge</label>
                <input
                  type="number"
                  value={cleaningCharge}
                  onChange={(e) => setCleaningCharge(parseFloat(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <p className="text-sm">Total (including GST): ₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvoice}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceSendPage;
