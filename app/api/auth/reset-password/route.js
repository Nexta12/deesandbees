import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";

export async function POST(request) {
  try {
    const { email, otp, password, confirmPassword } = await request.json();

    if (!email || !otp || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !user.resetPasswordOTP) {
      return NextResponse.json(
        { message: "Invalid or expired reset code." },
        { status: 400 }
      );
    }

    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const isOtpMatch = await bcrypt.compare(otp.trim(), user.resetPasswordOTP);
    if (!isOtpMatch) {
      return NextResponse.json(
        { message: "Invalid verification code." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "An error occurred while resetting password.", error: error.message },
      { status: 500 }
    );
  }
}
