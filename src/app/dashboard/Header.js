"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Menu, X, User, Bell } from "lucide-react";
import { signOut } from "next-auth/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md text-white">
      {/* Hamburger Button for Mobile */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h5 className="text-2xl font-semibold">Nonstop Eurotrip</h5>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center space-x-6">
        <button className="relative">
          <Bell size={24} />
          <span className="absolute top-0 right-0 text-xs text-red-500 font-semibold bg-white rounded-full px-1">
            3
          </span>
        </button>

        <button
          type="button"
          className="flex items-center space-x-2"
          onClick={() => router.push("/profile")}
        >
          <User size={24} />
          <span className="hidden md:inline-block">Profile</span>
        </button>

        <button
          type="button"
          className="text-red-500 font-semibold"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
