import {React , useContext } from "react";
import { FaBuilding, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const UserNavbar = () => {
 const {logoutUser, loginuser} = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">User</h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
          <a href="/user-dashboard" className="flex items-center space-x-2 hover:opacity-90">
              <FaBuilding className="text-lg" />
              <span>Dashboard</span>
            </a>
            <a href="/user-hall-list" className="flex items-center space-x-2 hover:opacity-90">
              <FaBuilding className="text-lg" />
              <span>Hall List</span>
            </a>
            <a href="/booked-halls" className="flex items-center space-x-2 hover:opacity-90">
              <FaClipboardList className="text-lg" />
              <span>Booked Halls</span>
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
              onClick={() =>
                document.getElementById("mobile-menu").classList.toggle("hidden")
              }
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
          <a href="/user-hall-list" className="block text-base hover:opacity-90">
            Hall List
          </a>
          <a href="/user-hall-list" className="block text-base hover:opacity-90">
            Booked Halls
          </a>
          <a href="/settings" className="block text-base hover:opacity-90">
            Settings
          </a>
          <a
            href="/logout"
            onClick={handleLogout}
            className="block text-base hover:opacity-90"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
