import { NextResponse } from "next/server";

/*  ────────────────────────────────────────────────────────────────
    PLACEHOLDER LOGIN ENDPOINT — replace with real authentication.
    See API-CONTRACT.md at the repo root for the agreed contract.

    Current behaviour (mirrors the design demo so the frontend can
    be exercised end-to-end):
      · password with 8+ characters  → 200 success
      · anything else               → 401 invalid_credentials
    ──────────────────────────────────────────────────────────────── */
export async function POST(request) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // TODO(backend): verify credentials, create session/JWT, set cookie.
  if (String(password).length >= 8) {
    return NextResponse.json({
      ok: true,
      user: { email },
      redirect: "/overview"
    });
  }

  return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
}
