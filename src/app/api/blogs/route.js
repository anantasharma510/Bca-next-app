import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../utils/db";
import Blog from "../../../../utils/blog"; // Correct the path if necessary

export async function POST(req) {
    await connectToDatabase();
  
    const formData = await req.formData();
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const content = formData.get("content");
    const author = formData.get("author");
    const sections = JSON.parse(formData.get("sections") || "[]");
    const image = formData.get("image");
  
    let imageUrl = null;
  
    // Save the image file to public/uploads
    if (image) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
  
      const imageName = `${Date.now()}-${image.name}`;
      const imagePath = path.join(uploadsDir, imageName);
      const buffer = Buffer.from(await image.arrayBuffer());
  
      await fs.writeFile(imagePath, buffer);
      imageUrl = `/uploads/${imageName}`;
    }
  
    // Save blog to database
    const blog = new Blog({
      title,
      subtitle,
      content,
      author,
      imageUrl,
      sections,
    });
  
    try {
      await blog.save();
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }


export async function GET(req) {
  try {
    await connectToDatabase();

    // Fetch all blogs from the database
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by most recent
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), { status: 500 });
  }
}

