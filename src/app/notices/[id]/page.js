"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function NoticePage() {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // Wait for the `id` to be available from the URL

    const fetchNotice = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/notices/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the notice");
        }
        const data = await response.json();
        setNotice(data);
      } catch (error) {
        setError("Error fetching the notice");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Notice not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-white to-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {notice.title}
        </h1>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <p className="text-gray-700 mb-4">{notice.content}</p>

          {notice.date && (
            <p className="text-sm text-gray-500 mb-4">
              Posted on: {new Date(notice.date).toLocaleDateString()}
            </p>
          )}

          {notice.author && (
            <p className="text-sm text-gray-600 mb-4">Author: {notice.author}</p>
          )}

          {notice.image && (
            <div className="mb-4">
              <img
                src={notice.image}
                alt="Notice"
                className="rounded-lg w-full h-64 object-cover"
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
