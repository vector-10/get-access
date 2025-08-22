import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    await connectDB();
    
    const { eventId } = await params;
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ event });
  } catch (error) {
    console.error("Fetch event error:", error);
    return NextResponse.json(
      { message: "Failed to fetch event" }, 
      { status: 500 }
    );
  }
}