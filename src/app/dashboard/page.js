"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import Header from "./Header";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
     
     
      <Header />
   
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Your Page Content Here */}
        
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        {/* You can place any other components, charts, or content here */}
      </div>
    </div>
  );
}
