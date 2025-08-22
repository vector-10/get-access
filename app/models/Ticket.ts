import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  eventId: mongoose.Schema.Types.ObjectId;
  attendeeId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: 'general' | 'vip' | 'early-bird' | 'student';
  price: number;
  status: 'pending' | 'confirmed' | 'used' | 'cancelled';
  purchaseDate: Date;
  nftTokenId?: string;
  nftMetadata?: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  qrCode?: string;
  paymentMethod?: string;
  walletAddress?: string;
  transactionHash?: string;
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
    enum: ['general', 'vip', 'early-bird', 'student'],
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
  nftMetadata: {
    name: String,
    description: String,
    image: String,
    attributes: [{
      trait_type: String,
      value: String
    }]
  },
  qrCode: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['embedded_wallet', 'external_wallet', 'credit_card'],
    default: 'embedded_wallet'
  },
  walletAddress: {
    type: String
  },
  transactionHash: {
    type: String
  }
}, {
  timestamps: true
});

ticketSchema.index({ eventId: 1, attendeeId: 1 }, { unique: true });

ticketSchema.index({ attendeeId: 1, status: 1 });
ticketSchema.index({ eventId: 1, status: 1 });

export const Ticket = mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', ticketSchema);