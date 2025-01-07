import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 relative">
      {/* Blue Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Association of Bca students</h2>
          <p className="text-gray-400">
            You are an intelligent assistant for the PNC BCA Association. You
            help students and faculty find resources, stay updated with
            announcements, and learn about the association activities.
          </p>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span>+1 23 456 789</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📧</span>
              <span>support@bcastudents.org</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📍</span>
              <span>123 Education St, City, Country</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>About Us</li>
            <li>Notices</li>
            <li>Blogs</li>
            <li>Results</li>
            <li>Events</li>
            <li>Resources</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>AI Chatbot</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 hover:bg-gray-700">
              F
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 hover:bg-gray-700">
              X
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 hover:bg-gray-700">
              I
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 hover:bg-gray-700">
              M
            </a>
            <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400 hover:bg-gray-700">
              Y
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-gray-400">
        © 2025 Association of Bca students. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
