import { connectToDatabase } from "../../../../utils/db";
import Contact from "../../../../utils/contact"; // Ensure this path is correct for your Contact model

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the incoming JSON
    const body = await req.json();

    // Validate the required fields (name, email, and message)
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new contact entry
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return new Response(
      JSON.stringify({ message: "Contact submission successful" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all contact messages from the database
    const messages = await Contact.find().sort({ createdAt: -1 }); // Sort by most recent

    return new Response(
      JSON.stringify(messages),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch messages" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}