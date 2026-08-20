/* Ported from the approved combined design file: blue theme, medallion interstitials, specific-framework contact flow. */
export function initGovernance(){
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
$("reachMaster").addEventListener("click", function(){
  $("dMaster").click();
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
