import React, { useState } from "react";
import { FaEnvelope, FaUser, FaCommentDots, FaPaperPlane, FaBuilding } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      {/* Left Section - Hidden on Mobile */}
      <div className="hidden md:flex flex-col justify-center text-white max-w-md p-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <FaBuilding className="mr-2" /> About RakshasaHalls
        </h2>
        <p className="mb-2">✔ Premium event halls with modern amenities.</p>
        <p className="mb-2">✔ Spacious venues for weddings, conferences, and celebrations.</p>
        <p className="mb-2">✔ Located in prime areas with easy accessibility.</p>
        <p>✔ 24/7 customer support for seamless event planning.</p>
      </div>

      {/* Right Section - Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <FaEnvelope className="mr-2" /> Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full ml-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full ml-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Your Query</label>
            <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaCommentDots className="text-gray-500 mt-1" />
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="Type your message here"
                className="w-full ml-2 outline-none resize-none"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
