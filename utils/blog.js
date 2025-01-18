import mongoose from "mongoose";

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    author: {
      type: String,
      required: true,
      default: "bca",
    },
    imageUrl: {
      type: String,
      default: null,
    },
    comments: [
      {
        username: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        replies: [
          {
            username: { type: String, required: true },
            reply: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    sections: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Blog model
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
