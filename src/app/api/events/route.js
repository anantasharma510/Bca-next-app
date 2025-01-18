// src/app/api/events/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { connectToDatabase } from "../../../../utils/db";
import EventSchema from "../../../../utils/eventsschema";


// Fetch all events (GET) or Create a new event (POST)
export async function GET() {
  try {
    await connectToDatabase(); // Ensure DB connection
    const events = await EventSchema.find(); // Fetch all events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching events", error }, { status: 500 });
  }
}



// POST: Create a new event with file handling
export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure DB connection

    // Parse form data including file upload
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const eventDate = formData.get("eventDate");
    const location = formData.get("location");
    const image = formData.get("eventPicture"); // File object

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

    // Create a new event object
    const newEvent = new EventSchema({
      title,
      description,
      eventDate,
      location,
      eventPicture: imageUrl,
    });

    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating event", error }, { status: 500 });
  }
}

