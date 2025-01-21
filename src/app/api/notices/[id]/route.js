import { connectToDatabase } from "../../../../../utils/db";
import Notice from "../../../../../utils/schema";

// GET request to fetch a specific notice by ID
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Extract the ID from the URL

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
    const id = searchParams.get("id"); // Extract the ID from the URL
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("file"); // Handle file attachment
    const image = formData.get("image"); // Handle image attachment

    // Connect to the database
    await connectToDatabase();

    const updatedData = {
      title,
      content,
    };

    // Handle file upload
    if (file) {
      updatedData.file = `/uploads/files/${file.name}`;
      const fileBuffer = await file.arrayBuffer();
      // Save fileBuffer to the desired location on the server (e.g., using fs or a cloud service)
    }

    // Handle image upload
    if (image) {
      updatedData.image = `/uploads/images/${image.name}`;
      const imageBuffer = await image.arrayBuffer();
      // Save imageBuffer to the desired location on the server
    }

    // Find and update the notice
    const updatedNotice = await Notice.findByIdAndUpdate(id, updatedData, { new: true });

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
    const id = searchParams.get("id"); // Extract the ID from the URL

    // Connect to the database
    await connectToDatabase();

    // Find and delete the notice
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return new Response("Notice not found.", { status: 404 });
    }

    // Optionally, delete associated files and images from the server
    if (deletedNotice.file) {
      // Delete the file from the server
      // Example: fs.unlinkSync(path.join(__dirname, '/uploads/files', deletedNotice.file));
    }
    if (deletedNotice.image) {
      // Delete the image from the server
      // Example: fs.unlinkSync(path.join(__dirname, '/uploads/images', deletedNotice.image));
    }

    return new Response("Notice deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return new Response("Error deleting notice", { status: 500 });
  }
}
