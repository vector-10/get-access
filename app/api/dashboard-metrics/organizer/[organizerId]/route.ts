import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/models/Event";
import Ticket from "@/app/models/Ticket";

type Params = Promise<{ organizerId: string }>;

export async function GET(
  req: Request,
  context: { params: Params }
) {
  const { organizerId } = await context.params;

  await connectDB();

  // Your existing logic:
  const events = await Event.find({ organizerId });
  const eventIds = events.map(e => e._id);

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
}
