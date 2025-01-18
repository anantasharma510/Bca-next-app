'use client';
import { useState } from 'react';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventPicture, setEventPicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendData();
  };

  // Send data to the API
  const sendData = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('eventDate', eventDate);
    formData.append('location', location);
    if (eventPicture) {
      formData.append('eventPicture', eventPicture); // Append the file
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData, // Send FormData directly
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccessMessage('Event created successfully!');
        setErrorMessage('');
        // Clear form
        setTitle('');
        setDescription('');
        setEventDate('');
        setLocation('');
        setEventPicture(null);
      } else {
        setErrorMessage(data.message || 'Failed to create event');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="datetime-local"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="eventPicture">Event Picture</label>
          <input
            type="file"
            id="eventPicture"
            onChange={(e) => setEventPicture(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Create Event</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default EventForm;
