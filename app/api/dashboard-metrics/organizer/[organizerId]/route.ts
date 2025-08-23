import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";
import Ticket from "@/app/models/Ticket";

function hasOrganizerId(params: unknown): params is { organizerId: string } {
  return (
    typeof params === "object" &&
    params !== null &&
    "organizerId" in params &&
    typeof (params as { organizerId: unknown }).organizerId === "string"
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: unknown }
) {
  try {
    if (!hasOrganizerId(params)) {
      return NextResponse.json(
        { message: "Invalid or missing organizerId" },
        { status: 400 }
      );
    }

    await connectDB();

    const { organizerId } = params;

    const events = await Event.find({ organizerId });
    const eventIds = events.map(event => event._id);

    const eventsOrganized = events.length;

    const activeEvents = events.filter(
      event => event.status === "upcoming" || event.status === "ongoing"
    ).length;

    const tickets = await Ticket.find({ eventId: { $in: eventIds } });

    const ticketsIssued = tickets.length;
    const ticketsSold = tickets.filter(
      t => t.status === "confirmed" || t.status === "used"
    ).length;
    const ticketsPending = tickets.filter(t => t.status === "pending").length;

    const totalRevenue = tickets
      .filter(t => t.status === "confirmed" || t.status === "used")
      .reduce((sum, t) => sum + t.price, 0);

    return NextResponse.json({
      metrics: {
        eventsOrganized,
        ticketsIssued,
        ticketsSold,
        activeEvents,
        ticketsPending,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Fetch metrics error:", error);
    return NextResponse.json(
      { message: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
