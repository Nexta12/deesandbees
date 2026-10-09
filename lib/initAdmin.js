import bcrypt from "bcryptjs";
import User from "./models/UserModel";

export async function ensureAdminInitialized() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminEmail || !adminPass) {
    return null;
  }

  const existing = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existing) {
    return existing;
  }

  const hashedPassword = await bcrypt.hash(adminPass, 10);

  const newAdmin = await User.create({
    email: adminEmail.toLowerCase(),
    password: hashedPassword,
    firstName: process.env.ADMIN_FIRSTNAME || "Admin",
    lastName: process.env.ADMIN_LASTNAME || "",
    role: process.env.ADMIN_ROLE || "admin",
  });

  return newAdmin;
}
