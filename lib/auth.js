import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables (.env.local)");
}

export function signToken(payload, expiresIn = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getUserFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    // Check cookies
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => {
          const [key, ...v] = c.split("=");
          return [key, decodeURIComponent(v.join("="))];
        })
      );
      token = cookies.token;
    }
  }

  if (!token) return null;
  return verifyToken(token);
}
