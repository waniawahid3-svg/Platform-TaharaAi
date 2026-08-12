// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { verifyPassword, createToken, SESSION_COOKIE, cookieOptions } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

interface UserRow extends RowDataPacket {
  id: number;
  full_name: string;
  organisation: string;
  work_email: string;
  password_hash: string;
  email_verified: boolean;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { workEmail, password } = parsed.data;

    const [rows] = await pool.query<UserRow[]>(
      "SELECT id, full_name, organisation, work_email, password_hash, email_verified FROM users WHERE work_email = ? LIMIT 1",
      [workEmail]
    );
    const user = rows[0];

    const passwordOk = user ? await verifyPassword(password, user.password_hash) : false;
    if (!user || !passwordOk) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // CRITICAL: reject login if email not verified
    if (!user.email_verified) {
      return NextResponse.json(
        { error: "Email not verified. Please verify your email before logging in." },
        { status: 403 }
      );
    }

    const token = await createToken({ userId: user.id, email: user.work_email });
    const res = NextResponse.json({
      redirect: "/overview",
      user: {
        id: user.id,
        fullName: user.full_name,
        workEmail: user.work_email,
        organisation: user.organisation,
      },
    });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}