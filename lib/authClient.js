// Owned by backend. The login form calls this.
export async function loginRequest(email, password, remember) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ workEmail: email, password, rememberMe: remember })
  });
  return { ok: res.ok, data: await res.json().catch(() => ({})) };
}