import React from "react";
import { FaHome, FaClipboardList, FaFileInvoice, FaCog, FaSignOutAlt, FaBuilding, FaUserCircle } from "react-icons/fa";
import { useAdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { adminData, logout } = useAdminContext();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default anchor tag navigation
    logout(); // Clear admin context
    window.location.href = '/'; // Redirect to logout page or desired location
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">Admin</h1>
          </div>

          {/* Menu Items for Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/booked-halls" className="flex items-center space-x-2 hover:opacity-90 text-lg">
              <FaHome className="text-xl" />
              <span>Dashboard</span>
            </a>
            <div className="group relative">
              <a href="/post-hall" className="flex items-center space-x-2 hover:opacity-90 text-lg">
                <FaBuilding className="text-xl" />
                <span>Post New Hall</span>
              </a>
              {/* <div className="absolute left-0 hidden mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg group-hover:block group-focus-within:block">
                <a href="/post-hall" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                  Post New Hall
                </a>
                <a href="/update-hall-list" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">
                  Update Hall
                </a>
              </div> */}
            </div>
            <a href="/invoices" className="flex items-center space-x-2 hover:opacity-90 text-lg">
              <FaFileInvoice className="text-xl" />
              <span>Invoices</span>
            </a>
            <a href="" className="flex items-center space-x-2 hover:opacity-90 text-lg">
              <FaCog className="text-xl" />
              <span>Settings</span>
            </a>
            <a href="/logout" onClick={handleLogout} className="flex items-center space-x-2 hover:opacity-90 text-lg">
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </a>
          </div>

          {/* Mobile Profile Icon */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
              onClick={() => document.getElementById("profile-menu").classList.toggle("hidden")}
            >
              <FaUserCircle className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Profile Menu */}
      <div id="profile-menu" className="hidden md:hidden bg-gradient-to-r from-teal-500 to-indigo-600">
        <div className="px-4 pt-4 pb-6 space-y-4">
          <a href="/admin-dashboard" className="block text-lg hover:opacity-90">
            <FaHome className="inline-block mr-2" />
            Dashboard
          </a>
          <a href="/post-hall" className="block text-lg hover:opacity-90">
            <FaBuilding className="inline-block mr-2" />
            Post New Hall
          </a>
          {/* <a href="/update-hall-list" className="block text-lg hover:opacity-90">
            <FaBuilding className="inline-block mr-2" />
            Update Hall
          </a> */}
          <a href="/invoices" className="block text-lg hover:opacity-90">
            <FaFileInvoice className="inline-block mr-2" />
            Invoices
          </a>
          <a href="" className="block text-lg hover:opacity-90">
            <FaCog className="inline-block mr-2" />
            Settings
          </a>
          <a href="/logout" onClick={handleLogout} className="block text-lg hover:opacity-90">
            <FaSignOutAlt className="inline-block mr-2" />
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
