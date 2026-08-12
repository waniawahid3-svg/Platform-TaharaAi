// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import { pool } from "@/lib/db";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

interface UserRow extends RowDataPacket {
  id: number;
  full_name: string;
  organisation: string;
  work_email: string;
}

export async function GET() {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);

    const [rows] = await pool.query<UserRow[]>(
      "SELECT id, full_name, organisation, work_email FROM users WHERE id = ? LIMIT 1",
      [payload.userId]
    );
    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        organisation: user.organisation,
        workEmail: user.work_email,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}