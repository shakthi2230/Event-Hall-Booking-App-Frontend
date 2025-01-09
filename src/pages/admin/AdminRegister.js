import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser, FaEnvelope, FaCity, FaLock, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa"; // Import the icon for the button

import BASE_URL from '../../config';

const AdminRegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        state: "",
        address: "",
        password: "",
        mobile: "",
        country: "India",
    });

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validation functions
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobileValid = (mobile) => /^[0-9]{10}$/.test(mobile);
    const [loading, setLoading] = useState(false);



    // Function to send OTP
    const sendOtp = async () => {
        if (!isMobileValid(formData.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: "+91" + formData.mobile }),
            });

            if (response.ok) {
                setIsOtpSent(true);
                alert("OTP sent to your mobile number.");
            } else {
                const data = await response.json();
                alert(`Error: ${data.detail || "Failed to send OTP. Try again."}`);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("An error occurred while sending the OTP. Please try again.");
        }
    };

    // Function to verify OTP
    const verifyOtp = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: "+91" + formData.mobile, otp: formData.otp }),
            });

            const data = await response.json();
            if (response.ok) {
                setOtpVerified(true);
                setVerificationMessage("OTP Verified Successfully!");
                alert("OTP verified successfully!");
            } else {
                setVerificationMessage(data.detail || "Invalid OTP.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setVerificationMessage("An error occurred while verifying the OTP. Please try again.");
        }
    };

 
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.username || !formData.email || !formData.state || !formData.address) {
            setError("Please fill out all required fields.");
            return;
        }

        if (!isEmailValid(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!formData.password) {
            setError("Password is required.");
            return;
        }

        if (!otpVerified) {
            setError("Please verify your OTP before submitting.");
            return;
        }

        
        const dataToSend = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone_number: "+91" + formData.mobile, 
            state: formData.state,
            country: "India", 
            address: formData.address, 
        };

        try {
            const response = await fetch(`${BASE_URL}/admin/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const data = await response.json();
                alert("User registered successfully!");
                console.log("Response data:", data);
                navigate("/admin-login");
            } else {
                const data = await response.json();
                alert(`Error: ${data.detail || "Failed to register. Try again."}`);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                    Admin Registration
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="flex items-center gap-3">
                        <FaUser className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Address */}
                    <div className="flex items-center gap-3">
                        <FaCity className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* State */}
                    <div className="flex items-center gap-3">
                        <FaCity className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter yourstate name"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-3">
                        <FaLock className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="text-sm text-blue-500 mt-1"
                            >
                                {passwordVisible ? "Hide Password" : "Show Password"}
                            </button>
                        </div>
                    </div>
                    {/* Mobile */}
                    <div className="flex items-center gap-3">
                        <FaMobileAlt className="text-gray-500" />
                        <div className="w-full">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                placeholder="Enter your mobile number"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* OTP and Buttons */}
                    {isOtpSent && !otpVerified && (
                        <div className="flex items-center gap-3">
                            <FaLock className="text-gray-500" />
                            <div className="w-full">
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    placeholder="Enter the OTP"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={verifyOtp}
                                    className="w-full py-2 mt-2 bg-gradient-to-r from-green-800 to-blue-800 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition duration-300"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    )}
                    {!isOtpSent && (
                        <button
                            type="button"
                            onClick={sendOtp}
                            className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"

                        >
                            {loading ? "Sending OTP..." : <><FaUserShield className="inline-block mr-2 text-2xl" />  Send OTP</>}

                        </button>
                    )}
                    {otpVerified && (
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                        >
                            {loading ? "Sending OTP..." : <><FaUserShield className="inline-block mr-2 text-2xl" />   Submit</>}


                        </button>
                    )}
                </form>
                <div className="mt-2 text-center">
                    <p className="text-sm">
                        already have an account?{" "}
                        <a href="/admin-login" className="text-blue-500 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterPage;
