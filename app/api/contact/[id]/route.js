import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/ContactModel";
import { getUserFromRequest } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 });
    }

    contact.isSeen = true;
    await contact.save();

    return NextResponse.json({ message: "Contact marked as seen", data: contact });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update contact", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Contact inquiry deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete contact", error: error.message }, { status: 500 });
  }
}
