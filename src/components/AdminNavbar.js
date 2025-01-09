import React from "react";
import { FaHome, FaClipboardList, FaFileInvoice, FaCog, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { useAdminContext } from '.././context/AdminContext';
const Navbar = () => {
  const { adminData , logout } = useAdminContext();
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

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            <a href="/admin-dashboard" className="flex items-center space-x-2 hover:opacity-90">
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </a>
            <div className="group relative">
              <a
                href="#"
                className="flex items-center space-x-2 hover:opacity-90"
              >
                <FaBuilding className="text-lg" />
                <span>Halls</span>
              </a>
              <div
                className="absolute left-0 hidden mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg group-hover:block group-focus-within:block"
              >
                <a
                  href="/post-hall"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  Post New Hall
                </a>
                <a
                  href="/update-hall-list"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Update Hall
                </a>
              </div>
            </div>

            <div className="group relative">
              <a href="#" className="flex items-center space-x-2 hover:opacity-90">
                <FaClipboardList className="text-lg" />
                <span>Bookings</span>
              </a>
              <div
                className="absolute left-0 hidden mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg group-hover:block group-focus-within:block"
              >
                <a
                  href="/booked-halls"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  Booked Halls
                </a>
                <a
                  href="/approved-halls"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  Approved Halls
                </a>
              </div>
            </div>

            <a href="/invoices" className="flex items-center space-x-2 hover:opacity-90">
              <FaFileInvoice className="text-lg" />
              <span>Invoices</span>
            </a>
            <a href="/settings" className="flex items-center space-x-2 hover:opacity-90">
              <FaCog className="text-lg" />
              <span>Settings</span>
            </a>
            <a
            href="/logout"
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:opacity-90"
        >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
        </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
              onClick={() => document.getElementById("mobile-menu").classList.toggle("hidden")}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/admin-dashboard" className="block text-base hover:opacity-90">
            Dashboard
          </a>
          <a href="/post-hall" className="block text-base hover:opacity-90">
            Post New Hall
          </a>
          <a href="/update-hall" className="block text-base hover:opacity-90">
            Update Hall
          </a>
          <a href="/booked-halls" className="block text-base hover:opacity-90">
            Booked Halls
          </a>
          <a href="/approved-halls" className="block text-base hover:opacity-90">
            Approved Halls
          </a>
          <a href="/invoices" className="block text-base hover:opacity-90">
            Invoices
          </a>
          <a href="/settings" className="block text-base hover:opacity-90">
            Settings
          </a>
          <a href="/logout" className="block text-base hover:opacity-90">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
