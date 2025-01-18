"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Update the URL to match the correct endpoint for retrieving all blogs
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (response.ok) {
          setBlogs(data); // Assuming the response contains an array of blogs
        } else {
          throw new Error(data.error || "Failed to fetch blogs");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        // Update the URL to match the correct API endpoint for deleting a blog
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog from the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h1>All Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} style={{ marginBottom: "15px" }}>
              <h2>{blog.title}</h2>
              <p>{blog.subtitle}</p>
              <button
                onClick={() => router.push(`/blogs/${blog._id}/edit`)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogsList;
