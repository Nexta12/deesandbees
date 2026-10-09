import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/UserModel";
import { getUserFromRequest } from "@/lib/auth";

// PATCH /api/users/[id] - Update user details or role
export async function PATCH(request, context) {
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

    const { id } = await context.params;
    const body = await request.json();
    const { firstName, lastName, role, password } = body;

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hiddenEmail = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.toLowerCase()
      : null;
    if (hiddenEmail && targetUser.email?.toLowerCase() === hiddenEmail) {
      return NextResponse.json(
        { message: "This system administrator account cannot be modified here." },
        { status: 403 }
      );
    }

    // Protect last admin from changing own role away from admin
    if (
      targetUser._id.toString() === currentUser._id.toString() &&
      role &&
      role !== "admin"
    ) {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json(
          { message: "Cannot demote the only remaining administrator." },
          { status: 400 }
        );
      }
    }

    const updateFields = {};
    if (typeof firstName === "string") updateFields.firstName = firstName.trim();
    if (typeof lastName === "string") updateFields.lastName = lastName.trim();
    if (role && ["admin", "editor", "user"].includes(role)) {
      updateFields.role = role;
    }
    if (password && password.trim().length >= 6) {
      updateFields.password = await bcrypt.hash(password.trim(), 10);
    }

    const updated = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select("-password -resetPasswordOTP -resetPasswordExpires");

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updated,
    });
  } catch (error) {
    console.error("PATCH /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update user", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Remove user
export async function DELETE(request, context) {
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

    const { id } = await context.params;

    // Prevent deleting oneself
    if (id === currentUser._id.toString()) {
      return NextResponse.json(
        { message: "You cannot delete your own active administrator account." },
        { status: 400 }
      );
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hiddenEmail = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.toLowerCase()
      : null;
    if (hiddenEmail && targetUser.email?.toLowerCase() === hiddenEmail) {
      return NextResponse.json(
        { message: "This system administrator account cannot be deleted." },
        { status: 403 }
      );
    }

    // If target is admin, make sure there is at least one other admin
    if (targetUser.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return NextResponse.json(
          { message: "Cannot delete the sole administrator." },
          { status: 400 }
        );
      }
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error: error.message },
      { status: 500 }
    );
  }
}
