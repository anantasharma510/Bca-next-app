'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [user, setUser] = useState(null); // Track user state

  useEffect(() => {
    // Check if user is signed in (you can use localStorage, cookies, or an API to check the sign-in status)
    const storedUser = localStorage.getItem("user"); // Example for checking sign-in status
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state if signed in
    }
  }, []);

  const toggleNotices = () => {
    setIsNoticesOpen(!isNoticesOpen);
    setIsAcademicsOpen(false);
    setIsTeamOpen(false);
  };

  const toggleAcademics = () => {
    setIsAcademicsOpen(!isAcademicsOpen);
    setIsNoticesOpen(false);
    setIsTeamOpen(false);
  };

  const toggleTeam = () => {
    setIsTeamOpen(!isTeamOpen);
    setIsNoticesOpen(false);
    setIsAcademicsOpen(false);
  };

  return (
    <nav className="bg-gray-100 px-4 sm:px-8 py-4 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-600 text-lg font-semibold">
          <Link href="/">
            Association of BCA Students
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/aboutus" className="text-gray-700 hover:text-blue-600">About Us</Link>
          
          {/* Notices & Events Dropdown */}
          <div className="relative">
            <button
              onClick={toggleNotices}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              Notices & Events ▾
            </button>
            {isNoticesOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                <Link href="/notices" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Notice Board
                </Link>
                <Link href="/events" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Upcoming Events
                </Link>
              </div>
            )}
          </div>

          {/* Team Dropdown */}
          <div className="relative">
            <button
              onClick={toggleTeam}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              Team ▾
            </button>
            {isTeamOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                <Link href="/team" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Association of BCA Students
                </Link>
                <Link href="/triteam" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Tech Research and Innovations
                </Link>
              </div>
            )}
          </div>

          {/* Academics Dropdown */}
          <div className="relative">
            <button
              onClick={toggleAcademics}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              Academics ▾
            </button>
            {isAcademicsOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                <Link href="/syllabus" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Syllabus
                </Link>
                <Link href="/resources" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Resources
                </Link>
              </div>
            )}
          </div>

          <Link href="/blogs" className="text-gray-700 hover:text-blue-600">
            Blogs
          </Link>
          <Link href="/membership" className="text-gray-700 hover:text-blue-600">
            Membership
          </Link>
        </div>

        {/* Buttons: Contact Us and Conditional Sign In/Profile */}
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="text-white bg-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-blue-700 flex items-center">
            Contact Us
            <span className="ml-2">↗</span>
          </Link>

          {user ? (
            // Display user profile if signed in
            <div className="flex items-center space-x-4">
              <img
                src={user.photo || '/default-photo.png'} // Display user photo, or a default one
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-blue-600">{user.name}</span>
            </div>
          ) : (
            // Show Sign In button if not signed in
            <Link href="/signin" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 flex items-center">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
