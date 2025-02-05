import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { calculatePrice } from "./priceCalculator";
import BASE_URL from '../../config';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaUsers, FaBed, FaInfoCircle } from "react-icons/fa";
import Navbar from "../../components/UserNavbar"; // User Navbar Component

const BookingForm = () => {
    const { state } = useLocation();
    const hall = state?.hall; // Access the hall data passed via navigate
    const navigate = useNavigate();
    const { userid, accessToken } = useContext(UserContext); // Accessing the userid from context

    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        function_start_date: "",
        function_end_date: "",
        function_type: "",
        minimum_people_coming: "",
        maximum_people_coming: "",
        no_of_rooms_booked: "",
        additional_details: "",
        start_time: "",
        end_time: "",
        full_day_slot: false,
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    if (!hall) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <p className="text-xl text-gray-700">No hall details available. Please go back and select a hall.</p>
        </div>;
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateFields = () => {
        // Check if all required fields are filled
        const requiredFields = [
            "user_name",
            "user_email",
            "function_type",
            "function_start_date",
            "function_end_date",
            "minimum_people_coming",
            "maximum_people_coming",
            "no_of_rooms_booked",
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                throw new Error(`Please fill out the ${field.replace(/_/g, " ")} field.`);
            }
        }

        // Validate maximum people and rooms
        if (formData.maximum_people_coming > hall.total_hall_capacity) {
            throw new Error(
                `Maximum people coming cannot exceed hall capacity of ${hall.total_hall_capacity}.`
            );
        }

        if (formData.no_of_rooms_booked > hall.number_of_rooms) {
            throw new Error(
                `Rooms booked cannot exceed the available ${hall.number_of_rooms} rooms.`
            );
        }
    };

    const calculateTotalPrice = () => {
        try {
            // Validate all fields before calculating the price
            validateFields();

            const price = calculatePrice({
                function_start_date: formData.function_start_date,
                function_end_date: formData.function_end_date,
                start_time: formData.start_time,
                end_time: formData.end_time,
                full_day_slot: formData.full_day_slot,
                hall_price_per_day: hall.hall_price_per_day,
            });

            setTotalPrice(price);
            setShowConfirmButton(true); // Show the "Confirm Booking" button
            setError(""); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Show validation error
            setTotalPrice(0);
            setShowConfirmButton(false); // Hide the "Confirm Booking" button
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate fields and calculate total price
            validateFields();
            calculateTotalPrice();

            const formattedStartTime = formData.full_day_slot ? "00:00:00" : `${formData.start_time}:00`;
            const formattedEndTime = formData.full_day_slot ? "00:00:00" : `${formData.end_time}:00`;

            const bookingData = {
                ...formData,
                hall_id: hall.id,
                admin_id: hall.admin_id,
                user_id: userid,
                total_price: totalPrice,
                start_time: formattedStartTime,
                end_time: formattedEndTime,
            };

            setLoading(true);

            const response = await axios.post(
                `${BASE_URL}/hall/user/book_hall`,
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Booking successful!");
                navigate("/UserDashboard");
            }
        } catch (err) {
            console.error(err);

            if (err.response) {
                if (err.response.status === 400 && err.response.data.detail) {
                    alert(`Error: ${err.response.data.detail}`);
                } else {
                    alert(`Error: ${err.response.data.message || 'An error occurred'}`);
                }
            } else {
                alert("Error: Network error or server unreachable.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto p-4 lg:p-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                        <h1 className="text-3xl font-bold">Booking Details</h1>
                        <p className="mt-2">Fill out the form to book your event at {hall.name}.</p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600">Price Per Day</p>
                                <p className="text-xl font-semibold">₹{hall.hall_price_per_day}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600">Maintenance Charge</p>
                                <p className="text-xl font-semibold">₹{hall.maintenance_charge_per_day}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600">Cleaning Charge</p>
                                <p className="text-xl font-semibold">₹{hall.cleaning_charge_per_day}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* User Name */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* User Email */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            name="user_email"
                                            value={formData.user_email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Function Type */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Function Type</label>
                                    <div className="relative">
                                        <select
                                            name="function_type"
                                            value={formData.function_type}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select Function Type</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Birthday">Birthday</option>
                                            <option value="Anniversary">Anniversary</option>
                                            <option value="Corporate Event">Corporate Event</option>
                                            <option value="Engagement">Engagement</option>
                                            <option value="Baby Shower">Baby Shower</option>
                                            <option value="Festival Celebration">Festival Celebration</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Conference">Conference</option>
                                            <option value="Seminar">Seminar</option>
                                            <option value="Retirement Party">Retirement Party</option>
                                            <option value="Charity Event">Charity Event</option>
                                            <option value="Product Launch">Product Launch</option>
                                            <option value="Award Ceremony">Award Ceremony</option>
                                            <option value="Cocktail Party">Cocktail Party</option>
                                            <option value="Trade Show">Trade Show</option>
                                            <option value="Team Building Event">Team Building Event</option>
                                            <option value="Networking Event">Networking Event</option>
                                            <option value="Exhibition">Exhibition</option>
                                            <option value="Farewell Party">Farewell Party</option>
                                            <option value="Cultural Event">Cultural Event</option>
                                            <option value="Book Launch">Book Launch</option>
                                            <option value="Photo Shoot">Photo Shoot</option>
                                            <option value="Film Screening">Film Screening</option>
                                            <option value="Musical Concert">Musical Concert</option>
                                            <option value="Stand-up Comedy">Stand-up Comedy</option>
                                            <option value="School Reunion">School Reunion</option>
                                            <option value="Graduation Party">Graduation Party</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Function Start Date */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="date"
                                            name="function_start_date"
                                            value={formData.function_start_date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Function End Date */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="date"
                                            name="function_end_date"
                                            value={formData.function_end_date}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Full Day Slot */}
                                <div className="flex items-center mt-6">
                                    <input
                                        type="checkbox"
                                        name="full_day_slot"
                                        checked={formData.full_day_slot}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700 font-semibold">Full Day Slot</label>
                                </div>

                                {!formData.full_day_slot && (
                                    <>
                                        {/* Start Time */}
                                        <div className="relative">
                                            <label className="block text-gray-700 font-semibold mb-2">Start Time</label>
                                            <div className="relative">
                                                <FaClock className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="time"
                                                    name="start_time"
                                                    value={formData.start_time}
                                                    onChange={handleInputChange}
                                                    required={!formData.full_day_slot}
                                                    className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        {/* End Time */}
                                        <div className="relative">
                                            <label className="block text-gray-700 font-semibold mb-2">End Time</label>
                                            <div className="relative">
                                                <FaClock className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="time"
                                                    name="end_time"
                                                    value={formData.end_time}
                                                    onChange={handleInputChange}
                                                    required={!formData.full_day_slot}
                                                    className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Minimum People Coming */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Minimum People Coming</label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="number"
                                            name="minimum_people_coming"
                                            value={formData.minimum_people_coming}
                                            onChange={(e) => {
                                                const value = Math.max(0, e.target.value);
                                                setFormData({ ...formData, minimum_people_coming: value });
                                            }}
                                            min="1"
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Maximum People Coming */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Maximum People Coming</label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="number"
                                            name="maximum_people_coming"
                                            value={formData.maximum_people_coming}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setFormData({ ...formData, maximum_people_coming: value });
                                                }
                                            }}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Number of Rooms Booked */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Number of Rooms Booked</label>
                                    <div className="relative">
                                        <FaBed className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="number"
                                            name="no_of_rooms_booked"
                                            value={formData.no_of_rooms_booked}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="relative">
                                    <label className="block text-gray-700 font-semibold mb-2">Additional Details</label>
                                    <div className="relative">
                                        <FaInfoCircle className="absolute left-3 top-3 text-gray-400" />
                                        <textarea
                                            name="additional_details"
                                            value={formData.additional_details}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-center">{error}</p>}

                            {/* Total Price */}
                            {totalPrice > 0 && (
                                <div className="text-center">
                                    <p className="text-gray-700 font-semibold">Total Price: ₹{totalPrice}</p>
                                </div>
                            )}

                            {/* Conditional Rendering of Buttons */}
                            <div className="text-center">
                                {!showConfirmButton ? (
                                    <button
                                        type="button"
                                        onClick={calculateTotalPrice}
                                        className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                                    >
                                        Show Price
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                                        disabled={loading}
                                    >
                                        {loading ? "Booking..." : "Confirm Booking"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;