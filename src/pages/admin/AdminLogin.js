import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext"; // Import the context
import { FaUserShield } from "react-icons/fa"; // Import the icon for the button
import { FaGoogle, FaMicrosoft } from "react-icons/fa"; // Google and Microsoft icons
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import BASE_URL from '../../config';

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();
    const { setAdminContext, adminData } = useAdminContext(); // Get the function to update context
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        googleId: "",
    });

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                            Accept: "application/json",
                        },
                    }
                );

                // Update formData state with email and Google ID
                const updatedFormData = {
                    email: res.data.email,
                    googleId: res.data.id,
                };
                setFormData(updatedFormData);

                // Call handleSubmit after setting formData
                handleSubmit(updatedFormData);
            } catch (error) {
                console.error("Error fetching Google profile:", error);
            }
        },
        onError: (error) => console.error("Google Login Failed:", error),
    });

    useEffect(() => {
        // Check if the admin is already logged in by checking local storage or context
        const accessToken = localStorage.getItem`${adminData.access_token}`;
        if (accessToken) {
            // If logged in, redirect to the dashboard
            navigate("/subscriptionPage");
        }
    }, [navigate]);

    const handleSubmit = async (updatedFormData) => {
        setLoading(true);
        console.log("Form Data Submitted:", updatedFormData);
        
        const loginData = updatedFormData.googleId
            ? { email: updatedFormData.email, googleId: updatedFormData.googleId }
            : { email: updatedFormData.email, password: updatedFormData.password };

        try {
            const response = await fetch(`${BASE_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                setAlertMessage({ type: "success", text: "Login successful!" });

                // Save the response data (tokens, user_id) in context and localStorage
                setAdminContext({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    token_type: data.token_type,
                    user_id: data.user_id,
                    admin_name: data.admin_name
                });
                localStorage.setItem("access_token", data.access_token);

                // Redirect to admin dashboard after a delay
                setTimeout(() => {
                    navigate("/booked-halls");
                }, 2000);
            } else {
                setAlertMessage({ type: "error", text: "Invalid email or password!" });
            }
        } catch (error) {
            setAlertMessage({ type: "error", text: "An error occurred. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = { email, password };
        handleSubmit(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Email Input */}
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

                    {/* Password Input */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                    >
                        {loading ? "Logging in..." : <><FaUserShield className="inline-block mr-2 text-2xl" /> Login</>}
                    </button>
                </form>

                {/* Social Login Buttons */}
                <div className="flex justify-center items-center gap-6 mt-6">
                    <div className="flex flex-col items-center">
                        <button
                            className="flex items-center justify-center p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                            onClick={googleLogin}
                        >
                            <FaGoogle className="text-2xl" />
                        </button>
                    </div>

                    {/* Vertical line separator */}
                    <div className="h-12 border-l-2 border-gray-400 mx-4"></div>

                    <div className="flex flex-col items-center">
                        <button
                            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                            onClick={() => console.log("Microsoft login clicked")}
                        >
                            <FaMicrosoft className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                {/* Sign Up Link */}
                <div className="mt-2 text-center">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <a href="/admin-signup" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

            {/* Alert Modal */}
            {alertMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p
                            className={`text-lg font-semibold ${alertMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
                        >
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

export default AdminLogin;