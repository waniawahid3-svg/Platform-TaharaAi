# Security TODO — known, accepted-for-now risks

Both items below were flagged by an automated security review after the
2026-09-08/09 session that wired the real Governance/Discovery backends into
this frontend. Both are **known and deliberately accepted for now** because
the real fix for #1 depends on the Aiven MySQL subscription being restored
(see project memory — Aiven billing hold). Revisit both before any real
(non-demo) deployment.

---

## 1. [CRITICAL] Hardcoded demo login credentials

**File:** `app/api/auth/login/route.ts`

```ts
if (
  process.env.DEMO_BYPASS_LOGIN === "true" &&
  process.env.NODE_ENV !== "production" &&
  workEmail === "demo@taharaai.com" &&
  password === "TaharaDemo!2026"
) {
  const token = await createToken({ userId: 0, email: workEmail });
  ...
}
```

**Why it exists:** the real Aiven MySQL database is currently unreachable
(billing hold on Aiven's side, confirmed independently of this app via three
separate tools — not a bug here). This blocks the real login path entirely,
which would otherwise block every local demo. The bypass lets the *real*
login route run end to end (real signed session cookie via the real
`createToken()`) for one fixed demo account, skipping only the DB lookup.

**Why it's still a real risk:** the literal password `TaharaDemo!2026` is
committed to source, now pushed to a real GitHub repo
(`responsibleai-core`). The only thing preventing it from working in
production is `DEMO_BYPASS_LOGIN` never being set there, plus the
`NODE_ENV !== "production"` second gate — both are configuration, not code,
and configuration can be copied by mistake.

**Real fix, once Aiven is back:**
- Remove this bypass branch entirely.
- Seed a real demo user row in the actual `users` table with a bcrypt-hashed
  password (hash generated once, stored in the DB — not this file).
- Let the normal `pool.query(...)` + `verifyPassword(...)` path handle it,
  exactly like every other account.
- Delete `DEMO_BYPASS_LOGIN` from `.env.local` once the bypass code is gone.

---

## 2. [HIGH] `middleware.ts` doesn't protect the real app routes

**File:** `middleware.ts`

```ts
export const config = {
  matcher: ["/platform/:path*", "/dashboard/:path*"],
};
```

**The problem:** none of the real pages — `/overview`, `/governance`,
`/framework`, `/discovery`, `/guardrails`, `/assessment`, `/gap`, `/report`
— are covered by this matcher. Anyone can open any of them directly, no
session cookie required. This is **pre-existing**, not introduced this
session — confirmed live earlier (with `document.cookie === ""`, navigating
to `/governance` succeeded with no redirect).

**Why it's being left alone for now:** real login itself is already blocked
on the Aiven issue above, so tightening route protection right now would
only block the demo further, not add real security (the DB-backed login
can't be exercised end to end yet regardless).

**Real fix, once Aiven is back and #1 above is resolved:**
```ts
export const config = {
  matcher: [
    "/overview/:path*",
    "/governance/:path*",
    "/framework/:path*",
    "/discovery/:path*",
    "/guardrails/:path*",
    "/assessment/:path*",
    "/gap/:path*",
    "/report/:path*",
  ],
};
```
Or, more robustly, an inverse matcher that protects everything except the
known-public/auth paths:
```ts
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|signin|$).*)"],
};
```
