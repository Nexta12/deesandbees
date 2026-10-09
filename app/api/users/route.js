import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";
import { getUserFromRequest } from "@/lib/auth";

// GET /api/users - List all users (admin only)
export async function GET(request) {
  try {
    const session = getUserFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const currentUser = await User.findById(session.id);
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin privileges required" },
        { status: 403 }
      );
    }

    const hiddenEmail = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.toLowerCase()
      : null;
    const query = hiddenEmail ? { email: { $ne: hiddenEmail } } : {};
    const users = await User.find(query)
      .select("-password -resetPasswordOTP -resetPasswordExpires")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (admin only)
export async function POST(request) {
  try {
    const session = getUserFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const currentUser = await User.findById(session.id);
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin privileges required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email address already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const validRoles = ["admin", "editor", "user"];
    const assignedRole = validRoles.includes(role) ? role : "user";

    const newUser = await User.create({
      firstName: firstName?.trim() || "",
      lastName: lastName?.trim() || "",
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    });

    const userObj = newUser.toObject();
    delete userObj.password;
    delete userObj.resetPasswordOTP;
    delete userObj.resetPasswordExpires;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userObj,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
