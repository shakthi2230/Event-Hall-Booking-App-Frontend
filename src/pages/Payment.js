import { useState } from "react";
import axios from "axios";

function Payment() {
    const [paymentStatus, setPaymentStatus] = useState("");

    const handlePayment = async () => {
        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/create_order/");

            console.log("Order Created:", data); // Debugging

            if (!data.order_id) {
                throw new Error("Order ID not received from server");
            }

            const options = {
                key: "rzp_test_pnGwIqn4t7Sixz", // Replace with actual Key ID from Razorpay
                amount: data.amount,
                currency: data.currency,
                order_id: data.order_id, // Ensure this is present
                name: "Test Payment",
                description: "₹1 Test Transaction",
                handler: async function (response) {
                    console.log("Payment Response:", response); // Debugging

                    const verifyResponse = await axios.post("http://127.0.0.1:8000/api/verify_payment/", {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    });

                    console.log("Verify Response:", verifyResponse.data); // Debugging

                    if (verifyResponse.data.status === "success") {
                        setPaymentStatus("✅ Payment Successful!");
                    } else {
                        setPaymentStatus("❌ Payment Failed: " + verifyResponse.data.message);
                    }
                },
                prefill: {
                    name: "Sakthivel",
                    email: "sakthivel@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#6366f1",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", function (response) {
                console.error("Payment Failed:", response);
                setPaymentStatus("❌ Payment Failed: " + response.error.description);
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment Error:", error);
            setPaymentStatus("❌ Payment Error: " + error.message);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Pay ₹1 with Razorpay</h1>
            <button onClick={handlePayment} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">
                Pay ₹1
            </button>
            {paymentStatus && <p className="mt-4 text-lg">{paymentStatus}</p>}
        </div>
    );
}

export default Payment;
