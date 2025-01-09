import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserShield } from "react-icons/fa"; // React Icons for User and Admin login

const LoginOptionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg text-center space-y-8">
        {/* Header Section */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Welcome to the Experience Hub</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Choose your login type to get started. Whether you are a user or an admin, we have the right tools for you to manage your experiences.
        </p>

        <div className="space-y-6">
          {/* User Login Button with Icon */}
          <button
            onClick={() => navigate("/user-login")}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-4"
          >
            <FaUserAlt className="text-2xl" />
            <span>User Login</span>
          </button>

          {/* Admin Login Button with Icon */}
          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-4"
          >
            <FaUserShield className="text-2xl" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-gray-600 text-sm">
          <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginOptionsPage;
