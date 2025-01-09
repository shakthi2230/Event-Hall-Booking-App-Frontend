import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/AdminNavbar";
import { useAdminContext } from "../../context/AdminContext";
import { FaUser, FaLocationArrow, FaDollarSign, FaRegFileImage } from "react-icons/fa"
import BASE_URL from '../../config';

const HallRegister = () => {
    const { adminData } = useAdminContext();
    const [formData, setFormData] = useState({
        hallName: "",
        hallLocation: "",
        hallAddress: "",
        hallPricePerDay: "",
        maintenanceChargePerDay: "",
        cleaningChargePerDay: "",
        cateringWorkMembers: "",
        totalHallCapacity: "",
        numberOfRooms: "",
        aboutHall: "",
        images: [],
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // if (files.length < 3 || files.length > 8) {
        //     setErrorMessage("Please upload between 3 to 8 images.");
        //     return;
        // }
        setFormData({ ...formData, images: files });
        // setErrorMessage("");
    };

    const handleImageDelete = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.images.length < 3 || formData.images.length > 8) {
            setErrorMessage("Please upload between 3 to 8 images.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const formPayload = new FormData();
        formPayload.append("hall_name", formData.hallName);
        formPayload.append("hall_location", formData.hallLocation);
        formPayload.append("hall_address", formData.hallAddress);
        formPayload.append("hall_price_per_day", formData.hallPricePerDay);
        formPayload.append("maintenance_charge_per_day", formData.maintenanceChargePerDay);
        formPayload.append("cleaning_charge_per_day", formData.cleaningChargePerDay);
        formPayload.append("catering_work_members", formData.cateringWorkMembers);
        formPayload.append("total_hall_capacity", formData.totalHallCapacity);
        formPayload.append("number_of_rooms", formData.numberOfRooms);
        formPayload.append("about_hall", formData.aboutHall);

        // Append each image file with the same key "images" as expected by FastAPI
        formData.images.forEach((image) => {
            formPayload.append("images", image); // Use "images" instead of "image[0]", "image[1]", etc.
        });

        try {
            const response = await axios.post(
                `${BASE_URL}/hall/register`, // API endpoint
                formPayload,
                {
                    headers: {
                        Authorization: `Bearer ${adminData.access_token}`, // Bearer token for authentication
                        "Content-Type": "multipart/form-data", // Ensure to send multipart/form-data
                    },
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Hall registered successfully!");
                setFormData({
                    hallName: "",
                    hallLocation: "",
                    hallAddress: "",
                    hallPricePerDay: "",
                    maintenanceChargePerDay: "",
                    cleaningChargePerDay: "",
                    cateringWorkMembers: "",
                    totalHallCapacity: "",
                    numberOfRooms: "",
                    aboutHall: "",
                    images: [],
                });
            } else {
                setErrorMessage("Failed to register hall. Please try again.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.detail || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Register a Hall</h1>

                {errorMessage && (
                    <div className="mb-4 text-red-500 bg-red-100 p-4 rounded-lg">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 text-green-500 bg-green-100 p-4 rounded-lg">
                        {successMessage}
                    </div>
                )}

                <form
                    className="bg-white p-8 rounded-lg shadow-lg space-y-6"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Hall Name</label>
                        <input
                            type="text"
                            name="hallName"
                            value={formData.hallName}
                            onChange={handleInputChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Location</label>
                        <input
                            type="text"
                            name="hallLocation"
                            value={formData.hallLocation}
                            onChange={handleInputChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Address</label>
                        <input
                            type="text"
                            name="hallAddress"
                            value={formData.hallAddress}
                            onChange={handleInputChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Pricing Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Price Per Day
                            </label>
                            <input
                                type="number"
                                name="hallPricePerDay"
                                value={formData.hallPricePerDay}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Maintenance Charge
                            </label>
                            <input
                                type="number"
                                name="maintenanceChargePerDay"
                                value={formData.maintenanceChargePerDay}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Cleaning Charge
                            </label>
                            <input
                                type="number"
                                name="cleaningChargePerDay"
                                value={formData.cleaningChargePerDay}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Catering and Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Catering Work Members
                            </label>
                            <input
                                type="number"
                                name="cateringWorkMembers"
                                value={formData.cateringWorkMembers}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Total Hall Capacity
                            </label>
                            <input
                                type="number"
                                name="totalHallCapacity"
                                value={formData.totalHallCapacity}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Number of Rooms
                            </label>
                            <input
                                type="number"
                                name="numberOfRooms"
                                value={formData.numberOfRooms}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">About Hall</label>
                        <textarea
                            name="aboutHall"
                            value={formData.aboutHall}
                            onChange={handleInputChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Hall Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <div className="mt-2">
                            {formData.images.length > 0 && (
                                <div className="flex space-x-4">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Image ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleImageDelete(index)}
                                                className="absolute top-0 right-0 text-white bg-red-500 p-1 rounded-full"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Register Hall"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HallRegister;
