"use client";

/* Runtime for the Tahara platform pages, lifted unchanged from the reviewed
   HTML build. Everything runs inside run(), so it executes on mount when the
   markup is in the DOM, exactly as it did on page load. Each init returns a
   dispose function that unwinds its observers and listeners. */

export function run(which){

/* Ported 1:1 from the shipped HTML login page.
   Runs once on mount (called from app/page.js); returns a dispose fn. */
const loginRequest = async function(){ return {}; };
  
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

function initLogin(){
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
    const result = await loginRequest(
      document.getElementById("email").value.trim(),
      pwInput.value,
      document.getElementById("remember").checked
    );
    ok = result.ok;
    data = result.data;
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

/* Ported from tahara-overview-redesign-v27.html (approved design file). */
function initOverview(){
  const _ios = [];
  const _winHandlers = [];
  const _docHandlers = [];
  const _origIO = window.IntersectionObserver;
  const _trackedIO = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  window.IntersectionObserver = _trackedIO;
  const _origAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origAdd(t, fn, o); };
  const _origDocAdd = document.addEventListener.bind(document);
  document.addEventListener = function(t, fn, o){ _docHandlers.push([t, fn, o]); return _origDocAdd(t, fn, o); };
  try{

  document.querySelectorAll(".ovx img").forEach(function(img){
    function fb(){ img.style.display="none"; var f=img.nextElementSibling; if (f && f.tagName.toLowerCase()==="svg") f.style.display="block"; }
    img.addEventListener("error", fb);
    if (img.complete && img.naturalWidth === 0) fb();
  });

(function(){
  var root = document.getElementById('thr');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  var tb = document.getElementById('themeBtn');
  function setTheme(t){ root.setAttribute('data-theme', t); try{ localStorage.setItem('tahara-theme', t); }catch(e){} }
  tb.addEventListener('click', function(){ setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
  try{ var s0 = localStorage.getItem('tahara-theme'); if(s0) setTheme(s0); }catch(e){}

  /* language */
  var AR = {
    n1:'نظرة عامة', n2:'الحوكمة', n3:'الأُطر', n4:'الاستكشاف', n5:'الاختبار العدائي', n6:'حواجز الحماية',
    cta:'ابدأ التقييم', so:'تسجيل الخروج',
    kick0:'ضمان مستمر للذكاء الاصطناعي',
    h1a:'الثقة لا تُعلَن.', h1b:'بل', h1c:'تُثبَت.',
    lede:'نربط نظامك بالأطر التي تلزمه، ثم نواصل المراقبة. يوم يتوقف ضابط عن العمل، تعرف أنت. لا المدقق.',
    cta1:'ابدأ التقييم', cta2:'كيف تعمل المنصة',
    kick1:'كيف تعمل', h21:'أربع حركات. حلقة واحدة متصلة.',
    kick2:'الوضع العام', h22:'وضع واحد. يُقاس باستمرار.',
    sub2:'أرقام حية من الأسطح الأربعة.',
    m1t:'استيعاب', m1p:'ارفع ما لديك. يستخرج المحرك الحقائق التي يحتاجها الإطار فقط، ويوثّق الصفحة.',
    m2t:'مقابلة', m2p:'محاوِر بمستوى المدقق يسأل عمّا لم تقله الوثائق. ويتابع.',
    m3t:'استكشاف', m3p:'مُجمّع للقراءة فقط داخل نطاقك يراقب ما يفعله نظامك فعلًا.',
    m4t:'ضمان', m4p:'تقييم الفجوة وبيان القابلية ومصفوفة المخاطر. ثم تبقى الحلقة مفتوحة، والانحراف يرفع إنذارًا.',
    pb1:'المشكلة: لا يمكنك حوكمة ما لا تراه',
    h31:'اعثر على كل نظام ذكاء اصطناعي، معتمدًا كان أو لا',
    p1:'مُجمّع للقراءة فقط يعمل داخل نطاقك وبصلاحياتك، ويكشف كل نظام ذكاء اصطناعي قيد الاستخدام خلال يوم. بما فيها ما لم يعتمده أحد.',
    pb2:'المشكلة: اختبار الاختراق السنوي متقادم أصلًا',
    h32:'هاجم نظامك قبل أن يفعلها غيرك',
    p2:'تعمل قائمة OWASP لأهم عشرة مخاطر على بيئة التجهيز وفق جدول متكرر. أي تراجع يظهر في الدورة التالية لا في العام التالي.',
    pb3:'المشكلة: الوثيقة ليست إثباتًا',
    h33:'اربط كل نظام بالقانون الذي ينطبق عليه',
    p3:'كل متطلب يُفحص على نظامك الحي، ولا يُعلَّم مطابقًا إلا حين يؤكده شخص مسمّى رسميًا.',
    pb4:'المشكلة: التسريب يسبق المراجعة',
    h34:'التقط التسريب قبل أن يبلغ النموذج',
    p4:'كل طلب يُفحص قبل وصوله إلى النموذج. تقنيع أو حجب، بالإنجليزية والأردية اللاتينية، والنادر الذي يمر يُسجَّل.',
    pbm:'المشكلة: لا مصدر واحدًا يمكن الوثوق به',
    h3m:'لا نثق بمصدر واحد أبدًا.',
    pm:'الملاحظة هي الفارق بين ما تعتقده وما كتبته وما يفعله نظامك.'
  };
  var EN = {};
  document.querySelectorAll('[data-i]').forEach(function(el){ EN[el.getAttribute('data-i')] = el.textContent; });
  var enBtn = document.getElementById('enBtn'), arBtn = document.getElementById('arBtn');
  function setLang(l){
    var d = (l === 'ar') ? AR : EN;
    document.querySelectorAll('[data-i]').forEach(function(el){
      var k = el.getAttribute('data-i'); if(d[k]) el.textContent = d[k];
    });
    root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', l);
    enBtn.classList.toggle('on', l === 'en'); arBtn.classList.toggle('on', l === 'ar');
    try{ localStorage.setItem('tahara-lang', l); }catch(e){}
  }
  enBtn.addEventListener('click', function(){ setLang('en'); });
  arBtn.addEventListener('click', function(){ setLang('ar'); });
  try{ if(localStorage.getItem('tahara-lang') === 'ar') setLang('ar'); }catch(e){}

  /* movements, scroll-driven sequence */
  var stage = document.getElementById('mvstage'),
      mvs = Array.prototype.slice.call(document.querySelectorAll('#mvgrid .mv')),
      nds = Array.prototype.slice.call(document.querySelectorAll('#loopnodes .nd')),
      ndts = Array.prototype.slice.call(document.querySelectorAll('#loopnodes .ndt')),
      loopdraw = document.getElementById('loopdraw'),
      loopLen = 0, mvMode = 'pin';

  function mvSetup(){
    var clipOK = (window.CSS && CSS.supports && CSS.supports('overflow-x','clip'));
    if(reduce){ mvMode = 'static'; }
    else if(window.innerWidth <= 1060 || window.innerHeight <= 640 || !clipOK){ mvMode = 'flow'; }
    else { mvMode = 'pin'; }
    stage.classList.toggle('flat', mvMode !== 'pin');
    if(loopdraw && !loopLen){
      loopLen = loopdraw.getTotalLength();
      loopdraw.style.strokeDasharray = loopLen;
      loopdraw.style.strokeDashoffset = loopLen;
    }
    if(mvMode === 'static'){
      mvGrid.classList.add('ready');
      mvs.forEach(function(m){ m.style.transitionDelay = ''; m.classList.add('done'); m.classList.remove('act'); });
      nds.forEach(function(n){ n.classList.add('on'); });
      ndts.forEach(function(n){ n.classList.add('on'); });
      if(loopdraw) loopdraw.style.strokeDashoffset = 0;
    }
  }

  var FRAC = [0.001, 0.3330, 0.6670, 1],
      GATE = [0, 0.27, 0.52, 0.77],
      mvGrid = document.getElementById('mvgrid');

  function mvReveal(){
    if(mvGrid.classList.contains('ready')) return;
    mvs.forEach(function(m, i){ m.style.transitionDelay = (reduce ? 0 : i * .09) + 's'; });
    mvGrid.classList.add('ready');
    setTimeout(function(){ mvs.forEach(function(m){ m.style.transitionDelay = ''; }); }, 1000);
  }

  function mvScroll(){
    if(mvMode === 'static') return;
    var r = stage.getBoundingClientRect(),
        vh = window.innerHeight, p;
    if(mvMode === 'pin'){
      var total = stage.offsetHeight - vh;
      if(total <= 0) return;
      p = Math.min(1, Math.max(0, -r.top / total));
    } else {
      var travelled = vh * 0.88 - r.top,
          span = r.height + vh * 0.5;
      p = Math.min(1, Math.max(0, travelled / span));
    }
    var step = 0, i;
    for(i = 1; i < 4; i++){ if(p >= GATE[i]) step = i; }
    mvs.forEach(function(m, idx){
      m.classList.toggle('act', idx === step);
      m.classList.toggle('done', idx < step);
    });
    nds.forEach(function(n, idx){ n.classList.toggle('on', idx <= step); });
    ndts.forEach(function(n, idx){ n.classList.toggle('on', idx <= step); });
    var frac = FRAC[step];
    if(loopdraw) loopdraw.style.strokeDashoffset = loopLen * (1 - frac);
  }

  var mvTick = false;
  function onScroll(){
    if(mvTick) return;
    mvTick = true;
    requestAnimationFrame(function(){ mvScroll(); mvTick = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function(){ mvSetup(); mvScroll(); });
  mvSetup(); mvScroll();

  /* counters and sparklines */
  function countUp(el){
    var to = parseFloat(el.getAttribute('data-to')) || 0,
        dec = +(el.getAttribute('data-dec') || 0),
        t0 = null, dur = 950;
    function fmt(v){ return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US'); }
    if(reduce){ el.textContent = fmt(to); return; }
    function step(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function drawSpark(path){
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect();
    path.style.transition = reduce ? 'none' : 'stroke-dashoffset 1.1s cubic-bezier(.2,.7,.2,1) .25s';
    path.style.strokeDashoffset = 0;
  }

  /* feature orchestration */
  function play(sec){
    sec.classList.add('live');
    function d(el, t){ el.style.transitionDelay = (reduce ? 0 : t) + 's'; }
    sec.querySelectorAll('.si').forEach(function(el, i){ d(el, .18 + i * .04); });
    sec.querySelectorAll('.kc').forEach(function(el, i){ d(el, .3 + i * .09); });
    sec.querySelectorAll('.pcard').forEach(function(el, i){ d(el, .34 + i * .1); });
    sec.querySelectorAll('.crit,.filts').forEach(function(el){ d(el, .46); });
    sec.querySelectorAll('.lnr,.oc,.lg,.cbar,.cat').forEach(function(el, i){ d(el, .5 + i * .055); });
    sec.querySelectorAll('.drow,.dsep').forEach(function(el, i){ d(el, .4 + i * .24); });
    setTimeout(function(){
      sec.querySelectorAll('.num').forEach(countUp);
      sec.querySelectorAll('.spk path').forEach(drawSpark);
      sec.querySelectorAll('.stack i,.cat .track i').forEach(function(el){
        var w = el.getAttribute('data-w') || 0;
        requestAnimationFrame(function(){ el.style.width = w + '%'; });
      });
    }, reduce ? 0 : 420);
  }

  /* posture data layer */
  function playPosture(sec){
    sec.classList.add('live');
    sec.querySelectorAll('.pc').forEach(function(el, i){
      el.style.transitionDelay = (reduce ? 0 : .06 + i * .1) + 's';
    });
    var line = document.getElementById('pline');
    if(line){
      var len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.getBoundingClientRect();
      line.style.transition = reduce ? 'none' : 'stroke-dashoffset 1.5s cubic-bezier(.3,.2,.2,1) .3s';
      line.style.strokeDashoffset = 0;
    }
    var arc = document.getElementById('darc');
    if(arc){
      if(reduce){ arc.style.transition = 'none'; }
      requestAnimationFrame(function(){ arc.style.strokeDasharray = '32.6 67.4'; });
    }
    setTimeout(function(){
      sec.querySelectorAll('.num').forEach(countUp);
      sec.querySelectorAll('.htrack i,.gtrack i').forEach(function(el){
        var w = el.getAttribute('data-w') || 0;
        requestAnimationFrame(function(){ el.style.width = w + '%'; });
      });
    }, reduce ? 0 : 420);
  }

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var t = e.target;
      if(t.id === 'mvgrid'){ mvReveal(); return; }
      if(t.id === 'posture'){ playPosture(t); return; }
      if(t.classList.contains('feat')) play(t);
      else t.classList.add('in');
      io.unobserve(t);
    });
  }, { threshold:.2, rootMargin:'0px 0px -60px 0px' });
  document.querySelectorAll('.feat,.rv,#mvgrid,#posture').forEach(function(el){ io.observe(el); });

  /* posture detail modals */
  var DET={
    leak:{t:'Data leak detail', b:
      '<div class="mrow"><span class="k">Finding</span><span class="val mono">FND-0141</span></div>'+
      '<div class="mrow"><span class="k">Vector</span><span class="val">Retrieval path</span></div>'+
      '<div class="mrow"><span class="k">Severity</span><span class="val rd">Major</span></div>'+
      '<div class="mrow"><span class="k">Detected</span><span class="val">2m ago</span></div>'+
      '<div class="mrow"><span class="k">Status</span><span class="val">Contained</span></div>'+
      '<p class="mnote">A sensitive value surfaced through a retrieval path before masking. The response was blocked and the record flagged for review.</p>'},
    controls:{t:'Controls overview', b:
      '<div class="mrow"><span class="k">Passing</span><span class="val bl">61</span></div>'+
      '<div class="mrow"><span class="k">Minor</span><span class="val am">7</span></div>'+
      '<div class="mrow"><span class="k">Major</span><span class="val rd">3</span></div>'+
      '<div class="mrow"><span class="k">Tracked</span><span class="val">187</span></div>'+
      '<p class="mnote">Minor items need review. Major items are out of policy and blocking. The full register lives in the Governance workspace.</p>'},
    cats:{t:'Attack categories', b:
      '<div class="mrow"><span class="k">Passing</span><span class="val bl">5</span></div>'+
      '<div class="mrow"><span class="k">Degraded</span><span class="val am">3</span></div>'+
      '<div class="mrow"><span class="k">Failing</span><span class="val rd">2</span></div>'+
      '<div class="mtags"><i>PROMPT INJECTION</i><i>JAILBREAK</i><i>DATA EXFILTRATION</i><i>PII LEAKAGE</i><i>MODEL ABUSE</i><i class="more">+5 MORE</i></div>'+
      '<p class="mnote">10 categories run every cycle. Passing categories held; degraded and failing need attention.</p>'}
  };
  (function(){
    var modal=document.getElementById('modal'); if(!modal) return;
    var mTitle=document.getElementById('mTitle'),mBody=document.getElementById('mBody'),lastFocus=null;
    function openModal(k){var d=DET[k];if(!d)return;mTitle.textContent=d.t;mBody.innerHTML=d.b;lastFocus=document.activeElement;modal.hidden=false;var x=modal.querySelector('.mx');if(x)x.focus();}
    function closeModal(){modal.hidden=true;if(lastFocus&&lastFocus.focus)lastFocus.focus();}
    document.querySelectorAll('[data-modal]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();openModal(a.getAttribute('data-modal'));});});
    modal.querySelectorAll('[data-close]').forEach(function(x){x.addEventListener('click',closeModal);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)closeModal();});
  })();
})();

(function(){
  var root=document.documentElement,
      safe={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}},
      reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function start(){
    var hxr=document.getElementById('hero'); if(hxr) hxr.classList.add('hx-ready');
    document.querySelectorAll('.hx-seg').forEach(function(s){s.style.width=s.getAttribute('data-w')});
    document.querySelectorAll('.hx-rf').forEach(function(r){r.style.strokeDashoffset=r.getAttribute('data-off')});
    document.querySelectorAll('.hx-count').forEach(function(el){
      var to=parseInt(el.getAttribute('data-count'),10);
      if(reduce){el.textContent=to;return}
      var t0=null,dur=1200;
      function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
        el.textContent=Math.round(e*to);if(p<1)requestAnimationFrame(step)}
      setTimeout(function(){requestAnimationFrame(step)},600);
    });
  }
  requestAnimationFrame(function(){requestAnimationFrame(start)});

  var STR={
    en:{kicker:"Continuous AI assurance",h1a:"Trust is not declared.",h1b:"It is ",h1g:"demonstrated.",
        lede:'<span class="ll">We map your system against the frameworks that bind it, then <strong>keep watching</strong>. </span><span class="ll">The day a control stops operating, you find out. Not the auditor.</span>',
        cta1:'Start an assessment <span class="a">&rarr;</span>',cta2:"See how it works",ctaNav:"Start assessment",signout:"Sign out",
        wt:"Assurance posture",wb:"Start assessment",tb1:"Controls",tb2:"Findings",tb3:"Evidence",
        m1:"Assessment progress",m2:"Findings by severity",gl:"Scored",s1:"Low",s2:"Medium",s3:"High",s4:"Critical",
        c_ok:"Operating",c_ok2:"Operating",c_rev:"Needs review",
        fc:"WORKFLOWS /",ft:"Re-verification for AI controls",fm1:"Active",fm2:"Owner · Cyber team",fm3:"Runs daily",
        fn1l:"Start",fn2l:"Trigger",fn2v:"Control readiness changed",
        fa1l:"Create task",fa1v:"Evidence linked",fa2l:"Notify",fa2v:"Control owners",fa3l:"Webhook",
        tt:"Evidence verified",ts:"AIA 9.2 · just now"},
    ar:{kicker:"ضمان الذكاء الاصطناعي المستمر",h1a:"الثقة لا تُعلَن.",h1b:"بل ",h1g:"تُثبَت.",
        lede:'<span class="ll">نُطابق نظامك مع الأطر التي تحكمه، ثم <strong>نواصل المراقبة</strong>. </span><span class="ll">يوم يتوقف أحد الضوابط عن العمل، تعرف أنت. لا المدقق.</span>',
        cta1:'ابدأ التقييم <span class="a">&larr;</span>',cta2:"شاهد كيف يعمل",ctaNav:"ابدأ التقييم",signout:"تسجيل الخروج",
        wt:"وضعية الضمان",wb:"ابدأ التقييم",tb1:"الضوابط",tb2:"النتائج",tb3:"الأدلة",
        m1:"تقدم التقييم",m2:"النتائج حسب الخطورة",gl:"مُقيَّم",s1:"منخفض",s2:"متوسط",s3:"مرتفع",s4:"حرج",
        c_ok:"يعمل",c_ok2:"يعمل",c_rev:"يتطلب مراجعة",
        fc:"مسارات العمل /",ft:"إعادة التحقق لضوابط الذكاء الاصطناعي",fm1:"نشط",fm2:"المالك · فريق الأمن",fm3:"يعمل يومياً",
        fn1l:"البداية",fn2l:"المحفّز",fn2v:"تغيّرت جاهزية الضابط",
        fa1l:"إنشاء مهمة",fa1v:"الدليل مرتبط",fa2l:"إشعار",fa2v:"مالكو الضوابط",fa3l:"Webhook",
        tt:"تم التحقق من الدليل",ts:"AIA 9.2 · الآن"}
  };
  var NAV={Overview:"نظرة عامة",Governance:"الحوكمة",Frameworks:"الأُطر",Discovery:"الاكتشاف",Guardrails:"حواجز الحماية"};
  function setLang(l){
    root.setAttribute('data-lang',l);root.setAttribute('lang',l);var t=STR[l];
    document.querySelectorAll('[data-t]').forEach(function(e){var k=e.getAttribute('data-t');if(t[k]!=null)e.innerHTML=t[k]});
    var cp=document.querySelector('.hx-copy'); if(cp) cp.setAttribute('dir',l==='ar'?'rtl':'ltr');
    safe.set('tahara-lang',l);
  }
  var enB=document.getElementById('enBtn'), arB=document.getElementById('arBtn');
  if(enB) enB.addEventListener('click',function(){setLang('en')});
  if(arB) arB.addEventListener('click',function(){setLang('ar')});
  setLang(safe.get('tahara-lang')||'en');
})();

  } finally {
    window.IntersectionObserver = _origIO;
    window.addEventListener = _origAdd;
    document.addEventListener = _origDocAdd;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
    _docHandlers.forEach(function(h){ document.removeEventListener(h[0], h[1], h[2]); });
  };
}

/* Ported from the approved design file. */
function initGovernance(){
  const _ios = [];
  const _winHandlers = [];
  const _origIO = window.IntersectionObserver;
  const _trackedIO = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  window.IntersectionObserver = _trackedIO;
  const _origAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origAdd(t, fn, o); };
  try{

  document.querySelectorAll(".gvx img").forEach(function(img){
    function fb(){ img.style.display="none"; var f=img.nextElementSibling; if (f && f.tagName.toLowerCase()==="svg") f.style.display="block"; }
    img.addEventListener("error", fb);
    if (img.complete && img.naturalWidth === 0) fb();
  });

/* ═══ reveal + nav + theme ═══ */
(function(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.15});
  document.querySelectorAll("[data-rv]").forEach(function(el){ io.observe(el); });
  var nav = document.querySelector(".nav");
  window.addEventListener("scroll", function(){
    nav.classList.toggle("scrolled", window.scrollY > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.style.setProperty("--sp", max > 0 ? Math.min(1, window.scrollY / max) : 0);
  }, {passive:true});
  document.querySelectorAll("img").forEach(function(img){
    img.addEventListener("error", function(){
      img.style.display = "none";
      var fb = img.nextElementSibling;
      if (fb && fb.tagName.toLowerCase() === "svg") fb.style.display = "block";
    });
  });
  var btn = document.getElementById("themeTg");
  try{ var _s = localStorage.getItem("tahara-theme"); if (_s) document.documentElement.dataset.theme = _s; }catch(e){}
  btn.addEventListener("click", function(){
    var t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    try{ localStorage.setItem("tahara-theme", t); }catch(e){}
  });
})();

/* ═══ seals ═══ */

/* ═══ wizard state ═══ */
var MODE = "master";      /* master | single */
var LANG = "en";
var sel = [];             /* [{name,q,req}] */
var CORE = ["EU AI ACT","ISO/IEC 42001","ISO/IEC 23894","NIST AI RMF"];

function $(id){ return document.getElementById(id); }
function rows(){ return Array.prototype.slice.call(document.querySelectorAll(".fw")); }

function go(n){
  ["p1","p2","pReach","pSent","pVerify","p3"].forEach(function(id){ $(id).classList.remove("on"); });
  $(n).classList.add("on");
  var map = {p1:1,p2:2,pReach:2,pSent:2,p3:3};
  var st = map[n];
  [1,2,3].forEach(function(i){
    var el = $("s"+i);
    el.classList.toggle("on", i===st);
    el.classList.toggle("done", i<st);
  });
  document.querySelector(".steps").style.setProperty("--pw", st===1 ? "0%" : st===2 ? "50%" : "100%");

  window.scrollTo({top:0,behavior:"smooth"});
}

/* step 1 doors */
(function(){
  var m = $("dMaster"), s = $("dSingle");
  m.addEventListener("click", function(){ MODE="master"; m.classList.add("sel"); s.classList.remove("sel"); });

  s.addEventListener("click", function(){ MODE="single"; s.classList.add("sel"); m.classList.remove("sel"); });
  $("contBtn").addEventListener("click", function(){
    /* prepare step 2 for the mode */
    rows().forEach(function(r){ r.classList.remove("sel"); });
    sel = []; VERIFIED = false; VERIFIED_EMAIL = "";
    if (MODE === "master"){
      rows().forEach(function(r){
        if (CORE.indexOf(r.dataset.fw) !== -1) r.classList.add("sel");
      });
    }
    if (MODE === "single"){
      $("rfForm").style.display = "";
      $("rfDone").style.display = "none";
      $("reachPlate").classList.remove("done");
      go("pReach");
      return;
    }
    syncSel();
    applyModeText();
    go("p2");
  });
})();

/* tabs */
(function(){
  $("tabIntl").addEventListener("click", function(){
    this.classList.add("on"); $("tabReg").classList.remove("on");
    $("tIntl").style.display=""; $("tReg").style.display="none";
  });
  $("tabReg").addEventListener("click", function(){
    this.classList.add("on"); $("tabIntl").classList.remove("on");
    $("tReg").style.display=""; $("tIntl").style.display="none";
  });
})();

/* selection */
rows().forEach(function(r){
  r.addEventListener("click", function(e){
    if (e.target.classList && e.target.classList.contains("peek")) return;
    if (MODE === "single"){
      var was = r.classList.contains("sel");
      rows().forEach(function(x){ x.classList.remove("sel"); });
      if (!was) r.classList.add("sel");
    } else {
      r.classList.toggle("sel");
    }
    syncSel();
  });
});

function syncSel(){
  sel = rows().filter(function(r){ return r.classList.contains("sel"); })
              .map(function(r){ return {name:r.dataset.fw, q:parseInt(r.dataset.q,10)||10, req:r.classList.contains("req")}; });
  renderDash(); renderBasket(); renderReq();
}

/* dashboard math: overlap grows with set size */
function calc(){
  var n = sel.length;
  var raw = sel.reduce(function(a,f){ return a+f.q; },0);
  var overlap = n > 1 ? Math.min(.42, .14*(n-1)) : 0;
  var asked = Math.round(raw*(1-overlap));
  return {n:n, raw:raw, asked:asked, sav:Math.round(overlap*100), min:Math.round(asked*0.55/5)*5};
}
function animN(el, to, suf){
  var from = parseInt(el.dataset.v||"0",10);
  el.dataset.v = to;
  var t0 = null;
  function stp(ts){
    if (!t0) t0 = ts;
    var p = Math.min(1,(ts-t0)/500);
    el.textContent = Math.round(from+(to-from)*(1-Math.pow(1-p,3))) + (suf||"");
    if (p<1) requestAnimationFrame(stp);
  }
  requestAnimationFrame(stp);
}
function renderDash(){
  var c = calc();
  $("fwCount").textContent = c.n;
  animN($("donutN"), c.sav, "%");
  $("donutVal").style.strokeDashoffset = 264 - 264*(c.sav/100);
  animN($("qN"), c.asked);
  $("qRaw").textContent = c.raw>c.asked ? "/ "+c.raw : "";
  animN($("tN"), c.min);
  $("savPct").textContent = "~"+c.sav+"%";
  $("savBar").style.width = c.sav+"%";
  var gatedNow = MODE === "single" && sel.length > 0 && !VERIFIED;
  $("goBtn").setAttribute("aria-disabled", (c.n>0 && !gatedNow) ? "false" : "true");
  $("goHelp").style.display = (gatedNow && c.n>0) ? "block" : "none";
}
function renderBasket(){
  var bk = $("basket");
  if (!sel.length){
    bk.innerHTML = '<p class="empty">'+(I18N[LANG].bkEmpty)+'</p>';
    return;
  }
  bk.innerHTML = sel.map(function(f){
    return '<span class="bi">'+f.name+'<u data-rm="'+f.name+'">\u2715</u></span>';
  }).join("");
  bk.querySelectorAll("u").forEach(function(u){
    u.addEventListener("click", function(ev){
      ev.stopPropagation();
      rows().forEach(function(r){ if (r.dataset.fw === u.dataset.rm) r.classList.remove("sel"); });
      syncSel();
    });
  });
}
var VERIFIED = false, VERIFIED_EMAIL = "";
function renderReq(){
  var hasReq = sel.some(function(f){ return f.req; });
  $("reqWrap").classList.toggle("on", hasReq);
  renderVer();
}
function renderVer(){
  var needsVer = MODE === "single" && sel.length > 0;
  if (!needsVer) VERIFIED = false;
  $("verWrap").classList.toggle("on", needsVer && !VERIFIED);
  var c = calc();
  var gated = needsVer && !VERIFIED;
  $("goBtn").setAttribute("aria-disabled", (c.n>0 && !gated) ? "false" : "true");
  $("goHelp").style.display = (gated && c.n>0) ? "block" : "none";
}

/* request flow */
var verTimer = null;
$("verBtn").addEventListener("click", function(){
  var em = $("verEm").value.trim();
  if (!em || em.indexOf("@") < 1){ $("verEm").focus(); return; }
  VERIFIED_EMAIL = em;
  $("verEmOut").textContent = em;
  $("verHeadline").setAttribute("data-i18n","verHeadPending");
  $("verSub").setAttribute("data-i18n","verSubPending");
  $("verFine").style.display = "";
  $("verCont").style.display = "none";
  $("verBack").style.display = "";
  applyLang(LANG);
  $("verEmOut").textContent = em;
  $("verPlate").classList.add("pend");
  $("verPlate").classList.remove("done");
  go("pVerify");
  if (verTimer) clearTimeout(verTimer);
  verTimer = setTimeout(function(){
    VERIFIED = true;
    renderVer();
    $("verPlate").classList.remove("pend");
    $("verPlate").classList.add("done");
    $("verHeadline").removeAttribute("data-i18n");
    $("verHeadline").textContent = (I18N[LANG].verHeadDone);
    $("verSub").removeAttribute("data-i18n");
    $("verSub").innerHTML = I18N[LANG].verSubDone.replace("{email}", "<b class=\"emchip\">" + em + "</b>");
    $("verFine").style.display = "none";
    $("verCont").style.display = "";
  }, 2200);
});
$("verBack").addEventListener("click", function(){
  if (verTimer) clearTimeout(verTimer);
  go("p2");
});
$("verCont").addEventListener("click", function(){
  go("p2");
});

/* specific-framework contact flow */
$("reachBtn").addEventListener("click", function(){
  var em = $("reachEm").value.trim();
  if (!em || em.indexOf("@") < 1){ $("reachEm").focus(); return; }
  $("reachEmOut").textContent = em;
  $("rfForm").style.display = "none";
  $("rfDone").style.display = "";
  $("reachPlate").classList.add("done");
});
$("reachBack").addEventListener("click", function(){ go("p1"); });
$("reachBack2").addEventListener("click", function(){
  $("rfForm").style.display = "";
  $("rfDone").style.display = "none";
  $("reachPlate").classList.remove("done");
  go("p1");
});
/* master framework: select the card, then Continue starts the assessment interview.
   the specific-framework path keeps the full wizard. */
$("contBtn").addEventListener("click", function(e){
  if (MODE !== "master") return;
  e.preventDefault();
  window.location.href = "/assessment";
});

$("reachMaster").addEventListener("click", function(){
  MODE = "master";
  $("dMaster").classList.add("sel");
  $("dSingle").classList.remove("sel");
  $("contBtn").click();
});

$("reqBtn").addEventListener("click", function(){
  var em = $("reqEm").value.trim();
  if (!em || em.indexOf("@") < 1){ $("reqEm").focus(); return; }
  var names = sel.filter(function(f){ return f.req; }).map(function(f){ return f.name; }).join(" \u00b7 ");
  $("sentFw").textContent = names;
  $("sentFw").style.display = names ? "" : "none";
  $("sentEm").textContent = em;
  go("pSent");
});
$("backFw").addEventListener("click", function(){ go("p2"); });
$("contIntl").addEventListener("click", function(){ launch(); });

/* launch */
$("goBtn").addEventListener("click", function(){ if ($("goBtn").getAttribute("aria-disabled") === "true") return; launch(); });

/* master framework path opens the assessment interview; the single-framework path is untouched */
(function(){
  var cta = document.querySelector("#p3 .cta-out");
  if (!cta) return;
  cta.addEventListener("click", function(e){
    if (MODE !== "master") return;
    e.preventDefault(); e.stopPropagation();
    window.location.href = "/assessment";
  });
})();
function launch(){
  var c = calc();
  $("lsFw").textContent = c.n;
  $("lsQ").textContent = c.asked;
  $("lsT").textContent = c.min;
  $("scopeChips").innerHTML = sel.map(function(f){ return "<i>"+f.name+"</i>"; }).join("");
  go("p3");
}
$("back1").addEventListener("click", function(){ go("p1"); });
$("back2").addEventListener("click", function(){ go("p2"); });

/* ═══ i18n ═══ */
var I18N = {
  en:{
    nOverview:"Overview", nGov:"Governance", nFw:"Frameworks", nDisc:"Discovery", nAdv:"Adversarial", nGuard:"Guardrails", signout:"Sign out",
    step1:"SCOPE PATH", step2:"FRAMEWORKS", step3:"LAUNCH",
    eye1:"Step one", h1a:"What are you being <em>held to?</em>",
    lede1:"Most companies are bound by more than one framework and don't know it. The master set resolves that in one pass: answer a question once, and it satisfies every framework that asks it.",
    recChip:"RECOMMENDED", tgtChip:"TARGETED",
    mTitle:"Master framework",
    mDesc:"We assemble the full set that binds you, plus whatever your region requires. One assessment. One profile. Every framework satisfied from the same answers.",
    sTitle:"Specific framework",
    sDesc:"You already know what you are certifying against, or a regulator has named it. Leave a work email and our team scopes it with you.",
    contCta:"Continue \u2192",
    eye2:"Step two",
    h2m:"Scope the <em>master set.</em>", h2s:"Pick your <em>standard.</em>",
    lede2m:"Select the regions you operate in and the standards you are held to. We resolve the union and remove the overlap. The core set is pre-loaded.",
    lede2s:"One standard, scoped alone. Pick it from the library, international or regional.",
    tabIntl:"International", tabReg:"Regional",
    gLaw:"Binding law", gCert:"Certifiable standards", gGuide:"Guidance & risk frameworks",
    gGcc:"Gulf Cooperation Council", gLev:"Levant, North Africa & South Asia", gSec:"Sector overlays",
    dashT:"SCOPE INTELLIGENCE", dnl:"OVERLAP SAVED", dq:"EST. QUESTIONS", dt:"EST. TIME", dmin:"MIN",
    dsv:"QUESTIONS REMOVED BY OVERLAP",
    selT:"SELECTED",
    bkEmpty:"Nothing selected yet. The master set pre-loads the international core. Add your regions.",
    reqP:"Regional frameworks are onboarded per request. We build the control library and map it into the master set. Leave a work email.",
    reqCta:"Request onboarding", beginCta:"Begin assessment \u2192", back1:"\u2190 Change path",
    verP:"A specific-framework assessment is issued to a named organisation. Verify a work email to continue.",
    verCta:"Verify email", goHelp:"Verify a work email above to begin.",
    verHeadPending:"Verifying your email.",
    verSubPending:"We sent a confirmation link to <b id=\"verEmOut\" class=\"emchip\"></b>. This assessment starts once it is verified.",
    verFinePending:"Usually a few seconds in this demo. In production, this waits for the actual click.",
    verBack:"\u2190 Back to frameworks", verContCta:"Continue to assessment \u2192",
    reachT:"A specific framework, scoped with you.",
    reachP:"Regional and named standards are onboarded per organisation. Leave a work email and our team scopes it with you.",
    reachCta:"Request scoping \u2192", reachBack:"\u2190 Change path",
    reachDT:"We will get back to you.",
    reachDP1:"Your request is with the team. Expect a reply at", reachDP2:"within five working days.",
    reachBack2:"\u2190 Back to start", reachMaster:"Use the master framework \u2192",
    verHeadDone:"Email verified.",
    verSubDone:"{email} is confirmed. You can begin the assessment now.",
    sentT:"Request received.",
    sentP1:"We are building the control library for", sentP2:"and mapping it into the master set.",
    sentP3:"We will email", sentP4:"when it is live. Typical turnaround: five working days.",
    backFw:"\u2190 Back to frameworks", contIntl:"Continue with current set \u2192",
    launchEye:"Master framework \u00b7 scoped", launchEyeS:"Specific framework \u00b7 scoped",
    launchT:"Ready when you are.",
    launchP:"Upload what you have. Answer what we ask. The auditor does the rest, and it will notice when your answers don't match your system.",
    lsFw:"FRAMEWORKS", lsQ:"QUESTIONS", lsT:"MINUTES",
    back2:"\u2190 Adjust scope", startCta:"Start the interview \u2192"
  },
  ar:{
    nOverview:"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629", nGov:"\u0627\u0644\u062d\u0648\u0643\u0645\u0629", nFw:"\u0627\u0644\u0623\u064f\u0637\u0631", nDisc:"\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641", nAdv:"\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a", nGuard:"\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u062d\u0645\u0627\u064a\u0629", signout:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
    step1:"\u0645\u0633\u0627\u0631 \u0627\u0644\u0646\u0637\u0627\u0642", step2:"\u0627\u0644\u0623\u064f\u0637\u0631", step3:"\u0627\u0644\u0625\u0637\u0644\u0627\u0642",
    eye1:"\u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649", h1a:"\u0628\u0645\u0627\u0630\u0627 \u0623\u0646\u062a <em>\u0645\u064f\u0644\u0632\u064e\u0645\u061f</em>",
    lede1:"\u0645\u0639\u0638\u0645 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0645\u0644\u0632\u0645\u0629 \u0628\u0623\u0643\u062b\u0631 \u0645\u0646 \u0625\u0637\u0627\u0631 \u062f\u0648\u0646 \u0623\u0646 \u062a\u062f\u0631\u064a. \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 \u062a\u062d\u0633\u0645 \u0630\u0644\u0643 \u0641\u064a \u062c\u0648\u0644\u0629 \u0648\u0627\u062d\u062f\u0629: \u0623\u062c\u0628 \u0639\u0646 \u0627\u0644\u0633\u0624\u0627\u0644 \u0645\u0631\u0629 \u0648\u0627\u062d\u062f\u0629\u060c \u0641\u064a\u064f\u0644\u0628\u064a \u0643\u0644 \u0625\u0637\u0627\u0631 \u064a\u0637\u0644\u0628\u0647.",
    recChip:"\u0645\u064f\u0648\u0635\u0649 \u0628\u0647", tgtChip:"\u0645\u064f\u0633\u062a\u0647\u062f\u064e\u0641",
    mTitle:"\u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0631\u0626\u064a\u0633\u064a",
    mDesc:"\u0646\u062c\u0645\u0639 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0627\u0644\u062a\u064a \u062a\u0644\u0632\u0645\u0643\u060c \u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0645\u0627 \u062a\u062a\u0637\u0644\u0628\u0647 \u0645\u0646\u0637\u0642\u062a\u0643. \u062a\u0642\u064a\u064a\u0645 \u0648\u0627\u062d\u062f. \u0645\u0644\u0641 \u0648\u0627\u062d\u062f.",
    sTitle:"\u0625\u0637\u0627\u0631 \u0645\u062d\u062f\u062f",
    sDesc:"\u062a\u0639\u0631\u0641 \u0645\u0633\u0628\u0642\u064b\u0627 \u0645\u0627 \u0627\u0644\u0630\u064a \u062a\u0639\u062a\u0645\u062f \u0639\u0644\u064a\u0647. \u0627\u062a\u0631\u0643 \u0628\u0631\u064a\u062f \u0627\u0644\u0639\u0645\u0644 \u0648\u064a\u062a\u0648\u0644\u0649 \u0641\u0631\u064a\u0642\u0646\u0627 \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0646\u0637\u0627\u0642 \u0645\u0639\u0643.",
    contCta:"\u0645\u062a\u0627\u0628\u0639\u0629 \u2190",
    eye2:"\u0627\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629",
    h2m:"\u062d\u062f\u0651\u062f \u0646\u0637\u0627\u0642 <em>\u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629.</em>", h2s:"\u0627\u062e\u062a\u0631 <em>\u0645\u0639\u064a\u0627\u0631\u0643.</em>",
    lede2m:"\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062a\u064a \u062a\u0639\u0645\u0644 \u0641\u064a\u0647\u0627 \u0648\u0627\u0644\u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u062a\u064a \u062a\u0644\u0632\u0645\u0643. \u0646\u062d\u0644 \u0627\u0644\u0627\u062a\u062d\u0627\u062f \u0648\u0646\u0632\u064a\u0644 \u0627\u0644\u062a\u062f\u0627\u062e\u0644. \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0645\u062d\u0645\u0651\u0644\u0629 \u0645\u0633\u0628\u0642\u064b\u0627.",
    lede2s:"\u0645\u0639\u064a\u0627\u0631 \u0648\u0627\u062d\u062f\u060c \u0645\u062d\u062f\u062f \u0648\u062d\u062f\u0647. \u0627\u062e\u062a\u0631\u0647 \u0645\u0646 \u0627\u0644\u0645\u0643\u062a\u0628\u0629\u060c \u062f\u0648\u0644\u064a\u064b\u0627 \u0623\u0648 \u0625\u0642\u0644\u064a\u0645\u064a\u064b\u0627.",
    tabIntl:"\u062f\u0648\u0644\u064a\u0629", tabReg:"\u0625\u0642\u0644\u064a\u0645\u064a\u0629",
    gLaw:"\u0642\u0648\u0627\u0646\u064a\u0646 \u0645\u0644\u0632\u0645\u0629", gCert:"\u0645\u0639\u0627\u064a\u064a\u0631 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0639\u062a\u0645\u0627\u062f", gGuide:"\u0625\u0631\u0634\u0627\u062f\u0627\u062a \u0648\u0623\u0637\u0631 \u0645\u062e\u0627\u0637\u0631",
    gGcc:"\u062f\u0648\u0644 \u0645\u062c\u0644\u0633 \u0627\u0644\u062a\u0639\u0627\u0648\u0646", gLev:"\u0627\u0644\u0645\u0634\u0631\u0642 \u0648\u0634\u0645\u0627\u0644 \u0623\u0641\u0631\u064a\u0642\u064a\u0627 \u0648\u062c\u0646\u0648\u0628 \u0622\u0633\u064a\u0627", gSec:"\u062a\u0631\u0627\u0643\u0628\u0627\u062a \u0642\u0637\u0627\u0639\u064a\u0629",
    dashT:"\u0630\u0643\u0627\u0621 \u0627\u0644\u0646\u0637\u0627\u0642", dnl:"\u062a\u062f\u0627\u062e\u0644 \u0645\u0648\u0641\u0651\u0631", dq:"\u0623\u0633\u0626\u0644\u0629 \u0645\u062a\u0648\u0642\u0639\u0629", dt:"\u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0645\u062a\u0648\u0642\u0639", dmin:"\u062f\u0642\u064a\u0642\u0629",
    dsv:"\u0623\u0633\u0626\u0644\u0629 \u062d\u064f\u0630\u0641\u062a \u0628\u0641\u0636\u0644 \u0627\u0644\u062a\u062f\u0627\u062e\u0644",
    selT:"\u0627\u0644\u0645\u062d\u062f\u062f",
    bkEmpty:"\u0644\u0645 \u064a\u064f\u062d\u062f\u062f \u0634\u064a\u0621 \u0628\u0639\u062f. \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 \u062a\u062d\u0645\u0651\u0644 \u0627\u0644\u0646\u0648\u0627\u0629 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0645\u0633\u0628\u0642\u064b\u0627. \u0623\u0636\u0641 \u0645\u0646\u0627\u0637\u0642\u0643.",
    reqP:"\u0627\u0644\u0623\u0637\u0631 \u0627\u0644\u0625\u0642\u0644\u064a\u0645\u064a\u0629 \u062a\u064f\u0636\u0627\u0641 \u0639\u0646\u062f \u0627\u0644\u0637\u0644\u0628. \u0646\u0628\u0646\u064a \u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0648\u0646\u062f\u0645\u062c\u0647\u0627 \u0641\u064a \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629. \u0627\u062a\u0631\u0643 \u0628\u0631\u064a\u062f \u0627\u0644\u0639\u0645\u0644.",
    reqCta:"\u0627\u0637\u0644\u0628 \u0627\u0644\u0625\u0636\u0627\u0641\u0629", beginCta:"\u0627\u0628\u062f\u0623 \u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u2190", back1:"\u2192 \u063a\u064a\u0651\u0631 \u0627\u0644\u0645\u0633\u0627\u0631",
    verP:"\u064a\u064f\u0635\u062f\u0631 \u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0645\u062d\u062f\u062f \u0628\u0627\u0633\u0645 \u0645\u0624\u0633\u0633\u0629 \u0645\u062d\u062f\u062f\u0629. \u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u0628\u0631\u064a\u062f \u0639\u0645\u0644 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629.",
    verCta:"\u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u0628\u0631\u064a\u062f", goHelp:"\u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u0628\u0631\u064a\u062f \u0623\u0639\u0644\u0627\u0647 \u0644\u0644\u0628\u062f\u0621.",
    verHeadPending:"\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u0628\u0631\u064a\u062f\u0643.",
    verSubPending:"\u0623\u0631\u0633\u0644\u0646\u0627 \u0631\u0627\u0628\u0637 \u062a\u0623\u0643\u064a\u062f \u0625\u0644\u0649 <b id=\"verEmOut\" class=\"emchip\"></b>. \u064a\u0628\u062f\u0623 \u0647\u0630\u0627 \u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0628\u0645\u062c\u0631\u062f \u0627\u0644\u062a\u062d\u0642\u0651\u0642.",
    verFinePending:"\u0639\u0627\u062f\u0629\u064b \u0628\u0636\u0639 \u062b\u0648\u0627\u0646\u064d \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a\u0629. \u0641\u064a \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u060c \u064a\u064f\u0646\u062a\u0638\u0631 \u0627\u0644\u0646\u0642\u0631 \u0627\u0644\u0641\u0639\u0644\u064a.",
    verBack:"\u2192 \u0639\u0648\u062f\u0629 \u0644\u0644\u0623\u0637\u0631", verContCta:"\u062a\u0627\u0628\u0639 \u0625\u0644\u0649 \u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u2190",
    reachT:"\u0625\u0637\u0627\u0631 \u0645\u062d\u062f\u062f\u060c \u0646\u062d\u062f\u062f \u0646\u0637\u0627\u0642\u0647 \u0645\u0639\u0643.",
    reachP:"\u062a\u064f\u0636\u0627\u0641 \u0627\u0644\u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0625\u0642\u0644\u064a\u0645\u064a\u0629 \u0648\u0627\u0644\u0645\u062d\u062f\u062f\u0629 \u0644\u0643\u0644 \u0645\u0646\u0638\u0645\u0629 \u0639\u0644\u0649 \u062d\u062f\u0629. \u0627\u062a\u0631\u0643 \u0628\u0631\u064a\u062f \u0627\u0644\u0639\u0645\u0644 \u0648\u064a\u062a\u0648\u0644\u0649 \u0641\u0631\u064a\u0642\u0646\u0627 \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0646\u0637\u0627\u0642 \u0645\u0639\u0643.",
    reachCta:"\u0627\u0637\u0644\u0628 \u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0646\u0637\u0627\u0642 \u2190", reachBack:"\u2192 \u063a\u064a\u0651\u0631 \u0627\u0644\u0645\u0633\u0627\u0631",
    reachDT:"\u0633\u0646\u0639\u0627\u0648\u062f \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643.",
    reachDP1:"\u0637\u0644\u0628\u0643 \u0644\u062f\u0649 \u0627\u0644\u0641\u0631\u064a\u0642. \u062a\u0648\u0642\u0639 \u0631\u062f\u064b\u0627 \u0639\u0644\u0649", reachDP2:"\u062e\u0644\u0627\u0644 \u062e\u0645\u0633\u0629 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644.",
    reachBack2:"\u2192 \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u062f\u0627\u064a\u0629", reachMaster:"\u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u2190",
    verHeadDone:"\u062a\u0645 \u0627\u0644\u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u0628\u0631\u064a\u062f.",
    verSubDone:"\u062a\u0645 \u062a\u0623\u0643\u064a\u062f {email}. \u064a\u0645\u0643\u0646\u0643 \u0628\u062f\u0621 \u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0622\u0646.",
    sentT:"\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0637\u0644\u0628.",
    sentP1:"\u0646\u0628\u0646\u064a \u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0644\u0640", sentP2:"\u0648\u0646\u062f\u0645\u062c\u0647\u0627 \u0641\u064a \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629.",
    sentP3:"\u0633\u0646\u0631\u0627\u0633\u0644", sentP4:"\u0639\u0646\u062f \u0627\u0644\u062c\u0627\u0647\u0632\u064a\u0629. \u0627\u0644\u0645\u062f\u0629 \u0627\u0644\u0645\u0639\u062a\u0627\u062f\u0629: \u062e\u0645\u0633\u0629 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644.",
    backFw:"\u2192 \u0639\u0648\u062f\u0629 \u0644\u0644\u0623\u0637\u0631", contIntl:"\u062a\u0627\u0628\u0639 \u0628\u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u2190",
    launchEye:"\u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u00b7 \u0645\u062d\u062f\u062f \u0627\u0644\u0646\u0637\u0627\u0642", launchEyeS:"\u0625\u0637\u0627\u0631 \u0645\u062d\u062f\u062f \u00b7 \u0645\u062d\u062f\u062f \u0627\u0644\u0646\u0637\u0627\u0642",
    launchT:"\u062c\u0627\u0647\u0632\u0648\u0646 \u0645\u062a\u0649 \u0643\u0646\u062a \u062c\u0627\u0647\u0632\u064b\u0627.",
    launchP:"\u0627\u0631\u0641\u0639 \u0645\u0627 \u0644\u062f\u064a\u0643. \u0623\u062c\u0628 \u0639\u0645\u0627 \u0646\u0633\u0623\u0644. \u0627\u0644\u0645\u062f\u0642\u0642 \u064a\u062a\u0648\u0644\u0649 \u0627\u0644\u0628\u0627\u0642\u064a\u060c \u0648\u0633\u064a\u0644\u0627\u062d\u0638 \u062d\u064a\u0646 \u0644\u0627 \u062a\u0637\u0627\u0628\u0642 \u0625\u062c\u0627\u0628\u0627\u062a\u0643 \u0646\u0638\u0627\u0645\u0643.",
    lsFw:"\u0623\u064f\u0637\u0631", lsQ:"\u0623\u0633\u0626\u0644\u0629", lsT:"\u062f\u0642\u0627\u0626\u0642",
    back2:"\u2192 \u0639\u062f\u0651\u0644 \u0627\u0644\u0646\u0637\u0627\u0642", startCta:"\u0627\u0628\u062f\u0623 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629 \u2190"
  }
};
function applyModeText(){
  var d = I18N[LANG];
  $("scopeTitle").innerHTML = MODE==="master" ? d.h2m : d.h2s;
  $("scopeLede").textContent = MODE==="master" ? d.lede2m : d.lede2s;
  $("launchEye").textContent = MODE==="master" ? d.launchEye : d.launchEyeS;
}
function applyLang(lang){
  LANG = lang;
  var dict = I18N[lang] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var k = el.getAttribute("data-i18n");
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  document.documentElement.setAttribute("dir", lang==="ar" ? "rtl" : "ltr");
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang button").forEach(function(b){
    b.setAttribute("aria-pressed", b.getAttribute("data-lang")===lang ? "true":"false");
  });
  try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
  applyModeText(); renderBasket();
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
});
var savedL = "en";
try{ savedL = localStorage.getItem("tahara-lang") || "en"; }catch(e){}
if (savedL === "ar") applyLang("ar");

