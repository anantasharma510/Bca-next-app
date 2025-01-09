import { connectToDatabase } from "../../../../utils/db"
import Notice from "../../../../utils/schema";

// GET request to fetch a specific notice by ID
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const { id } = searchParams;  // Extract the ID from the URL

    // Connect to the database
    await connectToDatabase();

    // Find the notice by ID
    const notice = await Notice.findById(id);

    if (!notice) {
      return new Response("Notice not found.", { status: 404 });
    }

    return new Response(JSON.stringify(notice), { status: 200 });
  } catch (error) {
    console.error("Error fetching specific notice:", error);
    return new Response("Error fetching notice", { status: 500 });
  }
}

// PUT request to update a specific notice by ID
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const { id } = searchParams;  // Extract the ID from the URL
    const { title, content } = await req.json();

    // Connect to the database
    await connectToDatabase();

    // Find and update the notice
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }  // Return the updated notice
    );

    if (!updatedNotice) {
      return new Response("Notice not found.", { status: 404 });
    }

    return new Response(JSON.stringify(updatedNotice), { status: 200 });
  } catch (error) {
    console.error("Error updating notice:", error);
    return new Response("Error updating notice", { status: 500 });
  }
}

// DELETE request to delete a specific notice by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const { id } = searchParams;  // Extract the ID from the URL

    // Connect to the database
    await connectToDatabase();

    // Find and delete the notice
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return new Response("Notice not found.", { status: 404 });
    }

    return new Response("Notice deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return new Response("Error deleting notice", { status: 500 });
  }
}
