import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const payload = getUserFromRequest(request);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(payload.id).select("-password -resetPasswordOTP -resetPasswordExpires");
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 404 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: error.message }, { status: 500 });
  }
}
