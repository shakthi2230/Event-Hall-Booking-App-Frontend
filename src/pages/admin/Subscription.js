import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaRegCreditCard, FaUsers, FaPhoneAlt, FaRegClock, FaExclamationCircle } from "react-icons/fa";
import { useAdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const { adminData } = useAdminContext();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePayment = async (amount, plan) => {
    try {
      const response = await axios.post("http://localhost:8000/api/create_order/", { amount }, {
        headers: { Authorization: `Bearer ${adminData.access_token}` },
      });

      const { order_id, currency } = response.data;

      const options = {
        key: "rzp_test_OWMIbAgJMlXJSy",
        amount,
        currency,
        name: "ShadowHaven",
        description: "Subscription Plan",
        order_id,
        handler: async function (response) {
          const verifyResponse = await axios.post("http://localhost:8000/Payment/verify_payment/", {
            order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            plan,
            admin_id: 4,
          }, {
            headers: { Authorization: `Bearer ${adminData.access_token}` },
          });

          if (verifyResponse.data.status === "success") {
            alert("Payment successful! Subscription activated.");
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment.");
    }
  };

  const handleFreeTrial = async () => {
    try {
      const response = await axios.post("http://localhost:8000/trial/register_free_trial", {
        admin_id: 1,
        // admin_id: adminData.id,
      }, {
        headers: { Authorization: `Bearer ${adminData.access_token}` },
      });

      if (response.data.status === "success") {
        alert("Free trial activated!");
      } else {
        alert("Free trial registration failed.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.detail;

        // Check for specific error message
        if (errorMessage === "Free trial already used") {
          alert("You have already used your free trial.");
        } else {
          alert("Failed to register free trial.");
        }
      } else {
        alert("Failed to register free trial.");
      }

      console.error("Free Trial Error:", error);
    }
  };

  const plans = [
    { name: "30-Day Free Trial", price: 0, duration: "30_days", offer: "Completely Free", isFreeTrial: true },
    { name: "1-Year Plan", price: 1, duration: "12_months", offer: "Best Value!" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 py-12 px-6 md:px-10 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 mb-10">
          Choose Your Subscription Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-xl p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105 cursor-pointer ${selectedPlan === plan.duration ? "border-4 border-yellow-400" : ""} ${plan.price === 0 ? "bg-gray-300 text-gray-800" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"}`}
              onClick={() => setSelectedPlan(plan.duration)}
            >
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-lg mb-6">{plan.offer}</p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center"><FaCheckCircle className="mr-2" /> Unlimited hall postings</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2" /> Halls visible to the public</li>
                <li className="flex items-center"><FaCheckCircle className="mr-2" /> Booking functionality available</li>
                {plan.duration === "12_months" && (
                  <>
                    <li className="flex items-center"><FaPhoneAlt className="mr-2" /> 24/7 support availability</li>
                    <li className="flex items-center"><FaRegClock className="mr-2" /> Access to premium features</li>
                  </>
                )}
              </ul>
              <div className="mb-6">
                <p className="text-3xl font-bold">{plan.price === 0 ? "Free" : `₹${plan.price}`}</p>
              </div>
              <button
                onClick={() => plan.isFreeTrial ? handleFreeTrial() : handlePayment(plan.price, plan.duration)}
                className={`py-3 rounded-lg w-full transition duration-300 ${plan.price === 0 ? "bg-green-500 text-white hover:bg-green-600" : "bg-yellow-400 text-gray-800 hover:scale-105"}`}
              >
                <FaRegCreditCard className="inline-block mr-2" /> {plan.price === 0 ? "Start Free Trial" : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
