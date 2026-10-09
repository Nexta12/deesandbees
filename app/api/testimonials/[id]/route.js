import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/lib/models/TestimonialModel";
import { getUserFromRequest } from "@/lib/auth";

export async function DELETE(request, context) {
  try {
    const session = getUserFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { message: "Failed to delete testimonial", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  try {
    const session = getUserFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { fullName, title, message, country, rating } = body;

    await connectDB();

    const updateFields = {};
    if (typeof fullName === "string") updateFields.fullName = fullName.trim();
    if (typeof title === "string") updateFields.title = title.trim();
    if (typeof message === "string") updateFields.message = message.trim();
    if (typeof country === "string") updateFields.country = country.trim();
    if (rating !== undefined) updateFields.rating = Number(rating);

    const updated = await Testimonial.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial: updated,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { message: "Failed to update testimonial", error: error.message },
      { status: 500 }
    );
  }
}
