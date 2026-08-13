/* Ported 1:1 from the shipped HTML login page.
   Runs once on mount (called from app/page.js); returns a dispose fn. */
function animateSceneTheme(t){
  const target = THEMES_NUM[t] || THEMES_NUM.dark;
  const from = _pclone(CURP);
  if (_thAnim) cancelAnimationFrame(_thAnim);
  const t0 = performance.now(), DUR = 450;
  function step(now){
    const p = Math.min(1,(now-t0)/DUR);
    const e = p<.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
    for (const k in target)
      for (let i=0;i<target[k].length;i++)
        CURP[k][i] = from[k][i] + (target[k][i]-from[k][i])*e;
    _updPAL();
    if (p<1) _thAnim = requestAnimationFrame(step); else _thAnim = null;
  }
  _thAnim = requestAnimationFrame(step);
}

export function initLogin(){
  /* theme: restore + toggle */
  try{
    var _t0 = localStorage.getItem("tahara-theme");
    if (_t0){ document.documentElement.dataset.theme = _t0; }
    CURP = _pclone(THEMES_NUM[_t0 === "light" ? "light" : "dark"]); _updPAL();
  }catch(e){}
  var _tgBtn = document.getElementById("themeTg");
  var _tgHandler = null;
  if (_tgBtn){
    _tgHandler = function(){
      var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try{ localStorage.setItem("tahara-theme", next); }catch(e){}
      animateSceneTheme(next);
    };
    _tgBtn.addEventListener("click", _tgHandler);
  }

  let disposed = false;
  const _timeouts = [], _intervals = [];
  const _setT = window.setTimeout.bind(window);
  const _setI = window.setInterval.bind(window);
  function setTimeout(fn, ms){ const id = _setT(()=>{ if (!disposed) fn(); }, ms); _timeouts.push(id); return id; }
  function setInterval(fn, ms){ const id = _setI(()=>{ if (!disposed) fn(); }, ms); _intervals.push(id); return id; }

/* ═══════════════ Original logo with retry + graceful fallback ═══════════════ */
document.querySelectorAll(".logo-img").forEach(img=>{
  let retried = false;
  const fail = ()=>{
    if (!retried){                      /* one retry with cache-bust before giving up */
      retried = true;
      img.src = "https://www.taharaai.com/logo.png?r=" + Date.now();
      return;
    }
    img.style.display = "none";
    const fb = img.parentElement.querySelector(".logo-fb");
    if (fb) fb.style.display = "block";
  };
  const fit = ()=>{
    /* if the PNG already contains the wordmark, hide the duplicate text */
    if (img.naturalWidth / img.naturalHeight > 2.2){
      const t = img.parentElement.querySelector(".logo-text");
      if (t) t.style.display = "none";
    }
  };
  img.addEventListener("error", fail);
  img.addEventListener("load", fit);
  if (img.complete){ img.naturalWidth > 0 ? fit() : fail(); }
});

/* ═══════════════ i18n ═══════════════ */
const STRINGS = {
  en: {
    title:"Log in to Tahara",
    sub:"Welcome back. Enter your details to continue.",
    email:"Work email", pw:"Password",
    show:"Show", hide:"Hide",
    keep:"Keep me signed in", forgot:"Forgot password",
    login:"Log in →", signing:"Logging in…", ok:"Welcome back ✓",
    noacc:"Don't have access?", contact:"Contact your administrator",
    demo:"Demo interface. Nothing is sent.",
    caps:"Caps Lock is on",
    terms:"Terms", privacy:"Privacy notice", copy:"© 2026 Tahara AI",
    err:"That email and password don't match. Try again or reset your password.",
    redirect:"Logged in. Taking you to your workspace…",
    docTitle:"Log in · Tahara AI"
  },
  ar: {
    title:"تسجيل الدخول إلى Tahara",
    sub:"مرحبًا بعودتك. أدخل بياناتك للمتابعة.",
    email:"البريد الإلكتروني للعمل", pw:"كلمة المرور",
    show:"إظهار", hide:"إخفاء",
    keep:"إبقائي مسجّل الدخول", forgot:"نسيت كلمة المرور",
    login:"تسجيل الدخول ←", signing:"جارٍ تسجيل الدخول…", ok:"مرحبًا بعودتك ✓",
    noacc:"ليس لديك صلاحية وصول؟", contact:"تواصل مع مسؤول النظام",
    demo:"واجهة تجريبية. لا يتم إرسال أي بيانات.",
    caps:"مفتاح Caps Lock مفعّل",
    terms:"الشروط", privacy:"إشعار الخصوصية", copy:"© 2026 Tahara AI",
    err:"البريد الإلكتروني وكلمة المرور غير متطابقين. حاول مرة أخرى أو أعد تعيين كلمة المرور.",
    redirect:"تم تسجيل الدخول. جارٍ نقلك إلى مساحة عملك…",
    docTitle:"تسجيل الدخول · Tahara AI"
  }
};
let lang = "en";
let btnKey = "login";
let bannerKey = null;

function applyLang(next){
  lang = next;
  const t = STRINGS[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t.docTitle;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  btnLabel.textContent = t[btnKey];
  const pw = document.getElementById("password");
  pwToggleBtn.textContent = pw.type === "password" ? t.show : t.hide;
  if (bannerKey) banner.textContent = t[bannerKey];
  document.querySelectorAll(".lang button").forEach(b=>{
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  try { localStorage.setItem("tahara-lang", lang); } catch(e){}
  if (typeof sceneReflow === "function") sceneReflow();
}
document.querySelectorAll(".lang button").forEach(b=>{
  b.addEventListener("click", ()=>applyLang(b.dataset.lang));
});

/* ═══════════════ Password + Caps Lock ═══════════════ */
const pwToggleBtn = document.getElementById("pwToggle");
const pwInput = document.getElementById("password");
pwToggleBtn.addEventListener("click", ()=>{
  const showing = pwInput.type === "text";
  pwInput.type = showing ? "password" : "text";
  pwToggleBtn.setAttribute("aria-pressed", String(!showing));
  pwToggleBtn.textContent = showing ? STRINGS[lang].show : STRINGS[lang].hide;
});
const capsHint = document.getElementById("capsHint");
function capsCheck(e){
  if (e.getModifierState) capsHint.classList.toggle("on", e.getModifierState("CapsLock"));
}
pwInput.addEventListener("keydown", capsCheck);
pwInput.addEventListener("keyup", capsCheck);
pwInput.addEventListener("blur", ()=>capsHint.classList.remove("on"));

/* ═══════════════ Submit demo (8+ chars → success) ═══════════════ */
const form = document.getElementById("form");
const banner = document.getElementById("banner");
const submitBtn = document.getElementById("submit");
const btnLabel = document.getElementById("btnLabel");

function setBanner(key, kind){
  bannerKey = key;
  banner.className = "banner show " + kind;
  banner.textContent = STRINGS[lang][key];
}
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  if (!form.reportValidity()) return;
  banner.className = "banner"; bannerKey = null;
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  btnKey = "signing"; btnLabel.textContent = STRINGS[lang].signing;

  /* ── BACKEND SEAM ─────────────────────────────────────────────
     Calls POST /api/auth/login — see API-CONTRACT.md.
     The placeholder route in app/api/auth/login/route.js mimics
     the old demo (8+ char password succeeds) until the backend
     developer replaces it with real authentication.            */
  let ok = false, data = {};
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        password: pwInput.value,
        remember: document.getElementById("remember").checked
      })
    });
    ok = res.ok;
    data = await res.json().catch(()=>({}));
  } catch (err) {
    ok = false;
  }

  submitBtn.classList.remove("loading");
  if (ok){
    submitBtn.classList.add("success");
    btnKey = "ok"; btnLabel.textContent = STRINGS[lang].ok;
    setBanner("redirect","success");
    if (data.redirect) setTimeout(()=>{ window.location.assign(data.redirect); }, 900);
  } else {
    submitBtn.disabled = false;
    btnKey = "login"; btnLabel.textContent = STRINGS[lang].login;
    setBanner("err","error");
    pwInput.value = ""; pwInput.focus();
  }
});

