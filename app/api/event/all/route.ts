import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const events = await Event.find({})
      .sort({ createdAt: -1 }); 
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Fetch all events error:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" }, 
      { status: 500 }
    );
  }
}