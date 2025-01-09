// src/app/api/notices/route.js

import { connectToDatabase } from "../../../../utils/db"
import Notice from "../../../../utils/schema";

export async function POST(req) {
  try {
    // Parse request body
    const { title, content } = await req.json();

    // Ensure that title and content are provided
    if (!title || !content) {
      return new Response("Title and content are required.", { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new notice
    const newNotice = new Notice({
      title,
      content,
    });

    // Save the notice to MongoDB
    await newNotice.save();

    return new Response(JSON.stringify(newNotice), { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response("Error inserting data", { status: 500 });
  }
}
