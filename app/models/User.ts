import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  did: string; 
  role: "attendee" | "organizer";
  name: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    did: { type: String, required: true, unique: true },
    role: { type: String, enum: ["attendee", "organizer"], default: "attendee" },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.User || mongoose.model<IUser>("User", UserSchema);
