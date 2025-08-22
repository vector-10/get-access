import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const { eventId, name, description, location, imageUrl, startTime } = await request.json();
    
    if (!eventId || !name || !description || !location || !imageUrl || !startTime) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const event = await Event.findByIdAndUpdate(
      eventId,
      { name, description, location, imageUrl, startTime: new Date(startTime) },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json(
      { message: "Server error" }, 
      { status: 500 }
    );
  }
}