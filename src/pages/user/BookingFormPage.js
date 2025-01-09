import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/UserNavbar"; // User Navbar Component
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { calculatePrice } from "./priceCalculator";
import BASE_URL from '../../config';
const BookingForm = () => {
    const { state } = useLocation();
    const hall = state?.hall; // Access the hall data passed via navigate
    const navigate = useNavigate();
    const { userid, accessToken } = useContext(UserContext); // Accessing the userid from context
    console.log("userid : ", userid)

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
    const [showConfirmButton, setShowConfirmButton] = useState(false); // Control when to show the Confirm button

    if (!hall) {
        return <div>No hall details available. Please go back and select a hall.</div>;
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateFields = () => {
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
            const price = calculatePrice({
                function_start_date: formData.function_start_date,
                function_end_date: formData.function_end_date,
                start_time: formData.start_time,
                end_time: formData.end_time,
                full_day_slot: formData.full_day_slot,
                hall_price_per_day: hall.hall_price_per_day,
            });

            setTotalPrice(price);
            setShowConfirmButton(true);
            setError("");
        } catch (err) {
            setError(err.message);
            setTotalPrice(0);
            setShowConfirmButton(false); // Hide the "Confirm Booking" button in case of error
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Validate fields and calculate total price
            validateFields();
            calculateTotalPrice();
    
            // Format the start and end times to include seconds
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
    
            // Send booking data to the backend
            const response = await axios.post(
                `${BASE_URL}/hall/user/book_hall`,
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            // Handle successful booking
            if (response.status === 200) {
                alert("Booking successful!");
                navigate("/user-dashboard");
            }
        } catch (err) {
            console.error(err);
    
            // Show appropriate error message based on the backend response
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

            <div className="container mx-auto p-6 max-w-xl">



                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Booking Form</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <p className="text-gray-600">Price Per Day: ₹{hall.hall_price_per_day}</p>
                    <p className="text-gray-600">Maintenance Charge: ₹{hall.maintenance_charge_per_day}</p>
                    <p className="text-gray-600">Cleaning Charge: ₹{hall.cleaning_charge_per_day}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md space-y-4">
                    {/* User Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* User Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    {/* Function Type */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Function Type:</label>
                        <select
                            name="function_type"
                            value={formData.function_type}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
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


                    {/* Function Start Date */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Start Date:</label>
                        <input
                            type="date"
                            name="function_start_date"
                            value={formData.function_start_date}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Function End Date */}
                    <div>
                        <label className="block text-gray-700 font-semibold">End Date:</label>
                        <input
                            type="date"
                            name="function_end_date"
                            value={formData.function_end_date}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Full Day Slot */}
                    <div className="flex items-center">
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
                            <div>
                                <label className="block text-gray-700 font-semibold">Start Time:</label>
                                <input
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleInputChange}
                                    required={!formData.full_day_slot}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="block text-gray-700 font-semibold">End Time:</label>
                                <input
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleInputChange}
                                    required={!formData.full_day_slot}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </>
                    )}

                    {/* Minimum People Coming */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Minimum People Coming:</label>
                        <input
                            type="number"
                            name="minimum_people_coming"
                            value={formData.minimum_people_coming}
                            onChange={(e) => {
                                const value = Math.max(0, e.target.value); // Ensures non-negative numbers
                                setFormData({ ...formData, minimum_people_coming: value });
                            }}
                            min="1" // Ensures at least 1 person is required
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>


                    {/* Maximum People */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Maximum People Coming:</label>
                        <input
                            type="number"
                            name="maximum_people_coming"
                            value={formData.maximum_people_coming}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) { // Validates only integers
                                    setFormData({ ...formData, maximum_people_coming: value });
                                }
                            }}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>


                    {/* Rooms Booked */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Number of Rooms Booked:</label>
                        <input
                            type="number"
                            name="no_of_rooms_booked"
                            value={formData.no_of_rooms_booked}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    {/* Additional Details */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Additional Details:</label>
                        <textarea
                            name="additional_details"
                            value={formData.additional_details}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                        ></textarea>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Total Price */}
                    <p className="text-gray-700 font-semibold">Total Price: ₹{totalPrice}</p>

                    {/* Conditional Rendering of Buttons */}
                    {!showConfirmButton ? (
                        <button
                            type="button"
                            onClick={calculateTotalPrice}
                            className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg"
                        >
                            Show Price
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? "Booking..." : "Confirm Booking"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
