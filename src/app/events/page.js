'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show four events per page

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();

        if (res.status === 200) {
          const sortedEvents = data.sort(
            (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
          );
          setEvents(sortedEvents);
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <p className="text-center text-lg">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Upcoming Events</h2>
        <div className="space-y-6">
          {paginatedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              <img
                src={event.eventPicture}
                alt={event.title}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-4 md:w-2/3">
                <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{event.description}</p>
                <p className="text-gray-700 mt-3">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventList;
