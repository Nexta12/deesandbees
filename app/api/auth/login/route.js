import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";
import { signToken } from "@/lib/auth";
import { ensureAdminInitialized } from "@/lib/initAdmin";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureAdminInitialized();

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    };

    const token = signToken(tokenPayload, "7d");

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.resetPasswordOTP;
    delete userObj.resetPasswordExpires;

    const response = NextResponse.json(
      {
        message: "Login successful.",
        token,
        user: userObj,
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie for sessions
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { message: "An error occurred while logging in.", error: error.message },
      { status: 500 }
    );
  }
}
