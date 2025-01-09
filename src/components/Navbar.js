import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="text-white text-2xl font-bold">Admin</div>

        
        <button
          className="text-white lg:hidden block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

     
        <div
          className={`flex-col lg:flex-row lg:flex ${
            isMenuOpen ? 'flex' : 'hidden'
          } lg:space-x-4 space-y-4 lg:space-y-0 items-center lg:items-center`}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            My Profile
          </button>
          <button
            onClick={() => navigate('/notes')}
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Notes
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
