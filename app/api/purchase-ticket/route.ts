import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Event from '@/app/models/Event';
import Ticket from '@/app/models/Ticket';
import User from '@/app/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { eventId, attendeeId, ticketType, price, paymentMethod, walletAddress } = await request.json();

    if (!eventId || !attendeeId || !ticketType || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Allow purchases for upcoming and ongoing events (not completed)
    if (event.status === 'completed') {
      return NextResponse.json(
        { error: 'Event has already ended' },
        { status: 400 }
      );
    }

    // Get user details for the ticket
    const user = await User.findOne({ did: attendeeId }); // Use 'did' not 'civicId'
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user already has a ticket for this event
    const existingTicket = await Ticket.findOne({ 
      eventId: eventId, 
      attendeeId: attendeeId 
    });

    if (existingTicket) {
      return NextResponse.json(
        { error: 'You already have a ticket for this event' },
        { status: 400 }
      );
    }

    // Simulate payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo
    
    if (!paymentSuccess) {
      return NextResponse.json(
        { error: 'Payment failed. Please try again.' },
        { status: 400 }
      );
    }

    // Simulate NFT minting on Solana
    const nftTokenId = `SOL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const nftMetadata = {
      name: `${event.name} - Ticket`,
      description: `Access ticket for ${event.name}`,
      image: event.imageUrl || 'https://via.placeholder.com/400x300',
      attributes: [
        { trait_type: 'Event', value: event.name },
        { trait_type: 'Location', value: event.location },
        { trait_type: 'Date', value: new Date(event.startTime).toISOString() },
        { trait_type: 'Ticket Type', value: ticketType },
        { trait_type: 'Price', value: `${price} SOL` }
      ]
    };

    // Generate QR code data (in real app, generate actual QR)
    const qrCodeData = `${eventId}-${attendeeId}-${nftTokenId}`;

    // Create ticket record with your schema
    const ticket = new Ticket({
      eventId: eventId, // MongoDB ObjectId
      attendeeId: attendeeId,
      attendeeName: user.name,
      attendeeEmail: user.name + '@example.com', // Generate email since User model has no email field
      ticketType: ticketType === 'standard' ? 'general' : ticketType, // Map to your enum
      price,
      status: 'confirmed',
      purchaseDate: new Date(),
      nftTokenId,
      nftMetadata,
      qrCode: qrCodeData,
      paymentMethod: paymentMethod || 'embedded_wallet',
      walletAddress,
      transactionHash: `simulated_${Date.now()}`
    });

    await ticket.save();

    // ✅ UPDATE EVENT TICKET COUNT - This tracks tickets sold per event
    await Event.findByIdAndUpdate(eventId, { 
      $inc: { ticketsSold: 1 } // Increment tickets sold counter
    });

    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket._id,
        eventId: ticket.eventId,
        ticketType: ticket.ticketType,
        price: ticket.price,
        status: ticket.status,
        nftTokenId: ticket.nftTokenId,
        nftMetadata: ticket.nftMetadata,
        purchaseDate: ticket.purchaseDate,
        qrCode: ticket.qrCode
      },
      message: 'Ticket purchased successfully! Your NFT ticket has been minted on Solana.'
    }, { status: 201 });

  } catch (error) {
    console.error('Purchase ticket error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}