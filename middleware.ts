// middleware.ts  (lives at the REPO ROOT, next to package.json — not inside app/)
// This runs before protected pages load. If there's no valid session cookie,
// it bounces the visitor to the sign-in page. This is what actually stops a
// logged-out person from opening /platform/... directly.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // No token → send them to sign in.
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    await verifyToken(token); // valid token → allow through
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// Only these routes are protected. Add or change paths here as your app grows.
// (Your public landing page "/" and the auth API stay open automatically because
// they're not listed.)
export const config = {
  matcher: ["/platform/:path*", "/dashboard/:path*"],
};