/* ═══════════════════════════════════════════════════
   COMMAND-CENTER SCENE v4
   + lifecycle ring (Assess/Govern/Test/Monitor)
   + dust particles, orbit travelers, spark bursts
   + rect-based collision (no overlaps)
═══════════════════════════════════════════════════ */
const canvas = document.getElementById("net");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DPR = Math.min(window.devicePixelRatio||1, 2);

const MINT  = "94,231,196";
const BLUE  = "127,168,240";
const CORAL = "255,138,101";

/* ── theme palettes (numeric, lerp-able for a smooth switch) ── */
const THEMES_NUM = {
  dark:{
    mint:[94,231,196], blue:[127,168,240], coral:[255,138,101], label:[234,240,249],
    grid:[150,190,240,.075], link:[150,190,240,.1],
    station:[3,16,38,.9], pillbg:[3,16,38,.66], pilltx:[234,240,249,.58], gtrack:[234,240,249,.12]
  },
  light:{
    mint:[18,100,74], blue:[34,88,178], coral:[178,52,32], label:[6,36,81],
    grid:[6,36,81,.12], link:[6,36,81,.12],
    station:[255,255,255,.97], pillbg:[255,255,255,.92], pilltx:[6,36,81,.7], gtrack:[6,36,81,.14]
  }
};
function _pclone(o){ const r={}; for (const k in o) r[k]=o[k].slice(); return r; }
let CURP = _pclone(THEMES_NUM.dark);
const PALT = {};
function _updPAL(){
  PALT.mint  = CURP.mint.map(Math.round).join(",");
  PALT.blue  = CURP.blue.map(Math.round).join(",");
  PALT.coral = CURP.coral.map(Math.round).join(",");
  PALT.label = CURP.label.map(Math.round).join(",");
  const f = a => "rgba("+a.slice(0,3).map(Math.round).join(",")+","+a[3].toFixed(3)+")";
  PALT.gridStroke = f(CURP.grid);
  PALT.linkFaint  = f(CURP.link);
  PALT.stationFill= f(CURP.station);
  PALT.pillFill   = f(CURP.pillbg);
  PALT.pillText   = f(CURP.pilltx);
  PALT.gaugeTrack = f(CURP.gtrack);
}
_updPAL();
let _thAnim = null;

