import React from "react";
import { FaCheckCircle, FaRegCreditCard, FaUsers, FaPhoneAlt, FaRegClock, FaExclamationCircle } from "react-icons/fa";

const SubscriptionPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 mb-10">
          Choose Your Subscription Plan
        </h1>

        {/* Subscription Plans Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* No Subscription Plan */}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between text-gray-800 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">No Subscription Plan</h2>
            <p className="text-lg mb-6">
              Not ready to subscribe? Here’s what you miss out on with no subscription.
            </p>
            <div className="flex-1">
              <ul className="space-y-4 mb-6">
                <li className="flex items-center"><FaExclamationCircle className="mr-2 text-red-500" /> Halls not visible to the public</li>
                <li className="flex items-center"><FaExclamationCircle className="mr-2 text-red-500" /> No booking functionality</li>
                <li className="flex items-center"><FaExclamationCircle className="mr-2 text-red-500" /> Limited support, no priority access</li>
                <li className="flex items-center"><FaExclamationCircle className="mr-2 text-red-500" /> You cannot post unlimited halls</li>
              </ul>
              <button className="bg-gray-500 text-white py-3 rounded-lg w-full cursor-not-allowed opacity-50" disabled>
                Subscribe Now
              </button>
            </div>
          </div>

          {/* 3-Month Plan */}
          <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg p-6 flex flex-col justify-between text-white transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">3-Month Plan</h2>
            <p className="text-lg mb-6">
              Get a discount on a shorter commitment! Perfect for seasonal users.
            </p>
            <div className="flex-1">
              <ul className="space-y-4 mb-6">
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Unlimited hall postings</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Halls visible to the public</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Booking functionality available</li>
                <li className="flex items-center"><FaUsers className="mr-2 text-green-300" /> Priority customer support</li>
              </ul>
              <div className="mb-6">
                <p className="text-3xl font-bold">₹2,500 / 3 months</p>
                <p className="text-sm line-through">₹5,000 / 3 months</p>
                <p className="text-sm text-yellow-200">Limited time offer!</p>
              </div>
              <button className="bg-yellow-400 text-gray-800 py-3 rounded-lg w-full hover:scale-105 transform transition duration-300">
                <FaRegCreditCard className="inline-block mr-2" />
                Subscribe Now
              </button>
            </div>
          </div>

          {/* 1-Year Plan */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 flex flex-col justify-between text-white transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">1-Year Plan</h2>
            <p className="text-lg mb-6">
              Save big with our yearly plan! Get full access to everything for a whole year.
            </p>
            <div className="flex-1">
              <ul className="space-y-4 mb-6">
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Unlimited hall postings</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Halls visible to the public</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-300" /> Booking functionality available</li>
                <li className="flex items-center"><FaUsers className="mr-2 text-green-300" /> Priority customer support</li>
                <li className="flex items-center"><FaPhoneAlt className="mr-2 text-green-300" /> 24/7 support availability</li>
                <li className="flex items-center"><FaRegClock className="mr-2 text-green-300" /> Access to premium features</li>
              </ul>
              <div className="mb-6">
                <p className="text-3xl font-bold">₹10,000 / year</p>
                <p className="text-sm line-through">₹30,000 / year</p>
                <p className="text-sm text-yellow-200">Limited time offer!</p>
              </div>
              <button className="bg-yellow-400 text-gray-800 py-3 rounded-lg w-full hover:scale-105 transform transition duration-300">
                <FaRegCreditCard className="inline-block mr-2" />
                Subscribe Now
              </button>
            </div>
          </div>

        </div>

        {/* Call to Action for Mobile Users */}
        <div className="text-center mt-10 md:hidden">
          <p className="text-xl font-bold text-gray-700 mb-4">
            Not ready to subscribe? Get in touch with us for more details on the plans.
          </p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transform transition duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
