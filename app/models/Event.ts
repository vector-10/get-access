import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  startTime: { type: Date, required: true },
  organizerId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  ticketsIssued: { type: Number, default: 0 },
  ticketsSold: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);