const ASSETS = [
  "agent:procure-01","model:router-v2","rag:kb-prod","api:external",
  "agent:hr-assist","mcp:toolchain","model:vision-01","agent:finops-02",
  "prompt:v12","agent:sales-bot"
];
const THREATS = ["prompt.injection","pii.outbound","jailbreak.attempt","tool.overreach","data.exfil"];
/* lifecycle from taharaai.com — 01 Assess · 02 Govern · 03 Test · 04 Monitor */
const STAGES = [
  {label:"ASSESS",  ang:-Math.PI/2},
  {label:"GOVERN",  ang:0},
  {label:"TEST",    ang:Math.PI/2},
  {label:"MONITOR", ang:Math.PI}
];

let W=0, H=0, CX=0, CY=0, RG=144;
let sats=[], pulses=[], waves=[], sparks=[], dust=[], travelers=[];
let coreFlash=0, ringFlash=0, sweep=0, lifeTheta=-Math.PI/2, lifeLap=0;
let running=false, emblemVisible=true;
let stageGlow=[0,0,0,0];

const emblem = document.getElementById("emblem");

function ease(t){ return t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; }
function overlap(a,b){ return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y; }

function exclusionRects(){
  const rects = [];
  document.querySelectorAll(".card,.fw,.brand-foot,.toasts,.right-top").forEach(el=>{
    if (!el.offsetParent) return;
    const r = el.getBoundingClientRect();
    rects.push({x:r.left-16,y:r.top-16,w:r.width+32,h:r.height+32});
  });
  return rects;
}

function measure(){
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W*DPR; canvas.height = H*DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);
  emblemVisible = !!emblem.offsetParent && emblem.offsetWidth > 0;
  if (emblemVisible){
    const er = emblem.getBoundingClientRect();
    CX = er.left + er.width/2;
    CY = er.top  + er.height/2;
    RG = er.width/2 + 42;
  } else {
    CX = W*0.5; CY = H*0.38; RG = 118;
  }
}

function seedAmbient(){
  dust = Array.from({length:34}, ()=>({
    x:Math.random()*W, y:Math.random()*H,
    vx:(Math.random()-.5)*.05, vy:-(.04+Math.random()*.09),
    r:.6+Math.random()*.9, a:.05+Math.random()*.1,
    c:Math.random()<.5?"mint":"blue"
  }));
  travelers = [
    {r:RG+96,  th:Math.random()*Math.PI*2, sp:.0016, c:"blue"},
    {r:RG+184, th:Math.random()*Math.PI*2, sp:-.0011, c:"mint"}
  ];
}

