import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/UserNavbar";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaBroom, FaUtensils, FaBed, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config';

const UserHallList = () => {
    const { adminData } = useAdminContext();
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedHallImages, setSelectedHallImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleBookNow = (hall) => {
        navigate("/booking-form", { state: { hall } });
    };

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
                setErrorMessage(""); // Clear any previous errors
            } catch (error) {
                setErrorMessage(error.response?.data?.message || "Failed to load hall list. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHalls();
    }, [adminData.access_token]);

    // Open image modal
    const handleImageClick = (images, index) => {
        if (images.length > 0) {
            setSelectedHallImages(images);
            setSelectedImageIndex(index);
            setIsModalOpen(true);
        }
    };

    // Close image modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(0);
    };

    // Navigate images
    const nextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % selectedHallImages.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + selectedHallImages.length) % selectedHallImages.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Available Halls</h1>

                {/* Error Message */}
                {errorMessage && (
                    <div className="text-red-700 bg-red-100 p-4 rounded-lg mb-6 text-center shadow-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="text-center text-lg text-gray-600">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {halls.length === 0 ? (
                            <div className="text-center text-lg text-gray-500 col-span-full">No halls available.</div>
                        ) : (
                            halls.map((hall) => (
                                <div key={hall.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    {/* Hall Image */}
                                    <div className="relative">
                                        {hall.image_urls.length > 0 ? (
                                            <img
                                                src={hall.image_urls[0]}
                                                alt={`Hall ${hall.hall_name}`}
                                                className="w-full h-64 object-cover cursor-pointer"
                                                onClick={() => handleImageClick(hall.image_urls, 0)}
                                            />
                                        ) : (
                                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                                                No Image Available
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleImageClick(hall.image_urls, 0)}
                                            className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-full shadow-md text-sm font-medium hover:bg-gray-100"
                                        >
                                            View More
                                        </button>
                                    </div>

                                    {/* Hall Details */}
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{hall.hall_name}</h2>
                                        <p className="flex items-center text-gray-600 mb-4">
                                            <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                                            {hall.hall_location}
                                        </p>
                                        <p className="text-gray-700 mb-4">{hall.about_hall}</p>

                                        {/* Pricing and Other Details */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
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
                                                title="Maintenance"
                                                value={`₹${hall.maintenance_charge_per_day}`}
                                            />
                                            <InfoCard
                                                icon={<FaBroom className="text-yellow-500" />}
                                                title="Cleaning"
                                                value={`₹${hall.cleaning_charge_per_day}`}
                                            />
                                            <InfoCard
                                                icon={<FaUtensils className="text-purple-500" />}
                                                title="Catering Members"
                                                value={`${hall.catering_work_members}`}
                                            />
                                            <InfoCard
                                                icon={<FaBed className="text-pink-500" />}
                                                title="No. of Rooms"
                                                value={`${hall.number_of_rooms}`}
                                            />
                                        </div>

                                        {/* Book Now Button */}
                                        <button
                                            onClick={() => handleBookNow(hall)}
                                            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal for Viewing Images */}
            {isModalOpen && selectedHallImages.length > 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg w-full max-w-3xl mx-4 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-800 text-3xl hover:text-indigo-600"
                        >
                            &times;
                        </button>
                        <div className="p-6">
                            <img
                                src={selectedHallImages[selectedImageIndex]}
                                alt="Selected"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={prevImage}
                                    className="px-6 py-3 bg-gray-200 rounded-lg text-gray-800 font-semibold hover:bg-gray-300"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="px-6 py-3 bg-gray-200 rounded-lg text-gray-800 font-semibold hover:bg-gray-300"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// InfoCard Component
const InfoCard = ({ icon, title, value }) => (
    <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
        <div className="text-2xl text-gray-600">{icon}</div>
        <div>
            <h4 className="text-sm text-gray-500">{title}</h4>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default UserHallList;