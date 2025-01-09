import React, { useState } from "react";

const Otp = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }), // Send only the mobile number
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
      const response = await fetch("http://localhost:8000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp }), // Send mobile and OTP
      });

      const data = await response.json();
      if (response.ok) {
        setVerificationMessage(data.message); // Success message
      } else {
        setVerificationMessage(data.detail); // Error message
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerificationMessage("An error occurred while verifying the OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">Mobile Number Verification</h1>

        {!isOtpSent ? (
          <div className="space-y-4">
            <label className="block">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        )}

        {verificationMessage && (
          <p className="mt-4 text-center text-red-500">{verificationMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Otp;