function placeSats(){
  sats = [];
  const rects = exclusionRects();
  const placed = [];
  ctx.font = "10px 'JetBrains Mono', monospace";
  const n = ASSETS.length;
  for (let i=0;i<n;i++){
    const label = ASSETS[i];
    const tw = ctx.measureText(label).width;
    const pillW = tw + 24, pillH = 20;
    let x=CX, y=CY, ok=false;
    for (let tries=0; tries<90 && !ok; tries++){
      const ang = (i/n)*Math.PI*2 + (Math.random()-.5)*.55;
      const rad = RG + 96 + Math.random()*140;
      x = CX + Math.cos(ang)*rad;
      y = CY + Math.sin(ang)*rad*0.9;
      x = Math.min(Math.max(x, 20+pillW/2), W-20-pillW/2);
      y = Math.min(Math.max(y, 86), H-96);
      const rect = {x:x-pillW/2-8, y:y-pillH/2-8, w:pillW+16, h:pillH+16};
      const dC = Math.hypot(x-CX, y-CY);
      ok = dC > RG+64 &&
           !rects.some(r=>overlap(rect,r)) &&
           !placed.some(r=>overlap(rect,r));
      if (ok) placed.push(rect);
    }
    if (!ok) continue;   /* drop rather than overlap — clean beats crowded */

    const left = x < CX;
    const px = x - pillW/2, py = y - pillH/2;
    const ax = left ? px + pillW : px;
    const ay = y;
    const mx=(ax+CX)/2, my=(ay+CY)/2;
    const dx=CX-ax, dy=CY-ay, len=Math.hypot(dx,dy)||1;
    const off=(Math.random()<.5?-1:1)*(16+Math.random()*22);

    sats.push({
      x, y, px, py, pillW, pillH, ax, ay, label,
      cx:mx + (-dy/len)*off, cy:my + (dx/len)*off,
      phase:Math.random()*Math.PI*2,
      col:Math.random()<.5?"mint":"blue"
    });
  }
}

function bez(s,t){
  const u=1-t;
  return {
    x: u*u*s.ax + 2*u*t*s.cx + t*t*CX,
    y: u*u*s.ay + 2*u*t*s.cy + t*t*CY
  };
}

function spawnPulse(){
  if (pulses.length >= 6 || sats.length === 0) return;
  const s = sats[Math.floor(Math.random()*sats.length)];
  const threat = Math.random() < 0.24;
  pulses.push({
    s, t:0,
    dur: 2100 + Math.random()*900,
    born: performance.now(),
    threat,
    col: threat ? "coral" : s.col,
    trail: [],
    dead:false
  });
}

/* ---- widgets ---- */
let checks = 12482;
const checksVal = document.getElementById("checksVal");
let run = 8842, sealsUntilNext = 3;
const runIdEl = document.getElementById("runId");
const wEvidence = document.getElementById("wEvidence");
const toastsEl = document.getElementById("toasts");
const coreMark = document.getElementById("coreMark");

const spark = document.getElementById("spark");
const sctx = spark.getContext("2d");
let sdata = Array.from({length:24}, ()=>3+Math.random()*4);
function drawSpark(){
  const w=spark.width, h=spark.height;
  sctx.clearRect(0,0,w,h);
  const max = Math.max(...sdata)*1.15, stepX = w/(sdata.length-1);
  sctx.beginPath();
  sdata.forEach((v,i)=>{
    const x=i*stepX, y=h-(v/max)*h*0.9-1;
    i===0 ? sctx.moveTo(x,y) : sctx.lineTo(x,y);
  });
  sctx.strokeStyle="rgba("+PALT.mint+",.85)";
  sctx.lineWidth=1.5; sctx.lineJoin="round"; sctx.stroke();
  sctx.lineTo(w,h); sctx.lineTo(0,h); sctx.closePath();
  const g=sctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0,"rgba("+PALT.mint+",.25)"); g.addColorStop(1,"rgba("+PALT.mint+",0)");
  sctx.fillStyle=g; sctx.fill();
}
drawSpark();
if (!reduceMotion){
  setInterval(()=>{ sdata.shift(); sdata.push(3+Math.random()*4); drawSpark(); }, 1500);
}

