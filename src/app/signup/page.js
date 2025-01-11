'use client'
import { useState } from "react";

import { useRouter } from "next/navigation";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const handleGoogleSignUp = async (googleUser) => {
  const { name, email, photo } = googleUser;

  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      phone: '', // You can ask for this if needed
      photo,
      isGoogleSignUp: true, // Mark it as Google signup
    }),
  });

  const data = await response.json();
  if (response.ok) {
    console.log('User created successfully:', data);
  } else {
    console.error('Error during Google signup:', data);
  }
};

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the photo as a base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result, // Set base64 image data
        }));
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        router.push("/signin"); // Redirect to login page after signup
      } else {
        setError(data.message);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div>
        <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo:</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? 
            <a href="/signin" className="text-blue-500 hover:text-blue-700"> Sign in</a>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Signup;
