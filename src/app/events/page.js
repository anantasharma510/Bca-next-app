'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();

        if (res.status === 200) {
          // Sort events by date (newest first)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={event.eventPicture}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{event.description}</p>
              <p className="text-gray-700 mt-3"><strong>Location:</strong> {event.location}</p>
              <p className="text-gray-700 mt-1"><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default EventList;
