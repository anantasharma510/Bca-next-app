'use client'
import { useState } from "react";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setMessage("Notice created successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage("Failed to create notice.");
      }
    } catch (error) {
      console.error("Error creating notice:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Admin Panel - Create Notice</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Create Notice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminPanel;
