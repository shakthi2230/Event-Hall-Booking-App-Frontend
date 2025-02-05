import React from 'react';
import { FaCalendarPlus, FaPhoneAlt, FaUserClock, FaInfoCircle } from 'react-icons/fa';

const NoBookingsMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 m-0 p-0">
            <FaCalendarPlus className="text-8xl text-blue-600 animate-bounce mb-4" />
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">No Bookings Available</h1>
            <p className="text-xl text-gray-600 mb-4">Please wait for bookings. They will be available soon!</p>

            <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 items-center justify-center text-center">
                <div className="flex flex-col items-center space-y-2">
                    <FaPhoneAlt className="text-3xl text-blue-500" />
                    <p className="text-lg text-gray-700">Need Assistance?</p>
                    <p className="text-sm text-gray-500">Contact us for more information.</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <FaUserClock className="text-3xl text-blue-500" />
                    <p className="text-lg text-gray-700">Stay Updated</p>
                    <p className="text-sm text-gray-500">We'll notify you when bookings are available.</p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <FaInfoCircle className="text-3xl text-blue-500" />
                    <p className="text-lg text-gray-700">Why No Bookings?</p>
                    <p className="text-sm text-gray-500">Our system is currently being updated to provide better services.</p>
                </div>
            </div>
        </div>
    );
};

export default NoBookingsMessage;
