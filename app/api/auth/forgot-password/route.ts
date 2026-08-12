// app/api/auth/forgot-password/route.ts
// POST /api/auth/forgot-password → send OTP to email for password reset.

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validation";
import { generateOTP, storeOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { workEmail } = parsed.data;

    const [rows] = await pool.query<any[]>(
      "SELECT id, work_email, email_verified FROM users WHERE work_email = ? LIMIT 1",
      [workEmail]
    );
    const user = rows[0];

    // Return same message whether user exists or not — don't leak registered emails
    if (!user || !user.email_verified) {
      return NextResponse.json(
        { message: "If an account exists, a reset code has been sent." },
        { status: 200 }
      );
    }

    const otp = generateOTP();
    await storeOTP(user.id, otp, 'reset');
    await sendOTPEmail(user.work_email, otp, 'reset');

    return NextResponse.json(
      { message: "If an account exists, a reset code has been sent." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}