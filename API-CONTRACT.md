# Tahara Platform — Frontend ↔ Backend API Contract

Frontend owner: Light · Backend owner: (assign)
Status: **v1 — login only.** Placeholder implementations live in `app/api/auth/*`;
replace their internals, keep the shapes below. The frontend is already wired to
these endpoints and needs no changes when the real backend lands.

---

## 1. POST /api/auth/login   (implemented as placeholder)

Called from: `app/login-runtime.js` → submit handler (marked `BACKEND SEAM`).

### Request
```json
{ "email": "user@company.com", "password": "…", "remember": true }
```

### Responses
| Case | Status | Body |
|---|---|---|
| Success | 200 | `{ "ok": true, "user": { "email": "…" }, "redirect": "/dashboard" }` |
| Bad credentials | 401 | `{ "error": "invalid_credentials" }` |
| Missing fields | 400 | `{ "error": "missing_fields" }` |
| Locked out (future) | 429 | `{ "error": "too_many_attempts", "retryAfterSec": 900 }` |

### Frontend behaviour (already built)
- 200 → button turns green "Welcome back ✓", success banner shown. When a real
  dashboard exists, uncomment the `window.location.assign(data.redirect)` line
  at the BACKEND SEAM.
- Any non-200 or network failure → error banner, password cleared and refocused.
- Session: expected as an **httpOnly cookie** set by this endpoint. The frontend
  does not read or store tokens.

### Placeholder rule (until replaced)
Password of 8+ characters → 200. Anything else → 401.

---

## 2. Future endpoints (not yet called — build alongside their screens)

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/forgot`  | `{ email }` → always 200 (non-enumerating) |
| `POST /api/auth/reset`   | `{ token, password }` → 200 / 400 invalid_token |
| `POST /api/auth/verify`  | `{ token }` → 200 / 400 |
| `POST /api/auth/mfa`     | `{ code }` (session-bound) → 200 / 401 invalid_code |
| `POST /api/auth/logout`  | clears session → 204 |

---

## 3. Non-negotiables for the backend implementation
- Passwords hashed (argon2id/bcrypt), never logged.
- Rate limiting + lockout on login and MFA endpoints.
- Non-enumerating responses on forgot-password.
- Session as `Secure; HttpOnly; SameSite=Lax` cookie.
- CORS: same-origin only (frontend and API are served from one Next.js app).

Strong recommendation: implement via an auth provider (Clerk / Supabase /
NextAuth) rather than hand-rolling — this is a security product; the login is
the first thing customers will judge.
