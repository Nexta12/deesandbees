import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    isSeen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
