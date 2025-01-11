// src/app/api/events/route.js
import { connectToDatabase } from "../../../../utils/db";
import EventSchema from "../../../../utils/eventsschema";
import { NextResponse } from "next/server";

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

export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure DB connection
    const body = await req.json(); // Parse request body
    const newEvent = new EventSchema(body); // Create new event
    await newEvent.save();
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating event", error }, { status: 500 });
  }
}
