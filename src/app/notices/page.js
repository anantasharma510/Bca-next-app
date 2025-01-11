"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch(`/api/notices?page=${currentPage}`);
      if (response.ok) {
        const data = await response.json();
        setNotices(data.notices);
        setTotalPages(data.totalPages);
      }
    };

    fetchNotices();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Notices</h1>

        <ul className="space-y-6">
          {notices.map((notice) => (
            <li key={notice._id} className="border p-6 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
              <p className="text-gray-700">{notice.content}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
