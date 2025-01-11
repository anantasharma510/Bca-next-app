import { connectToDatabase } from '../../../../utils/db';
import Signup from '../../../../utils/signupSchema';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, phone, photo, password, isGoogleSignUp } = await req.json();

  if (!email || (!password && !isGoogleSignUp)) {
    return new Response(
      JSON.stringify({ message: 'Please provide a valid email and password or use Google sign-up' }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Check if user already exists in the database
    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      );
    }

    // If it's a Google sign-up, we don't need to hash a password
    let hashedPassword = null;
    if (!isGoogleSignUp) {
      // Hash the password if it's not a Google sign-up
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create a new user document
    const newUser = new Signup({
      name,
      email,
      phone,
      photo,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
}
