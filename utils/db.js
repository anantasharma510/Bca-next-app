import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI; // Make sure your .env is correctly set

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // Connect to MongoDB
    const db = await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log(`MongoDB connected successfully to ${db.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
