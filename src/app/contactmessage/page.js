'use client'
import { useEffect, useState } from "react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  // Fetch the contact messages from the API
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();

      if (response.ok) {
        setMessages(data); // Store the fetched messages
      } else {
        setStatus("Failed to load messages.");
      }
    } catch (error) {
      setStatus("Error: Unable to fetch messages.");
    }
  };

  const deleteMessage = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          // Successfully deleted, remove the message from the UI
          setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
          setStatus("Message deleted successfully.");
        } else {
          setStatus(result.error || "Failed to delete message.");
        }
      } catch (error) {
        setStatus("Error: Unable to delete message.");
      }
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages when the component mounts
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Messages</h1>

        {status && (
          <p className={`text-center ${status.startsWith("Error") ? "text-red-500" : "text-green-500"}`}>
            {status}
          </p>
        )}

        {messages.length > 0 ? (
          <ul>
            {messages.map((msg) => (
              <li key={msg._id} className="mb-4 p-4 border-b border-gray-300">
                <h3 className="font-semibold text-gray-800">{msg.name} ({msg.email})</h3>
                <p className="text-gray-600">{msg.message}</p>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
