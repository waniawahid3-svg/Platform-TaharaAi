// Owned by backend. The assessment chatbot (app/assessment) and, later, the
// governance results dashboard call this. Talks directly to the real
// Governance FastAPI service (ccae-eu-ai-act/ccae/api/server.py) -- that
// service's CORSMiddleware is allow_origins=["*"] for local dev, so a direct
// cross-origin fetch works with no proxy. See API-CONTRACT.md, section 2.
const GOV_API_BASE = process.env.NEXT_PUBLIC_GOV_API_BASE || "http://localhost:8010";

async function asJson(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.detail || `${res.status} ${res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function openEngagement() {
  const res = await fetch(`${GOV_API_BASE}/engagements`, { method: "POST" });
  return asJson(res);
}

export async function uploadDocuments(engagementId, files) {
  const fd = new FormData();
  for (const f of files) fd.append("files", f);
  const res = await fetch(`${GOV_API_BASE}/engagements/${engagementId}/documents`, {
    method: "POST",
    body: fd,
  });
  return asJson(res);
}

export async function getDocumentsStatus(engagementId) {
  const res = await fetch(`${GOV_API_BASE}/engagements/${engagementId}/documents/status`);
  return asJson(res);
}

export async function getQuestions(engagementId, size = 6) {
  const res = await fetch(`${GOV_API_BASE}/engagements/${engagementId}/questions?size=${size}`);
  return asJson(res);
}

export async function submitAnswers(engagementId, answers) {
  const res = await fetch(`${GOV_API_BASE}/engagements/${engagementId}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  return asJson(res);
}

export async function getReport(engagementId) {
  const res = await fetch(`${GOV_API_BASE}/engagements/${engagementId}/report`);
  return asJson(res);
}
