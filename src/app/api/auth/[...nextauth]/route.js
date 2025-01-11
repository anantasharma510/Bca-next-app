import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import Google Provider
import { connectToDatabase } from "../../../../../utils/db";
import Signup from "../../../../../utils/signupSchema";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // Google Provider for OAuth Sign-in
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const { email, name, picture } = profile;

        // Connect to database
        await connectToDatabase();

        // Check if user exists in database
        let user = await Signup.findOne({ email });

        // If user does not exist, create a new user
        if (!user) {
          user = new Signup({
            name,
            email,
            photo: picture,
          });
          await user.save();
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
        };
      },
    }),

    // Credentials Provider for Email/Password Sign-in
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        // Find the user by email
        const user = await Signup.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: user.photo,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // You can customize your sign-in page
  },
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.photo = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.photo = token.photo;
      return session;
    },
  },
  debug: true, // Enable debug mode for troubleshooting
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
