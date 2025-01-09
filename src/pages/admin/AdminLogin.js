import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext"; // Import the context
import { FaUserShield } from "react-icons/fa"; // Import the icon for the button

import BASE_URL from '../../config';

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();
    const { setAdminContext } = useAdminContext(); // Get the function to update context

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };
        setLoading(true); // Set loading to true when the request starts

        try {
            const response = await fetch(`${BASE_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                setAlertMessage({ type: "success", text: "Login successful!" });

                // Save the response data (tokens, user_id) in context
                setAdminContext({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    token_type: data.token_type,
                    user_id: data.user_id,
                    admin_name:data.admin_name
                });

                // Redirect to admin dashboard after a delay
                setTimeout(() => {
                    navigate("/admin-dashboard");
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
