import React from "react";
import { FaUserShield, FaLock, FaFileContract, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl sm:max-w-2xl lg:max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <FaUserShield className="mr-2" /> Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm text-center mb-8">Effective Date: February 2025</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaFileContract className="mr-2 text-blue-500" /> Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to RakshasaHalls. We respect your privacy and are committed to protecting your personal information.
            This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our platform.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaLock className="mr-2 text-blue-500" /> Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect personal details such as name, email, contact number, and payment information when you register or book an event with us.
            Additionally, we may collect browsing data to improve our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaLock className="mr-2 text-blue-500" /> How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>To provide and manage our services effectively.</li>
            <li>To personalize user experience and enhance security.</li>
            <li>To process payments and event bookings.</li>
            <li>To communicate important updates and offers.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaLock className="mr-2 text-blue-500" /> Data Protection
          </h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to ensure the confidentiality of your data. However, we advise users to take precautions when sharing personal information online.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaUserShield className="mr-2 text-blue-500" /> Your Rights
          </h2>
          <p className="text-gray-700">
            You have the right to access, modify, or delete your personal information. If you have any concerns, please contact us at support@rakshasahalls.com.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaFileContract className="mr-2 text-blue-500" /> Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>
        
        <section className="text-center mt-6">
          <p className="text-gray-700">If you have any questions, feel free to <a href="/contact" className="text-blue-500 hover:underline flex items-center justify-center">
            <FaEnvelope className="mr-2" /> Contact Us
          </a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;