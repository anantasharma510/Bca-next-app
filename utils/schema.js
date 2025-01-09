import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Ensure title is required
  },
  content: {
    type: String,
    required: true,  // Ensure content is required
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets createdAt to the current date if not provided
  },
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);

export default Notice;
