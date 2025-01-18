'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Link from 'next/link'

export default function BCAMembership() {
  const membership = {
    title: 'BCA Student Membership',
    price: 500,
    description: 'Join the British Columbia Association and unlock a world of opportunities.',
    benefits: [
      'Access to exclusive online resources',
      'Monthly industry newsletters',
      'Networking events and webinars',
      'Career counseling and job board access',
      'Discounts on BCA conferences and workshops'
    ]
  }

  return (
    <div>
        <Navbar />
  
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl border rounded-lg shadow-lg overflow-hidden">
        {/* CardHeader */}
        <div className="p-4 border-b">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">{membership.title}</h2>
          <p className="text-center text-gray-600 mt-2">{membership.description}</p>
        </div>

        {/* CardContent */}
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
        </div>

        {/* CardFooter */}
        <div className="p-4 border-t flex justify-center">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link 
        href="/join" 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Join Now
      </Link>
      </motion.div>
    </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}
