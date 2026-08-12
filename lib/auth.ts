// lib/auth.ts
// The security core. Two responsibilities:
//   1. Passwords  — hash on signup, compare on login (bcrypt salts automatically).
//   2. Sessions   — create a signed JWT on login, verify it on later requests.

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

// ---- Passwords --------------------------------------------------------------

// Turn a plain password into a salted hash to store in the DB.
// bcrypt generates a unique random salt and embeds it INSIDE the returned string,
// so two identical passwords still produce different hashes. You never handle the
// salt yourself — that's the correct, standard approach.
export async function hashPassword(plain: string): Promise<string> {
  const SALT_ROUNDS = 12; // higher = slower = harder to brute-force. 12 is a good default.
  return bcrypt.hash(plain, SALT_ROUNDS);
}

// Check a typed password against the stored hash. bcrypt reads the salt back out
// of the stored hash automatically, so this "just works".
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ---- JWT session tokens -----------------------------------------------------

// The secret that signs tokens. If it's missing we throw immediately, because a
// missing secret is a silent security hole — better to fail loudly at startup.
const secretString = process.env.JWT_SECRET;
if (!secretString) {
  throw new Error("JWT_SECRET is not set. Add it to .env.local.");
}
const SECRET = new TextEncoder().encode(secretString);

// What we store inside the token. Keep it small — never put the password here.
export type SessionPayload = {
  userId: number;
  email: string;
};

// Create a signed token that expires in 7 days.
export async function createToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

// Verify a token and return its payload. Throws if the token is invalid or expired.
export async function verifyToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, SECRET);
  return { userId: Number(payload.userId), email: String(payload.email) };
}

// The single place that defines our cookie name + options, so signup/login/logout
// all stay consistent.
export const SESSION_COOKIE = "tahara-session";

export const cookieOptions = {
  httpOnly: true, // JavaScript in the browser can't read it → protects against XSS theft
  secure: process.env.NODE_ENV === "production", // HTTPS-only in production
  sameSite: "lax" as const, // sensible CSRF protection default
  maxAge: 60 * 60 * 24 * 7, // 7 days, in seconds
  path: "/",
};
