import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";
import Ticket from "@/app/models/Ticket";

export async function GET(
  req: Request,
  context: { params: { organizerId: string } }
) {
  try {
    await connectDB();

    const { organizerId } = context.params;

    const events = await Event.find({ organizerId });
    const eventIds = events.map(event => event._id);

    const eventsOrganized = events.length;
    const activeEvents = events.filter(
      e => e.status === "upcoming" || e.status === "ongoing"
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
