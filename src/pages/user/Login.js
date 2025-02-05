import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import BASE_URL from '../../config';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const userAccessToken = localStorage.getItem("user_access_token");

    if (userId && userAccessToken) {
      navigate("/UserDashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("user_access_token", data.user_access_token);

        loginUser(data.user_name, data.user_access_token, data.user_id);
        setAlertMessage({ type: "success", text: "Login successful!" });

        setTimeout(() => {
          navigate("/UserDashboard");
        }, 2000);
      } else {
        setAlertMessage({ type: "error", text: "Invalid email or password!" });
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
            onClick={() => console.log("Google login clicked")}
          >
            <FaGoogle className="text-2xl" />
          </button>

          <div className="h-12 border-l-2 border-gray-400 mx-4"></div>

          <button
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            onClick={() => console.log("Microsoft login clicked")}
          >
            <FaMicrosoft className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot your password?</a>
        </div>

        <div className="mt-2 text-center">
          <p className="text-sm">
            Don't have an account? <a href="/user-signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>
      </div>

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className={`text-lg font-semibold ${alertMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {alertMessage.text}
            </p>
            <button
              onClick={() => setAlertMessage(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
