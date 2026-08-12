// app/api/auth/signup/route.ts
// POST /api/auth/signup → create account, send OTP, require verification before login.

import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { pool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { signupSchema } from "@/lib/validation";
import { generateOTP, storeOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { fullName, organisation, workEmail, password, termsAccepted } = parsed.data;

    // Check if email already exists
    const [existing] = await pool.query(
      "SELECT id, email_verified FROM users WHERE work_email = ? LIMIT 1",
      [workEmail]
    );
    
    const existingUser = (existing as any[])[0];
    if (existingUser) {
      // If already verified, reject. If not verified, allow re-signup to resend OTP.
      if (existingUser.email_verified) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      // Delete unverified user so they can re-register
      await pool.query("DELETE FROM users WHERE id = ?", [existingUser.id]);
    }

    const passwordHash = await hashPassword(password);

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (full_name, organisation, work_email, password_hash, terms_accepted, email_verified)
       VALUES (?, ?, ?, ?, ?, FALSE)`,
      [fullName, organisation, workEmail, passwordHash, termsAccepted]
    );
    const userId = result.insertId;

    // Generate and send OTP
    const otp = generateOTP();
    await storeOTP(userId, otp, 'verify');
    await sendOTPEmail(workEmail, otp, 'verify');

    return NextResponse.json(
      { 
        message: "Account created. Check your email for the verification code.",
        userId 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}