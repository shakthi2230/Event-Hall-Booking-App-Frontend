import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/AdminNavbar";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaBroom } from "react-icons/fa";
import BASE_URL from '../../config';
const HallList = () => {
    const { adminData } = useAdminContext();
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedHallImages, setSelectedHallImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch halls on component mount
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/hall/get_halls`, {
                    headers: {
                        Authorization: `Bearer ${adminData.access_token}`,
                    },
                });
                setHalls(response.data.halls);
            } catch (error) {
                setErrorMessage("Failed to load hall list. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHalls();
    }, [adminData.access_token]);

    // Open image modal
    const handleImageClick = (images, index) => {
        setSelectedHallImages(images);
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    // Close image modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(null);
    };

    // Navigate images
    const nextImage = () => {
        if (selectedImageIndex < selectedHallImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container m-4 mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Hall List</h1>

                {/* Error Message */}
                {errorMessage && (
                    <div className="text-red-700 bg-red-100 p-4 rounded-lg mb-6 shadow-lg">{errorMessage}</div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="text-center text-lg text-gray-600">Loading...</div>
                ) : (
                    <div className="space-y-10">
                        {halls.length === 0 ? (
                            <div className="text-center text-lg text-gray-500">No halls available.</div>
                        ) : (
                            halls.map((hall) => (
                                <div key={hall.id} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-102 hover:shadow-xl">
                                    {/* Hall Images */}
                                    <div className="flex overflow-x-auto space-x-6 py-6 px-8 justify-around">
                                        {hall.image_urls.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Hall ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-lg cursor-pointer shadow-md hover:scale-110 transition-all"
                                                onClick={() => handleImageClick(hall.image_urls, index)}
                                            />
                                        ))}
                                    </div>

                                    {/* Hall Details */}
                                    <div className="p-8">
                                        {/* Hall Name */}
                                        <div className="flex flex-col items-center justify-center p-8 text-center">
                                            {/* Hall Name */}
                                            <h2 className="text-3xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300 relative group">
                                                {hall.hall_name}

                                                {/* Animated Underline */}
                                                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
                                            </h2>

                                            {/* Location */}
                                            <p className="flex items-center text-gray-500 mt-2 justify-center">
                                                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                                                {hall.hall_location}
                                            </p>

                                            {/* Address */}
                                            <p className="text-lg text-gray-600 mt-2">{hall.hall_address}</p>

                                            {/* About Hall */}
                                            <p className="text-gray-700 mt-4 leading-relaxed">{hall.about_hall}</p>
                                        </div>

                                        {/* Pricing and Other Details */}
                                        <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-4">
                                            <InfoCard
                                                icon={<FaMoneyBillWave className="text-green-500" />}
                                                title="Price Per Day"
                                                value={`₹${hall.hall_price_per_day}`}
                                            />
                                            <InfoCard
                                                icon={<FaUsers className="text-blue-500" />}
                                                title="Capacity"
                                                value={`${hall.total_hall_capacity} persons`}
                                            />
                                            <InfoCard
                                                icon={<FaMoneyBillWave className="text-green-500" />}
                                                title="Maintenance Charge"
                                                value={`₹${hall.maintenance_charge_per_day}`}
                                            />
                                            <InfoCard
                                                icon={<FaBroom className="text-yellow-500" />}
                                                title="Cleaning Charge"
                                                value={`₹${hall.cleaning_charge_per_day}`}
                                            />
                                        </div>

                                        {/* Book Now Button */}
                                        <div className="mt-6 text-center">
                                            <button
                                                className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-indigo-600"
                                                onClick={() => alert(`update option will be future`)} // Handle booking action here
                                            >
                                                Update Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal for Viewing Images */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-4xl relative shadow-lg">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-800 text-3xl transition-colors hover:text-indigo-600"
                        >
                            &times;
                        </button>
                        {selectedImageIndex !== null && (
                            <img
                                src={selectedHallImages[selectedImageIndex]}
                                alt="Selected"
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        )}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevImage}
                                className="px-6 py-3 bg-gray-200 rounded-lg text-gray-800 font-semibold disabled:opacity-50 transition-all hover:bg-gray-300"
                                disabled={selectedImageIndex === 0}
                            >
                                Prev
                            </button>
                            <button
                                onClick={nextImage}
                                className="px-6 py-3 bg-gray-200 rounded-lg text-gray-800 font-semibold disabled:opacity-50 transition-all hover:bg-gray-300"
                                disabled={selectedImageIndex === selectedHallImages.length - 1}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// InfoCard Component
const InfoCard = ({ icon, title, value }) => (
    <div className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm">
        <div className="text-2xl mr-4">{icon}</div>
        <div>
            <h4 className="text-gray-700 font-medium">{title}</h4>
            <p className="text-gray-500">{value}</p>
        </div>
    </div>
);

export default HallList;
