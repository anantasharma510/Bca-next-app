"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const SignInPage = () => {
  const router = useRouter(); // Use router for navigation after login

  const handleGoogleSignIn = async () => {
    const res = await signIn("google", { redirect: false });
    if (res?.error) {
      console.error(res.error); // Handle Google sign-in error
    } else {
      // Redirect after Google sign-in
      router.push("/admin");
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect after sign-in
      email,
      password,
    });

    if (res?.error) {
      console.error(res.error); // Handle error (e.g., show message to the user)
    } else {
      // Redirect to protected page (admin panel) after successful login
      // router.push("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign In with Email
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Sign in with Google
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p>
              Don’t have an account?{' '}
              <Link href="/signup" className="text-blue-500 hover:text-blue-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
