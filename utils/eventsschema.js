// utils/eventsschema.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  eventDate: { type: Date, required: true },
  eventPicture: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
