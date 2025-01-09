import React, { useState } from "react";
import BASE_URL from '../../config';
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetData = { email };

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
      });

      if (response.ok) {
        setAlertMessage({
          type: "info",
          text: "This feature is under development and not ready for production.",
        });
      } else {
        setAlertMessage({
          type: "error",
          text: "Failed to process your request. Please try again later.",
        });
      }
    } catch (error) {
      setAlertMessage({
        type: "error",
        text: "This feature is under development and not ready for production.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Alert Modal */}
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p
              className={`text-lg font-semibold ${
                alertMessage.type === "info" ? "text-blue-600" : "text-red-600"
              }`}
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

export default ForgotPassword;
