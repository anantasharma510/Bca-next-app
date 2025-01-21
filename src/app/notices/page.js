"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from 'next/link';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`/api/notices?page=${currentPage}`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data.notices);
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch notices");
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-white to-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Notices
        </h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice) => (
            <li
              key={notice._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {notice.title}
              </h2>
              <p className="text-gray-700 line-clamp-3 mb-4">
                {notice.content}
              </p>

              {notice.date && (
                <p className="text-sm text-gray-500 mb-4">
                  Posted on: {new Date(notice.date).toLocaleDateString()}
                </p>
              )}

              {notice.author && (
                <p className="text-sm text-gray-600 mb-4">
                  Author: {notice.author}
                </p>
              )}

              {notice.image && (
                <div className="mb-4">
                  <img
                    src={notice.image}
                    alt="Notice"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              )}

              {notice.file && (
                <a
                  href={notice.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline mb-4 block"
                >
                  View attached file
                </a>
              )}

              {/* Link to individual notice page */}
              <Link
                href={`/notices/${notice._id}`}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Read More
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
