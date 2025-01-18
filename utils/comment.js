import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    author: { type: String, required: true }, // Name or ID of the reply author
    text: { type: String, required: true },  // Content of the reply
    createdAt: { type: Date, default: Date.now }, // Timestamp for the reply
  },
  { _id: true } // Automatically include an ID for each reply
);

const CommentSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true }, // Reference to the blog
    author: { type: String, required: true }, // Name or ID of the comment author
    text: { type: String, required: true }, // Content of the comment
    replies: [ReplySchema], // Array of replies
    createdAt: { type: Date, default: Date.now }, // Timestamp for the comment
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
