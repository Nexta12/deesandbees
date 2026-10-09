import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/lib/models/TestimonialModel";
import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { message: "Failed to fetch testimonials", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = getUserFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, title, message, country, rating } = body;

    if (!fullName || !message) {
      return NextResponse.json(
        { message: "Student name and message are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const newTestimonial = await Testimonial.create({
      fullName: fullName.trim(),
      title: title ? title.trim() : "Student Success Story",
      message: message.trim(),
      country: country ? country.trim() : "International",
      rating: Number(rating) || 5,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully",
        testimonial: newTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { message: "Failed to create testimonial", error: error.message },
      { status: 500 }
    );
  }
}
