'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign In:', { email: formData.email, password: formData.password });
    // Add your sign-in logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up:', formData);
    // Add your sign-up logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    // Add your Google sign-in logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b">
          <button
            onClick={() => setActiveTab('signin')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'signin' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200 flex items-center justify-center"
              onClick={handleGoogleSignIn}
            >
              <span className="mr-2">🔵</span> Sign In with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
