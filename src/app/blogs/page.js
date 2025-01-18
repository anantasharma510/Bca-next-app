
"use client";

import { useEffect, useState } from "react";
import Comments from "./[id]/comments";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            )}
            <h2>{blog.title}</h2>
            <p>{blog.subtitle}</p>
            <p>{blog.content}</p>
            <small>Author: {blog.author}</small>

            {/* Comments Section */}
            <Comments blogId={blog._id} initialComments={blog.comments} />
          </div>
        ))
      )}
    </div>
  );
}