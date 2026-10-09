import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    title: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5 },
    country: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
