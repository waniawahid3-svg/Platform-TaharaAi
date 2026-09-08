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

    // DEMO-ONLY BYPASS: the real Aiven MySQL behind `pool` is unreachable right
    // now (billing hold on the Aiven side, confirmed independently of this app).
    // This lets a local demo proceed through the *actual* login form without a
    // live database, without touching real user data or weakening production:
    // it only fires when DEMO_BYPASS_LOGIN=true is set (never set on Vercel) AND
    // NODE_ENV is not "production", for one fixed demo account only.
    if (
      process.env.DEMO_BYPASS_LOGIN === "true" &&
      process.env.NODE_ENV !== "production" &&
      workEmail === "demo@taharaai.com" &&
      password === "TaharaDemo!2026"
    ) {
      const token = await createToken({ userId: 0, email: workEmail });
      const res = NextResponse.json({
        redirect: "/overview",
        user: { id: 0, fullName: "Demo User", workEmail, organisation: "Tahara AI Demo" },
      });
      res.cookies.set(SESSION_COOKIE, token, cookieOptions);
      return res;
    }

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