/* init */
syncSel();

  } finally {
    window.IntersectionObserver = _origIO;
    window.addEventListener = _origAdd;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
  };
}

/* Ported from the approved design file. */
function initFramework(){
  const _ios = [];
  const _docHandlers = [];
  const _winHandlers = [];
  const _origIO = window.IntersectionObserver;
  window.IntersectionObserver = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  const _origDocAdd = document.addEventListener.bind(document);
  document.addEventListener = function(t, fn, o){ _docHandlers.push([t, fn, o]); return _origDocAdd(t, fn, o); };
  const _origWinAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origWinAdd(t, fn, o); };
  try{

  var pages=[].slice.call(document.querySelectorAll('.fwpage'));
  var sws=[].slice.call(document.querySelectorAll('.fsw'));
  var tocBox=document.getElementById('toc');
  var crumbFw=document.getElementById('crumbFw');
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  function arm(scope){
    scope.querySelectorAll('[data-rv]').forEach(function(el){ el.classList.remove('in'); io.observe(el); });
  }
  function countUp(el){
    var raw=el.getAttribute('data-to'); if(!/^[\d,]+$/.test(raw)) return;
    var to=parseInt(raw.replace(/,/g,''),10);
    if(reduce){ el.textContent=to.toLocaleString('en-US'); return; }
    var t0=performance.now(), d=900;
    (function stp(now){
      var p=Math.min(1,(now-t0)/d), e=1-Math.pow(1-p,3);
      el.textContent=Math.round(to*e).toLocaleString('en-US');
      if(p<1) requestAnimationFrame(stp);
    })(t0);
  }

  var spy=null;
  function visibleObs(sec){ return [].slice.call(sec.querySelectorAll('.ob')).filter(function(o){ return !o.classList.contains('hide'); }); }
  function buildToc(sec){
    tocBox.innerHTML='';
    var obs=visibleObs(sec);
    obs.forEach(function(ob){
      var a=document.createElement('a');
      a.href='#'+ob.id;
      a.innerHTML='<i>'+ob.querySelector('.ref').textContent+'</i><span>'+ob.querySelector('.tt b').textContent+'</span>';
      a.addEventListener('click',function(e){
        e.preventDefault();
        ob.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
        if(!ob.classList.contains('open')) toggleOb(ob,true);
      });
      tocBox.appendChild(a);
    });
    if(spy) spy.disconnect();
    spy=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        tocBox.querySelectorAll('a').forEach(function(l){ l.classList.toggle('on', l.getAttribute('href')==='#'+e.target.id); });
      });
    },{rootMargin:'-18% 0px -66% 0px'});
    obs.forEach(function(o){ spy.observe(o); });
  }

  function toggleOb(ob,force){
    var open=(force!=null)?force:!ob.classList.contains('open');
    ob.classList.toggle('open',open);
    ob.querySelector('.ob-h').setAttribute('aria-expanded',String(open));
  }
  document.addEventListener('click',function(e){
    var cp=e.target.closest('.copy');
    if(cp){
      e.stopPropagation();
      var code=cp.closest('.codewrap').querySelector('code');
      var txt=code.textContent;
      function ok(){ cp.classList.add('ok'); cp.textContent='COPIED'; setTimeout(function(){cp.classList.remove('ok');cp.textContent='COPY';},1400); }
      function fb(){ var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); ok(); }catch(_){ } document.body.removeChild(ta); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(ok,fb); } else fb();
      return;
    }
    var c=e.target.closest('.fchip');
    if(c){
      var sec=c.closest('.fwpage');
      sec.querySelectorAll('.fchip').forEach(function(b){ b.classList.toggle('on',b===c); });
      applyFilter(sec); return;
    }
    var x=e.target.closest('.xa');
    if(x){
      var sec2=x.closest('.fwpage'), open=x.getAttribute('data-x')==='1';
      visibleObs(sec2).forEach(function(ob){ toggleOb(ob,open); });
      return;
    }
    var h=e.target.closest('.ob-h'); if(h) toggleOb(h.parentElement);
  });
  document.addEventListener('input',function(e){
    if(e.target.classList.contains('regsearch')) applyFilter(e.target.closest('.fwpage'));
  });
  function applyFilter(sec){
    var q=(sec.querySelector('.regsearch').value||'').trim().toLowerCase();
    var chip=sec.querySelector('.fchip.on'); var type=chip?chip.getAttribute('data-f'):'all';
    var shown=0;
    sec.querySelectorAll('.ob').forEach(function(ob){
      var okT = type==='all' || ob.getAttribute('data-type')===type;
      var okQ = !q || ob.getAttribute('data-search').indexOf(q)>-1;
      var ok=okT&&okQ;
      ob.classList.toggle('hide',!ok);
      if(ok) shown++;
    });
    sec.querySelector('.rc-n').textContent=shown;
    sec.querySelector('.nores').hidden = shown!==0;
    if(!sec.hidden) buildToc(sec);
  }

  function show(key){
    pages.forEach(function(p){ p.hidden=p.getAttribute('data-fw')!==key; });
    sws.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-go')===key); });
    var sec=document.querySelector('.fwpage[data-fw="'+key+'"]');
    crumbFw.textContent=sec.getAttribute('data-fwname');
    buildToc(sec); arm(sec);
    sec.querySelectorAll('.num[data-to]').forEach(countUp);
    window.scrollTo(0,0);
  }
  sws.forEach(function(b){ b.addEventListener('click',function(){ show(b.getAttribute('data-go')); }); });

  var prog=document.querySelector('.progress');
  window.addEventListener('scroll',function(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    prog.style.setProperty('--sp', max>0?Math.min(1,window.scrollY/max):0);
  },{passive:true});

  var tg=document.getElementById('themeTg');
  try{ var s=localStorage.getItem('tahara-theme'); if(s) document.documentElement.dataset.theme=s; }catch(e){}
  tg.addEventListener('click',function(){
    var n=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=n;
    try{ localStorage.setItem('tahara-theme',n); }catch(e){}
  });

  var AR={
    nOverview:'\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',nGov:'\u0627\u0644\u062d\u0648\u0643\u0645\u0629',nFw:'\u0627\u0644\u0623\u064f\u0637\u0631',nDisc:'\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641',nAdv:'\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a',nGuard:'\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u062d\u0645\u0627\u064a\u0629',
    crumbRoot:'\u0627\u0644\u0623\u064f\u0637\u0631',railFw:'\u0627\u0644\u0625\u0637\u0627\u0631',railToc:'\u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u062a\u0637\u0641',railLeg:'\u0627\u0644\u0646\u062a\u0627\u0626\u062c',
    legC:'\u0645\u0637\u0627\u0628\u0642',legMn:'\u0637\u0641\u064a\u0641',legMj:'\u062c\u0633\u064a\u0645',
    sec1:'\u0643\u064a\u0641 \u064a\u0635\u0628\u062d \u0627\u0644\u0628\u0646\u062f \u0636\u0627\u0628\u0637\u064b\u0627 \u0645\u064f\u0631\u0627\u0642\u0628\u064b\u0627',
    sec1n:'\u064a\u064f\u062a\u0631\u062c\u0645 \u0643\u0644 \u0628\u0646\u062f \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u062d\u062a\u0645\u064a\u0629 \u0639\u0644\u0649 \u0645\u0644\u0641 \u0646\u0638\u0627\u0645\u0643\u060c \u0648\u0645\u0633\u0628\u0627\u0631 \u064a\u0631\u0627\u0642\u0628 \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062d\u064a\u060c \u0648\u0645\u062c\u0645\u0648\u0639\u0629 \u0623\u062f\u0644\u0629 \u0645\u062d\u062f\u062f\u0629 \u062a\u0641\u064a \u0628\u0647.',
    m1:'\u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645',m1p:'\u0627\u0644\u0628\u0646\u062f \u0643\u0645\u0627 \u0643\u064f\u062a\u0628\u060c \u062d\u0631\u0641\u064a\u064b\u0627 \u0645\u0639 \u0645\u0631\u062c\u0639\u0647.',
    m2:'\u0627\u0644\u0636\u0627\u0628\u0637',m2p:'\u0642\u0627\u0639\u062f\u0629 \u062d\u062a\u0645\u064a\u0629 \u0639\u0644\u0649 \u0645\u0644\u0641\u0643 \u0627\u0644\u0645\u0639\u0644\u0646.',
    m3:'\u0627\u0644\u0645\u0633\u0628\u0627\u0631',m3p:'\u0645\u0627 \u064a\u0642\u0631\u0623\u0647 \u0627\u0644\u0645\u064f\u062c\u0645\u0651\u0639 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062d\u064a.',
    m4:'\u0627\u0644\u062f\u0644\u064a\u0644',m4p:'\u0645\u0627 \u064a\u0641\u064a \u0628\u0627\u0644\u0636\u0627\u0628\u0637 \u0648\u0645\u0627 \u062a\u0644\u0632\u0645\u0643 \u0643\u0644 \u0646\u062a\u064a\u062c\u0629 \u0628\u0625\u0628\u0631\u0627\u0632\u0647.',
    sec2:'\u0633\u062c\u0644 \u0627\u0644\u0636\u0648\u0627\u0628\u0637',
    signout:'تسجيل الخروج'
  };
  var EN={};
  document.querySelectorAll('[data-l],[data-lk]').forEach(function(el){
    EN[el.getAttribute('data-l')||el.getAttribute('data-lk')]=el.innerHTML;
  });
  function setLang(l){
    var dict=l==='ar'?AR:EN;
    document.querySelectorAll('[data-l],[data-lk]').forEach(function(el){
      var k=el.getAttribute('data-l')||el.getAttribute('data-lk');
      if(dict[k]!=null) el.innerHTML=dict[k];
    });
    document.documentElement.setAttribute('dir', l==='ar'?'rtl':'ltr');
    document.documentElement.lang=l;
    document.querySelectorAll('.seg button[data-lang]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-lang')===l); });
    try{ localStorage.setItem('tahara-lang',l); }catch(e){}
  }
  document.querySelectorAll('.seg button[data-lang]').forEach(function(b){
    b.addEventListener('click',function(){ setLang(b.getAttribute('data-lang')); });
  });
  try{ if(localStorage.getItem('tahara-lang')==='ar') setLang('ar'); }catch(e){}

  show((new URLSearchParams(window.location.search)).get('fw') || 'eu-ai-act');

  } finally {
    window.IntersectionObserver = _origIO;
    document.addEventListener = _origDocAdd;
    window.addEventListener = _origWinAdd;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _docHandlers.forEach(function(h){ document.removeEventListener(h[0], h[1], h[2]); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
  };
}



  const INIT = { overview: initOverview, governance: initGovernance, framework: initFramework };
  const fn = INIT[which];
  return typeof fn === "function" ? fn() : function(){};
}
