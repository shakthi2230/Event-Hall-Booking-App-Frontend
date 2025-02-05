import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaKey, FaCreditCard } from "react-icons/fa"; // Icons for admin, password, and subscriptions

const AdminSettingsPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
  });
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    plan: "",
    status: "",
  });

  // Handle form submissions
  const handleAdminDetailsUpdate = (e) => {
    e.preventDefault();
    console.log("Admin Details Updated:", adminDetails);
    alert("Admin details updated successfully!");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Password Updated:", passwordDetails);
    alert("Password updated successfully!");
  };

  const handleSubscriptionUpdate = (e) => {
    e.preventDefault();
    console.log("Subscription Updated:", subscriptionDetails);
    alert("Subscription updated successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <div className="bg-white p-4 sm:p-8 md:p-12 rounded-lg shadow-xl w-full max-w-4xl text-center space-y-8">
        {/* Header Section */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Admin Settings
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Manage your admin details, update your password, and manage your
          subscription plans.
        </p>

        {/* Admin Details Update Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
            <FaUserShield className="text-2xl" />
            <span>Update Admin Details</span>
          </h3>
          <form onSubmit={handleAdminDetailsUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={adminDetails.name}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={adminDetails.email}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Update Details
            </button>
          </form>
        </div>

        {/* Password Update Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
            <FaKey className="text-2xl" />
            <span>Update Password</span>
          </h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordDetails.currentPassword}
              onChange={(e) =>
                setPasswordDetails({
                  ...passwordDetails,
                  currentPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordDetails.newPassword}
              onChange={(e) =>
                setPasswordDetails({
                  ...passwordDetails,
                  newPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordDetails.confirmPassword}
              onChange={(e) =>
                setPasswordDetails({
                  ...passwordDetails,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Subscription Management Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
            <FaCreditCard className="text-2xl" />
            <span>Manage Subscription</span>
          </h3>
          <form onSubmit={handleSubscriptionUpdate} className="space-y-4">
            <select
              value={subscriptionDetails.plan}
              onChange={(e) =>
                setSubscriptionDetails({
                  ...subscriptionDetails,
                  plan: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Plan
              </option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
            <select
              value={subscriptionDetails.status}
              onChange={(e) =>
                setSubscriptionDetails({
                  ...subscriptionDetails,
                  status: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              Update Subscription
            </button>
          </form>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;