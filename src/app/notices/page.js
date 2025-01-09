"use client";

import { useState, useEffect } from "react";

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
    <div>
      <h1>Notices</h1>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id}>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
