import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();


  if (!authState.token) {
    navigate('/');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> 
      
      
      <div className="flex-grow bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Welcome, {authState.username}</h2>
         
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
