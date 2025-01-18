"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditBlogPage = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    author: "",
  });
  const [imageFile, setImageFile] = useState(null); // Store the selected image file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data);
          setFormData({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            author: data.author,
          });
        } else {
          throw new Error(data.error || "Failed to fetch blog");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create form data for the request
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("subtitle", formData.subtitle);
      blogData.append("content", formData.content);
      blogData.append("author", formData.author);
      if (imageFile) blogData.append("image", imageFile);

      // Send the blog data to the backend to update
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        body: blogData,
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const data = await response.json();
      console.log("Blog updated successfully:", data);

      // Redirect to the blog page after success
      router.push(`/blogs/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Subtitle:
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Content:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="5"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            ></textarea>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Image Upload:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "block", marginTop: "5px" }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Update Blog"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EditBlogPage;
