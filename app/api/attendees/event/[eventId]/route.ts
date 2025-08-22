import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Ticket from "@/app/models/Ticket";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    await connectDB();
    
    const { eventId } = await params;
    
    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" }, 
        { status: 400 }
      );
    }

    const attendees = await Ticket.find({ eventId })
      .sort({ purchaseDate: -1 });
    
    return NextResponse.json({ attendees });
  } catch (error) {
    console.error("Fetch attendees error:", error);
    return NextResponse.json(
      { message: "Failed to fetch attendees" }, 
      { status: 500 }
    );
  }
}