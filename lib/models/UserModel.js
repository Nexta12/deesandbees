import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "editor"],
      default: "user",
    },
    resetPasswordOTP: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
