import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: "No account found with this email." }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    await sendOtpEmail({
      email: user.email,
      name: user.firstName,
      otp,
    });

    return NextResponse.json({
      message: "A 6-digit verification code has been dispatched to your email address.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "An error occurred while generating the reset code.", error: error.message },
      { status: 500 }
    );
  }
}
