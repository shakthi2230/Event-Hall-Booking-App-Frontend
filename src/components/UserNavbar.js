import { React, useContext, useState } from "react";
import { FaBuilding, FaClipboardList, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const UserNavbar = () => {
  const { logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">User</h1>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-8">
            
            <a href="/UserDashboard" className="flex items-center space-x-2 hover:opacity-80 transition">
              <FaBuilding className="text-lg" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:opacity-80 transition">
              <FaClipboardList className="text-lg" />
              <span>Booked Halls</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:opacity-80 transition">
              <FaCog className="text-lg" />
              <span>Settings</span>
            </a>
            <a
              href="/logout"
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:opacity-80 transition"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white text-black p-4 shadow-lg rounded-b-lg">
          <div className="space-y-4">
            
            <a href="/UserDashboard" className="block text-lg hover:text-gray-600 transition">
              <FaBuilding className="inline-block mr-2" />
              dashboard
            </a>
            <a href="#" className="block text-lg hover:text-gray-600 transition">
              <FaClipboardList className="inline-block mr-2" />
              Booked Halls
            </a>
            <a href="#" className="block text-lg hover:text-gray-600 transition">
              <FaCog className="inline-block mr-2" />
              Settings
            </a>
            <a
              href="/logout"
              onClick={handleLogout}
              className="block text-lg hover:text-gray-600 transition"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