/* assurance-score gauge (from the site's live risk score concept) */
const gauge = document.getElementById("gauge");
const gctx = gauge.getContext("2d");
const gaugeNum = document.getElementById("gaugeNum");
let gVal = 0, gTarget = 92;
function drawGauge(){
  const w=gauge.width, h=gauge.height, cx=w/2+2, cy=h-4, r=26;
  gctx.clearRect(0,0,w,h);
  const a0 = Math.PI*1.0, a1 = Math.PI*2.0;
  gctx.lineWidth = 5; gctx.lineCap = "round";
  gctx.strokeStyle = PALT.gaugeTrack;
  gctx.beginPath(); gctx.arc(cx,cy,r,a0,a1); gctx.stroke();
  const grad = gctx.createLinearGradient(cx-r,0,cx+r,0);
  grad.addColorStop(0,"rgba("+PALT.blue+",.9)");
  grad.addColorStop(1,"rgba("+PALT.mint+",.95)");
  gctx.strokeStyle = grad;
  gctx.beginPath(); gctx.arc(cx,cy,r,a0,a0+(a1-a0)*(gVal/100)); gctx.stroke();
  gaugeNum.textContent = Math.round(gVal);
}
function gaugeTick(){
  gVal += (gTarget-gVal)*0.06;
  drawGauge();
  if (Math.abs(gTarget-gVal) > .4) requestAnimationFrame(gaugeTick);
  else { gVal = gTarget; drawGauge(); }
}
if (reduceMotion){ gVal = gTarget; drawGauge(); }
else {
  setTimeout(gaugeTick, 900);
  setInterval(()=>{ gTarget = 91 + Math.floor(Math.random()*3); gaugeTick(); }, 6000);
}

function onPass(){
  checks += 1;
  checksVal.textContent = checks.toLocaleString("en-US");
  checksVal.classList.remove("pop"); void checksVal.offsetWidth; checksVal.classList.add("pop");
  sdata[sdata.length-1] += .6; drawSpark();
  coreMark.classList.remove("hit"); void coreMark.getBoundingClientRect(); coreMark.classList.add("hit");
  sealsUntilNext--;
  if (sealsUntilNext <= 0){
    sealsUntilNext = 3 + Math.floor(Math.random()*3);
    run += 1 + Math.floor(Math.random()*3);
    runIdEl.textContent = "run:" + run;
    wEvidence.classList.remove("flash");
    void wEvidence.offsetWidth;
    wEvidence.classList.add("flash");
  }
}
function pushToast(cls, pillText, msg, who){
  if (!toastsEl.offsetParent) return;
  if (toastsEl.children.length >= 3) toastsEl.lastElementChild.remove();
  const el = document.createElement("div");
  el.className = "toast " + cls;
  el.innerHTML = '<span class="pill">'+pillText+'</span><span>'+msg+'</span>'+(who?'<span class="who">'+who+'</span>':'');
  toastsEl.prepend(el);
  setTimeout(()=>{ el.classList.add("gone"); setTimeout(()=>el.remove(), 550); }, 4200);
}
function onBlock(threatName, who){ pushToast("", "BLOCKED", threatName, who); }
function onCycle(){ pushToast("info", "PASS", "monitor.cycle · drift:none", "grounding:ok"); }

function rr(x,y,w,h,r){
  if (ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); }
  else { ctx.beginPath(); ctx.rect(x,y,w,h); }
}

