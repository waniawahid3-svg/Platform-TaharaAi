# Tahara Platform (frontend)

Next.js port of the Tahara login page — pixel-identical to the shipped HTML
version, with the form wired to `/api/auth/login` (placeholder; see
`API-CONTRACT.md`).

## Structure
- `app/page.js` — login page markup (JSX)
- `app/login-runtime.js` — all behaviour: i18n (EN/عربي RTL), canvas
  command-center scene, widgets, caps-lock, submit → API
- `app/globals.css` — full design system
- `app/api/auth/login/route.js` — placeholder endpoint for the backend dev

## Run locally
    npm install
    npm run dev

## Deploy
Push to GitHub → import in Vercel → framework auto-detected (Next.js) →
Deploy. No settings to change.
