"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import {
  LayoutDashboard,
  Edit,
  Mail,
  PlusCircle,
  User,
  Menu,
  X,
  BadgeDollarSign,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      icon: <LayoutDashboard />,
      label: "Dashboard",
      action: () => router.push("/dashboard"),
    },
    {
      icon: <Edit />,
      label: "Blogs",
      action: () => router.push("../admin/add"),
    },
    {
      icon: <Edit />,
      label: "Popup",
      action: () => router.push("/dashboard/popup"),
    },
    {
      icon: <User />,
      label: "Users",
      action: () => router.push("/dashboard/users"),
    },
    {
      icon: <Mail />,
      label: "Inbox",
      action: () => router.push("/dashboard/inbox"),
    },
    {
      icon: <BadgeDollarSign />,
      label: "Sponsor",
      action: () => router.push("/dashboard/sponsor"),
    },
    { icon: <PlusCircle />, label: "Logout", action: () => signOut() },
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className='p-4 bg-blue-gray-50 md:hidden'>
        <button
          type='button'
          className='text-blue-gray-900'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`md:sticky fixed top-0 z-50 h-screen w-[16rem] bg-gray-800 shadow-xl p-4 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0   `}
      >
        <div className='mb-2'>
          <h5 className='block font-sans text-xl font-semibold text-blue-gray-900'>
            Nonstop Eurotrip
          </h5>
        </div>
        <nav className='flex flex-col gap-1'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              type='button'
              onClick={item.action}
              className='flex items-center w-full p-3 text-xl font-semibold text-left transition-all rounded-lg hover:bg-blue-gray-50'
            >
              {item.icon}
              <p className='ml-3 text-base font-normal text-blue-gray-900'>
                {item.label}
              </p>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
