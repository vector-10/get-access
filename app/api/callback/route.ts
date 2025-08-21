import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { did, name } = await request.json();
    if (!did) return NextResponse.json({ message: "DID is required" }, { status: 400 });

    const user = await User.findOneAndUpdate(
      { did },
      { 
        $setOnInsert: { 
          role: "attendee",
          name: name || "Anonymous",
        } 
      },
      { new: true, upsert: true }
    );
    console.log("saved")

    return NextResponse.json({
      message: "User authenticated",
      user: {
        did: user.did,
        role: user.role,
        name: user.name
      },
    });

  } catch (err) {
    console.error("Auth callback error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}