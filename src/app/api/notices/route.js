import fs from "fs/promises";
import path from "path";
import { connectToDatabase } from "../../../../utils/db";
import Notice from "../../../../utils/schema";

// POST: Create a new notice
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const file = formData.get("file");
    const image = formData.get("image");

    if (!title || !content) {
      return new Response("Title and content are required.", { status: 400 });
    }

    await connectToDatabase();

    let fileUrl = null;
    let imageUrl = null;

    // Handle file upload
    if (file) {
      const uploadsDir = path.join(process.cwd(), "public/uploads/files");
      await fs.mkdir(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      await fs.writeFile(filePath, fileBuffer);
      fileUrl = `/uploads/files/${fileName}`;
    }

    // Handle image upload
    if (image) {
      const uploadsDir = path.join(process.cwd(), "public/uploads/images");
      await fs.mkdir(uploadsDir, { recursive: true });

      const imageName = `${Date.now()}-${image.name}`;
      const imagePath = path.join(uploadsDir, imageName);
      const imageBuffer = Buffer.from(await image.arrayBuffer());

      await fs.writeFile(imagePath, imageBuffer);
      imageUrl = `/uploads/images/${imageName}`;
    }

    // Save the notice in the database
    const newNotice = new Notice({
      title,
      content,
      file: fileUrl,
      image: imageUrl,
    });

    await newNotice.save();

    return new Response(JSON.stringify(newNotice), { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response("Error inserting data", { status: 500 });
  }
}

// GET: Fetch notices with pagination
export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
    const limit = 4; // Number of notices per page

    const notices = await Notice.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit);

    const totalNotices = await Notice.countDocuments();
    const totalPages = Math.ceil(totalNotices / limit);

    return new Response(
      JSON.stringify({ notices, totalPages }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notices:", error);
    return new Response("Error fetching notices", { status: 500 });
  }
}
