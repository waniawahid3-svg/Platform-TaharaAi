// app/api/auth/verify-email/route.ts
// POST /api/auth/verify-email → check OTP, mark email verified, send welcome email.

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { createToken, SESSION_COOKIE, cookieOptions } from "@/lib/auth";
import { verifyEmailSchema } from "@/lib/validation";
import { verifyOTP, clearOTP } from "@/lib/otp";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = verifyEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { workEmail, otp } = parsed.data;

    // Find user by email
    const [rows] = await pool.query<any[]>(
      "SELECT id, full_name, organisation, work_email, email_verified FROM users WHERE work_email = ? LIMIT 1",
      [workEmail]
    );
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.email_verified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }

    // Verify OTP
    const otpValid = await verifyOTP(user.id, otp, 'verify');
    if (!otpValid) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    // Mark verified, clear OTP
    await pool.query(
      "UPDATE users SET email_verified = TRUE, otp_code = NULL, otp_expires_at = NULL, otp_purpose = NULL WHERE id = ?",
      [user.id]
    );

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.work_email, user.full_name).catch(console.error);

    // Log them in immediately
    const token = await createToken({ userId: user.id, email: user.work_email });
    const res = NextResponse.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        organisation: user.organisation,
        workEmail: user.work_email,
      },
      message: "Email verified. Welcome to Tahara AI.",
    });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return res;
  } catch (err) {
    console.error("Verify email error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}