function drawScene(now){
  ctx.clearRect(0,0,W,H);

  /* dust */
  for (const d of dust){
    ctx.fillStyle = "rgba("+PALT[d.c]+","+d.a.toFixed(3)+")";
    ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
  }

  /* orbit guides + travelers */
  ctx.strokeStyle = PALT.gridStroke;
  ctx.lineWidth = 1;
  [RG+96, RG+184].forEach(r=>{
    ctx.beginPath(); ctx.ellipse(CX,CY,r,r*0.9,0,0,Math.PI*2); ctx.stroke();
  });
  for (const tv of travelers){
    const tx = CX + Math.cos(tv.th)*tv.r;
    const ty = CY + Math.sin(tv.th)*tv.r*0.9;
    ctx.fillStyle = "rgba("+PALT[tv.c]+",.16)";
    ctx.beginPath(); ctx.arc(tx,ty,4.8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = "rgba("+PALT[tv.c]+",.55)";
    ctx.beginPath(); ctx.arc(tx,ty,1.9,0,Math.PI*2); ctx.fill();
  }

  /* radar sweep */
  if (!reduceMotion){
    sweep += 0.003;
    const rMax = RG+188;
    const g = ctx.createRadialGradient(CX,CY,RG*0.3,CX,CY,rMax);
    g.addColorStop(0,"rgba("+PALT.mint+",0)");
    g.addColorStop(1,"rgba("+PALT.mint+",.05)");
    ctx.save();
    ctx.translate(CX,CY); ctx.rotate(sweep);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,rMax,0,0.62); ctx.closePath(); ctx.fill();
    const lg = ctx.createLinearGradient(0,0,rMax,0);
    lg.addColorStop(0,"rgba("+PALT.mint+",0)");
    lg.addColorStop(.55,"rgba("+PALT.mint+",.2)");
    lg.addColorStop(1,"rgba("+PALT.mint+",0)");
    ctx.rotate(0.62);
    ctx.strokeStyle = lg; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(RG*0.35,0); ctx.lineTo(rMax,0); ctx.stroke();
    ctx.restore();
  }

  /* connections */
  const active = new Map();
  for (const p of pulses) if (!p.dead) active.set(p.s, p.col);
  ctx.lineWidth = 1;
  for (const s of sats){
    const acol = active.get(s);
    ctx.strokeStyle = acol ? "rgba("+PALT[acol]+",.3)" : PALT.linkFaint;
    ctx.beginPath();
    ctx.moveTo(s.ax,s.ay);
    ctx.quadraticCurveTo(s.cx,s.cy,CX,CY);
    ctx.stroke();
  }

  /* inner faint ring + guardrail + tick dial */
  ctx.strokeStyle = "rgba("+PALT.blue+",.1)";
  ctx.beginPath(); ctx.arc(CX,CY,RG-11,0,Math.PI*2); ctx.stroke();
  ctx.save();
  ctx.setLineDash([4,7]);
  ctx.lineDashOffset = -(now*0.013);
  ctx.strokeStyle = "rgba("+PALT.mint+","+(0.28+ringFlash*0.5)+")";
  ctx.lineWidth = 1 + ringFlash*1.2;
  ctx.beginPath(); ctx.arc(CX,CY,RG,0,Math.PI*2); ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = "rgba("+PALT.mint+",.18)";
  ctx.lineWidth = 1;
  for (let a=0; a<Math.PI*2; a+=Math.PI/12){
    const long = (Math.round(a/(Math.PI/12)) % 6) === 0;
    const r1 = RG+6, r2 = RG + (long?14:9);
    ctx.beginPath();
    ctx.moveTo(CX+Math.cos(a)*r1, CY+Math.sin(a)*r1);
    ctx.lineTo(CX+Math.cos(a)*r2, CY+Math.sin(a)*r2);
    ctx.stroke();
  }
  if (ringFlash>0) ringFlash = Math.max(0, ringFlash-0.03);

  /* ── LIFECYCLE RING — Assess · Govern · Test · Monitor ── */
  ctx.font = "9px 'JetBrains Mono', monospace";
  for (let i=0;i<STAGES.length;i++){
    const st = STAGES[i];
    const sx = CX + Math.cos(st.ang)*RG;
    const sy = CY + Math.sin(st.ang)*RG;
    const glow = stageGlow[i];
    /* diamond station */
    ctx.save();
    ctx.translate(sx,sy); ctx.rotate(Math.PI/4);
    ctx.fillStyle = PALT.stationFill;
    ctx.fillRect(-4.5,-4.5,9,9);
    ctx.strokeStyle = "rgba("+PALT.mint+","+(0.5+glow*0.5).toFixed(3)+")";
    ctx.lineWidth = 1 + glow;
    ctx.strokeRect(-4.5,-4.5,9,9);
    ctx.restore();
    if (glow>0.02){
      ctx.strokeStyle = "rgba("+PALT.mint+","+(glow*0.45).toFixed(3)+")";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(sx,sy,8+(1-glow)*14,0,Math.PI*2); ctx.stroke();
    }
    /* label */
    const lx = CX + Math.cos(st.ang)*(RG+27);
    const ly = CY + Math.sin(st.ang)*(RG+27);
    ctx.fillStyle = "rgba("+PALT.label+","+(0.4+glow*0.5).toFixed(3)+")";
    if (Math.abs(Math.cos(st.ang)) < 0.3){
      ctx.textAlign = "center";
      ctx.fillText(st.label, lx, ly + (Math.sin(st.ang)>0 ? 8 : -3));
    } else {
      ctx.textAlign = Math.cos(st.ang) > 0 ? "left" : "right";
      ctx.fillText(st.label, lx + (Math.cos(st.ang)>0?2:-2), ly+3);
    }
    stageGlow[i] = Math.max(0, glow-0.015);
  }
  /* lifecycle tracer */
  const ltx = CX + Math.cos(lifeTheta)*RG;
  const lty = CY + Math.sin(lifeTheta)*RG;
  ctx.fillStyle = "rgba("+PALT.mint+",.2)";
  ctx.beginPath(); ctx.arc(ltx,lty,6.4,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "rgba("+PALT.mint+",.95)";
  ctx.beginPath(); ctx.arc(ltx,lty,2.6,0,Math.PI*2); ctx.fill();

  /* asset pills */
  ctx.font = "10px 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  for (const s of sats){
    const blinkA = 0.55 + Math.sin(now*0.002 + s.phase)*0.3;
    ctx.fillStyle = PALT.pillFill;
    rr(s.px, s.py, s.pillW, s.pillH, 10); ctx.fill();
    ctx.strokeStyle = "rgba("+PALT[s.col]+",.28)";
    ctx.lineWidth = 1;
    rr(s.px+.5, s.py+.5, s.pillW-1, s.pillH-1, 10); ctx.stroke();
    ctx.fillStyle = "rgba("+PALT[s.col]+","+(blinkA*0.22).toFixed(3)+")";
    ctx.beginPath(); ctx.arc(s.px+10, s.y, 5.4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "rgba("+PALT[s.col]+","+blinkA.toFixed(3)+")";
    ctx.beginPath(); ctx.arc(s.px+10, s.y, 2.4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = PALT.pillText;
    ctx.fillText(s.label, s.px+17, s.y+3.5);
  }

  /* comet packets */
  for (const p of pulses){
    if (p.dead) continue;
    if (p.trail.length>1){
      for (let i=1;i<p.trail.length;i++){
        const a = (i/p.trail.length)*0.5;
        ctx.strokeStyle = "rgba("+PALT[p.col]+","+a.toFixed(3)+")";
        ctx.lineWidth = 1 + (i/p.trail.length)*1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
        ctx.lineTo(p.trail[i].x, p.trail[i].y);
        ctx.stroke();
      }
    }
    const pos = bez(p.s, ease(p.t));
    ctx.fillStyle = "rgba("+PALT[p.col]+",.2)";
    ctx.beginPath(); ctx.arc(pos.x,pos.y,6.6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = "rgba("+PALT[p.col]+",.95)";
    ctx.beginPath(); ctx.arc(pos.x,pos.y,2.7,0,Math.PI*2); ctx.fill();
  }

  /* shockwaves + spark bursts */
  for (const w of waves){
    ctx.strokeStyle = "rgba("+PALT[w.col]+","+w.a.toFixed(3)+")";
    ctx.lineWidth = w.lw;
    ctx.beginPath(); ctx.arc(w.x,w.y,w.r,0,Math.PI*2); ctx.stroke();
  }
  for (const sp of sparks){
    ctx.fillStyle = "rgba("+PALT[sp.c]+","+sp.a.toFixed(3)+")";
    ctx.beginPath(); ctx.arc(sp.x,sp.y,1.5,0,Math.PI*2); ctx.fill();
  }

  /* core flash */
  if (coreFlash>0){
    ctx.fillStyle = "rgba("+PALT.mint+","+(coreFlash*0.26).toFixed(3)+")";
    ctx.beginPath(); ctx.arc(CX,CY,RG*0.5,0,Math.PI*2); ctx.fill();
  }
}

function step(now){
  /* ambient */
  for (const d of dust){
    d.x += d.vx; d.y += d.vy;
    if (d.y < -4){ d.y = H+4; d.x = Math.random()*W; }
    if (d.x < -4) d.x = W+4; if (d.x > W+4) d.x = -4;
  }
  for (const tv of travelers) tv.th += tv.sp;

  /* lifecycle tracer + station pings */
  const prevTheta = lifeTheta;
  lifeTheta += 0.004;
  for (let i=0;i<STAGES.length;i++){
    const a = STAGES[i].ang;
    const before = ((prevTheta - a) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
    const after  = ((lifeTheta - a) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
    if (after < before) stageGlow[i] = 1;
  }
  if (lifeTheta - (-Math.PI/2) >= Math.PI*2*(lifeLap+1)){
    lifeLap++;
    onCycle();
  }

  for (const p of pulses){
    if (p.dead) continue;
    p.t = Math.min(1, (now - p.born)/p.dur);
    const pos = bez(p.s, ease(p.t));
    p.trail.push(pos);
    if (p.trail.length>8) p.trail.shift();

    const d = Math.hypot(pos.x-CX, pos.y-CY);
    if (p.threat && d <= RG){
      p.dead = true;
      ringFlash = 1;
      waves.push({x:pos.x,y:pos.y,r:3,a:.8,lw:1.6,col:"coral"});
      waves.push({x:pos.x,y:pos.y,r:1,a:.5,lw:1,col:"coral"});
      for (let k=0;k<6;k++){
        const a = Math.random()*Math.PI*2, v = 1+Math.random()*1.6;
        sparks.push({x:pos.x,y:pos.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,a:.8,c:"coral"});
      }
      onBlock(THREATS[Math.floor(Math.random()*THREATS.length)], p.s.label.split(":")[0]);
    } else if (p.t >= 1){
      p.dead = true;
      coreFlash = 1;
      onPass();
    }
  }
  pulses = pulses.filter(p=>!p.dead);
  for (const w of waves){ w.r += (w.lw>1.3?1.7:2.6); w.a -= 0.02; }
  waves = waves.filter(w=>w.a>0);
  for (const sp of sparks){ sp.x+=sp.vx; sp.y+=sp.vy; sp.vx*=.96; sp.vy*=.96; sp.a-=.03; }
  sparks = sparks.filter(sp=>sp.a>0);
  if (coreFlash>0) coreFlash = Math.max(0, coreFlash-0.035);

  drawScene(now);
  if (running) requestAnimationFrame(step);
}

function schedule(){
  spawnPulse();
  setTimeout(schedule, 620 + Math.random()*650);
}
/* ── Auto-fit: if the layout is taller than the window, scale it down
      proportionally so the whole page always fits with zero scrolling. ── */
function fitViewport(){
  const layout = document.querySelector(".layout");
  if (!layout) return;
  layout.style.zoom = "";
  const need = layout.scrollHeight;
  const have = window.innerHeight;
  if (need > have && "zoom" in layout.style){
    layout.style.zoom = Math.max(0.78, have/need).toFixed(3);
  }
}
function sceneReflow(){
  fitViewport();
  measure(); seedAmbient(); placeSats(); pulses = [];
  if (reduceMotion) drawScene(performance.now());
}
function start(){
  fitViewport();
  measure(); seedAmbient(); placeSats();
  if (reduceMotion){ drawScene(performance.now()); return; }
  running = true;
  requestAnimationFrame(step);
  schedule();
}
window.addEventListener("resize", sceneReflow);
if (document.fonts && document.fonts.ready){
  document.fonts.ready.then(start);
} else { start(); }

/* ═══════════════ Typing claims — original site copy ═══════════════ */
const CLAIMS = [
  "Know what your AI did, and govern it.",
  "Discovery, live enforcement and audit-ready evidence.",
  "Teams ship an agent in an afternoon. Tahara notices, then brings it into scope.",
  "One stream serves the block decision and the evidence record.",
  "Change the model, keep the guardrail and the history that proves it."
];
if (!reduceMotion){
  const claim = document.getElementById("claim");
  claim.innerHTML = '<span id="claimTxt"></span><span class="cur"></span>';
  const ct = document.getElementById("claimTxt");
  let ci=0, ch=0, del=false;
  (function typeClaim(){
    const line = CLAIMS[ci];
    if (!del){
      ch++;
      ct.textContent = line.slice(0,ch);
      if (ch === line.length){ del = true; setTimeout(typeClaim, 2600); return; }
      setTimeout(typeClaim, 26 + Math.random()*32);
    } else {
      ch -= 3;
      if (ch <= 0){ ch = 0; del = false; ci = (ci+1)%CLAIMS.length; }
      ct.textContent = line.slice(0, Math.max(0,ch));
      setTimeout(typeClaim, 12);
    }
  })();
}

/* ═══════════════ Restore language ═══════════════ */
try {
  const saved = localStorage.getItem("tahara-lang");
  if (saved && STRINGS[saved]) applyLang(saved);
} catch(e){}


  return function dispose(){
    disposed = true;
    running = false;
    _timeouts.forEach(id => window.clearTimeout(id));
    _intervals.forEach(id => window.clearInterval(id));
    window.removeEventListener("resize", sceneReflow);
  };
}
