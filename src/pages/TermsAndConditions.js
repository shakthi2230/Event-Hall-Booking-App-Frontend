import React from "react";
import { FaGavel, FaClipboardList, FaShieldAlt } from "react-icons/fa";

const TermsAndConditions = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl sm:max-w-2xl lg:max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <FaGavel className="mr-2" /> Terms & Conditions
        </h1>
        <p className="text-gray-600 text-sm text-center mb-8">Effective Date: February 2025</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaClipboardList className="mr-2 text-blue-500" /> Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing and using RakshasaHalls, you agree to abide by these Terms and Conditions. If you do not agree, please refrain from using our services.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaShieldAlt className="mr-2 text-blue-500" /> Subscription & Hall Visibility
          </h2>
          <p className="text-gray-700">
            A subscription is required to publish event halls to the public. Without a valid subscription, halls will not be visible to public users and will only be accessible to admin users.
          </p>
          <p className="text-gray-700">
            Subscription fees are non-refundable under any circumstances.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaShieldAlt className="mr-2 text-blue-500" /> User Responsibilities
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Users must provide accurate and truthful information when registering.</li>
            <li>Users are responsible for maintaining the security of their accounts.</li>
            <li>Any misuse or unauthorized access may result in account suspension.</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaShieldAlt className="mr-2 text-blue-500" /> Service Usage
          </h2>
          <p className="text-gray-700">
            Our platform is designed for booking event halls. Any attempt to exploit the system, engage in fraudulent activities, or violate laws will result in legal actions.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaGavel className="mr-2 text-blue-500" /> Termination of Service
          </h2>
          <p className="text-gray-700">
            We reserve the right to terminate or restrict access to any user who violates these terms, abuses the service, or engages in prohibited activities.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <FaClipboardList className="mr-2 text-blue-500" /> Changes to Terms
          </h2>
          <p className="text-gray-700">
            We may update these Terms and Conditions from time to time. Continued use of our service after changes implies acceptance of the updated terms.
          </p>
        </section>
        
        <section className="text-center mt-6">
          <p className="text-gray-700">For any questions, feel free to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
