import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../../utils/db";
import Blog from "../../../../../../utils/blog";

// Add a new comment
export async function POST(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID
  const { username, comment } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blog.comments.push({ username, comment });
    await blog.save();

    return NextResponse.json({ message: "Comment added successfully", blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Add a reply to a comment
export async function PATCH(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID
  const { commentIndex, username, reply } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.comments[commentIndex]) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    blog.comments[commentIndex].replies.push({ username, reply });
    await blog.save();

    return NextResponse.json({ message: "Reply added successfully", blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete a comment
export async function DELETE(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID
  const { commentIndex } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.comments[commentIndex]) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Remove the comment from the blog
    blog.comments.splice(commentIndex, 1);
    await blog.save();

    return NextResponse.json({ message: "Comment deleted successfully", blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete a reply from a comment
export async function DELETE_REPLY(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Blog ID
  const { commentIndex, replyIndex } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.comments[commentIndex] || !blog.comments[commentIndex].replies[replyIndex]) {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    // Remove the reply from the comment
    blog.comments[commentIndex].replies.splice(replyIndex, 1);
    await blog.save();

    return NextResponse.json({ message: "Reply deleted successfully", blog });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
