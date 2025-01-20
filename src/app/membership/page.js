'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function BCAMembership() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const membership = {
    title: 'BCA Student Membership',
    price: 500, // Price in NPR
    description: 'Join the British Columbia Association and unlock a world of opportunities.',
    benefits: [
      'Access to exclusive online resources',
      'Monthly industry newsletters',
      'Networking events and webinars',
      'Career counseling and job board access',
      'Discounts on BCA conferences and workshops',
    ],
  };

  useEffect(() => {
    const loadKhaltiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://khalti.com/static/khalti-checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadKhaltiScript();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKhaltiPayment = () => {
    const { fullName, email, phone } = userData;

    if (!fullName || !email || !phone) {
      alert('Please fill in all the fields.');
      return;
    }

    const config = {
      publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,
      productIdentity: 'BCA_Membership',
      productName: membership.title,
      productUrl: window.location.href,
      amount: membership.price * 100, // Amount in paisa
      eventHandler: {
        async onSuccess(payload) {
          console.log('Payment successful:', payload);

          const paymentData = {
            fullName,
            email,
            phone,
            amount: membership.price * 100,
            khaltiToken: payload.token,
            membershipType: membership.title,
          };

          try {
            const response = await fetch('/api/membership', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            if (result.success) {
              alert('Payment successful! Transaction ID: ' + result.transactionId);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error processing payment:', error);
            alert('Something went wrong. Please try again later.');
          }
        },
        onError(error) {
          console.error('Payment error:', error);
          alert('Payment failed! Please try again.');
        },
        onClose() {
          console.log('Payment widget closed');
        },
      },
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: membership.price * 100 });
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
            <ul className="space-y-3">
              {membership.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 border-t flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleKhaltiPayment}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                Pay with Khalti
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
