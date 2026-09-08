// Owned by backend. The Discovery page (app/discovery) calls this. Talks
// directly to the real Discovery FastAPI service
// (ccae-eu-ai-act/ccae/discovery_api/server.py) -- a separate service from
// Governance's API, with no runtime coupling beyond shared type shapes. That
// service's CORSMiddleware is allow_origins=["*"] for local dev, so a direct
// cross-origin fetch works with no proxy.
const DISCOVERY_API_BASE = process.env.NEXT_PUBLIC_DISCOVERY_API_BASE || "http://localhost:8021";

// The 5 tools discovery_api/server.py actually wires in, live-verified against
// real output. Prowler and OpenCSPM are never wired in at all -- see that
// file's module docstring: no reachable AWS credential for Prowler, and
// OpenCSPM is not a real installable package under that name.
export const UNAVAILABLE_TOOLS = [
  { tool: "prowler", reason: "No reachable AWS credential to scan against." },
  { tool: "opencspm", reason: "Not a real installable package under this name." },
];

async function asJson(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.detail || `${res.status} ${res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function getDiscoveryHealth() {
  const res = await fetch(`${DISCOVERY_API_BASE}/health`);
  return asJson(res);
}

export async function scan(tool, target) {
  const res = await fetch(`${DISCOVERY_API_BASE}/scan/${tool}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target }),
  });
  return asJson(res);
}
