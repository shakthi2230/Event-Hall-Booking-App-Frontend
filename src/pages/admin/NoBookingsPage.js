import React from 'react';
import { FaClock } from 'react-icons/fa'; // Importing clock icon from react-icons
import { motion } from 'framer-motion'; // For animations

const NoBookingsPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4"
        >
          <FaClock className="text-6xl text-gray-500 animate-pulse" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-xl font-semibold text-gray-700 mb-2"
        >
          No approved bookings
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="text-gray-500 text-lg animate-pulse"
        >
          Please wait for booking..
        </motion.p>
      </div>
    </div>
  );
};

export default NoBookingsPage;
