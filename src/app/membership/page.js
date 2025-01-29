"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Check } from "lucide-react";

export default function BCAMembership() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const membership = {
    title: "BCA Student Membership",
    price: 20, // Price in NPR
    description: "Join the British Columbia Association and unlock a world of opportunities.",
    benefits: [
      "Access to exclusive online resources",
      "Monthly industry newsletters",
      "Networking events and webinars",
      "Career counseling and job board access",
      "Discounts on BCA conferences and workshops",
    ],
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const generateOrderId = () => {
    return `Order-${Date.now()}`; // Unique order ID based on timestamp
  };

  const handlePayment = async () => {
    if (!userData.fullName || !userData.email || !userData.phone) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const customerInfo = {
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
    };

    const payload = {
      amount: membership.price,
      purchaseOrderId: generateOrderId(),
      purchaseOrderName: membership.title,
      customerInfo,
    };

    try {
      const response = await axios.post("/api/membership", payload);
      const { payment_url } = response.data;

      if (payment_url) {
        window.location.href = payment_url; // Redirect to Khalti payment page
      } else {
        setError("Failed to retrieve payment URL.");
      }
    } catch (error) {
      setError("Payment initiation failed. Please try again.");
      console.error("Payment Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-2xl border rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">{membership.title}</h2>
            <p className="text-center text-gray-600 mt-2">{membership.description}</p>
          </div>

          <div className="p-4 space-y-6">
            <div className="text-center">
              <span className="text-5xl font-bold text-gray-900">₹{membership.price}</span>
              <span className="text-xl text-gray-600">/year</span>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={userData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={userData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <ul className="space-y-3">
              {membership.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {error && <p className="text-red-500 text-center p-2">{error}</p>}

          <div className="p-4 border-t flex justify-center">
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay with Khalti"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
