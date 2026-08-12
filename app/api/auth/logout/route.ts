// app/api/auth/logout/route.ts
// POST /api/auth/logout  → clear the session cookie.

import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  // Overwrite the cookie with an immediately-expiring one to remove it.
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
