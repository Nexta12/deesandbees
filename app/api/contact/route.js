import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/ContactModel";
import { sendContactNotification } from "@/lib/mailer";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, address, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { message: "Full name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      phone: phone ? phone.trim() : "",
      address: address ? address.trim() : "",
    });

    // Forward message notification via email to info@deesandbeesglobal.com and admins
    try {
      await sendContactNotification({
        fullName: newContact.fullName,
        email: newContact.email,
        phone: newContact.phone,
        address: newContact.address,
        message: newContact.message,
      });
    } catch (err) {
      console.error("Email notification error:", err);
    }

    return NextResponse.json(
      {
        message: "Your message has been received! Our educational advisors will reach out to you shortly.",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { message: "An error occurred while submitting your message.", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Contacts retrieved successfully",
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Error fetching contacts", error: error.message },
      { status: 500 }
    );
  }
}
