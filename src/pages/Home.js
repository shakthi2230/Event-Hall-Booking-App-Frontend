import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/pexels-bertellifotografia-17206146.jpg";
import { FaCalendarAlt } from "react-icons/fa"; // You can use any icon you like

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay to reduce opacity for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div> {/* Increased opacity */}

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4">
        <FaCalendarAlt className="text-white text-6xl md:text-8xl drop-shadow-lg animate-bounce" />
        <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Discover Unforgettable Experiences
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-white max-w-2xl">
          Plan your next adventure or event with ease. Connect with the best venues, services, and experiences tailored just for you.
        </p>
        <button
          className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg md:text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          onClick={() => navigate("/login-options")}
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full text-center py-4 bg-black bg-opacity-60">
        <p className="text-white text-xs md:text-sm">
          © 2025 Experience Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HomePage;