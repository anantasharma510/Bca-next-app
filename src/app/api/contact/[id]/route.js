import { connectToDatabase } from "../../../../../utils/db";
import Contact from "../../../../../utils/contact"; // Make sure the path is correct

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Connect to the database
    await connectToDatabase();

    // Find and delete the contact message by its ID
    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return new Response(
        JSON.stringify({ error: "Message not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Message deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
