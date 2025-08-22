import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, description, location, imageUrl, startTime, organizerId } = await request.json();
    
    if (!name || !description || !location || !imageUrl || !startTime || !organizerId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const event = new Event({
      name,
      description,
      location,
      imageUrl,
      startTime: new Date(startTime),
      organizerId
    });

    await event.save();

    return NextResponse.json({
      message: "Event created successfully",
      event: {
        id: event._id,
        name: event.name,
        description: event.description,
        location: event.location,
        imageUrl: event.imageUrl,
        startTime: event.startTime,
        status: event.status
      }
    });

} catch (err) {
    console.error("Event creation error:", err);
    return NextResponse.json({
      message: "Server error",
      error: err instanceof Error ? err.message : "Unknown error occurred"
    }, { status: 500 });
  }
}