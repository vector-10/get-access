import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  eventId: mongoose.Schema.Types.ObjectId;
  attendeeId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: 'general' | 'vip' | 'early-bird';
  price: number;
  status: 'pending' | 'confirmed' | 'used' | 'cancelled';
  purchaseDate: Date;
  nftTokenId?: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new Schema<ITicket>({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  attendeeId: {
    type: String,
    required: true
  },
  attendeeName: {
    type: String,
    required: true
  },
  attendeeEmail: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    enum: ['general', 'vip', 'early-bird'],
    default: 'general'
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'used', 'cancelled'],
    default: 'pending'
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  nftTokenId: {
    type: String,
    unique: true,
    sparse: true
  },
  qrCode: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);