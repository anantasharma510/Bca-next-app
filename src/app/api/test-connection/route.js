import { connectToDatabase } from "../../../../utils/db"; // Import your db connection function

export async function GET(req) {
  try {
    // Ensure the database is connected
    await connectToDatabase();

    // If the connection is successful, return this response
    return new Response(
      JSON.stringify({ success: true, message: "Connected to MongoDB successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors during the connection
    console.error("MongoDB connection error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to connect to MongoDB" }),
      { status: 500 }
    );
  }
}
