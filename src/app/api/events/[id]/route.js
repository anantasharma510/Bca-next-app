// src/app/api/events/[id]/route.js
import { connectToDatabase } from "../../../../../utils/db";
import EventSchema from "../../../../../utils/eventsschema";
import { NextResponse } from "next/server";

// Fetch, Update, or Delete an event by ID
export async function GET(req, { params }) {
  const { id } = params; // Extract ID from the dynamic route

  try {
    await connectToDatabase(); // Ensure DB connection
    const event = await EventSchema.findById(id);
    if (!event) return NextResponse.json({ message: "Event not found" }, { status: 404 });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching event", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // Extract ID from the dynamic route
  const body = await req.json(); // Parse request body

  try {
    await connectToDatabase(); // Ensure DB connection
    const updatedEvent = await EventSchema.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEvent) return NextResponse.json({ message: "Event not found" }, { status: 404 });
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating event", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Extract ID from the dynamic route

  try {
    await connectToDatabase(); // Ensure DB connection
    const deletedEvent = await EventSchema.findByIdAndDelete(id);
    if (!deletedEvent) return NextResponse.json({ message: "Event not found" }, { status: 404 });
    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting event", error }, { status: 500 });
  }
}
