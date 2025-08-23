import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ organizerId: string }> }
) {
  try {
    await connectDB();
    
    const { organizerId } = await params; // Must await in Next.js 15
    
    if (!organizerId) {
      return NextResponse.json(
        { message: "Organizer ID is required" },
        { status: 400 }
      );
    }
    
    const events = await Event.find({ organizerId })
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}