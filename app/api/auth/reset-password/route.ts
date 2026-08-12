// app/api/auth/reset-password/route.ts
// POST /api/auth/reset-password → verify OTP, set new password.

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validation";
import { verifyOTP, clearOTP } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { workEmail, otp, newPassword } = parsed.data;

    const [rows] = await pool.query<any[]>(
      "SELECT id, work_email FROM users WHERE work_email = ? AND email_verified = TRUE LIMIT 1",
      [workEmail]
    );
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const otpValid = await verifyOTP(user.id, otp, 'reset');
    if (!otpValid) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);

    await pool.query(
      "UPDATE users SET password_hash = ?, otp_code = NULL, otp_expires_at = NULL, otp_purpose = NULL WHERE id = ?",
      [newHash, user.id]
    );

    return NextResponse.json(
      { message: "Password reset successfully. You can now log in." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}