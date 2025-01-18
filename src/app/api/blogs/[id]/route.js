import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../utils/db";
import Blog from "../../../../../utils/blog";

// Delete a blog
export async function DELETE(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete the blog
    await blog.remove();

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


// Update a blog
export async function PATCH(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID
  const { title, subtitle, content, imageUrl, author } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Update the blog with the new values
    if (title) blog.title = title;
    if (subtitle) blog.subtitle = subtitle;
    if (content) blog.content = content;
    if (imageUrl) blog.imageUrl = imageUrl;
    if (author) blog.author = author;

    await blog.save();

    return NextResponse.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

