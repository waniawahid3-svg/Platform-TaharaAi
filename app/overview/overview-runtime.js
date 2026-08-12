/* Ported from the approved design file. */
export function initOverview(){
  const _ios = [];
  const _winHandlers = [];
  const _origIO = window.IntersectionObserver;
  const _trackedIO = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  window.IntersectionObserver = _trackedIO;
  const _origAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origAdd(t, fn, o); };
  try{

  document.querySelectorAll(".ovx img").forEach(function(img){
    function fb(){ img.style.display="none"; var f=img.nextElementSibling; if (f && f.tagName.toLowerCase()==="svg") f.style.display="block"; }
    img.addEventListener("error", fb);
    if (img.complete && img.naturalWidth === 0) fb();
  });

/* ═══ the assurance seal — precision certification mark ═══ */
(function(){
  var size = 320;
  /* sized to the r=50 circumference so the ring never overlaps itself */
  var ring = "ISO 42001 · NIST AI RMF · EU AI ACT · ISO 23894 · ";
  var ticks = "";
  for (var i = 0; i < 36; i++){
    var a = (i * 10) * Math.PI / 180, maj = i % 3 === 0;
    var r1 = 43.5, r2 = maj ? 40 : 41.8;
    ticks += '<line class="tick ' + (maj ? 'maj' : '') + '" x1="' + (60 + r1*Math.cos(a)).toFixed(2) +
             '" y1="' + (60 + r1*Math.sin(a)).toFixed(2) + '" x2="' + (60 + r2*Math.cos(a)).toFixed(2) +
             '" y2="' + (60 + r2*Math.sin(a)).toFixed(2) + '"/>';
  }
  document.getElementById("seal").outerHTML =
    '<div class="seal" style="width:' + size + 'px;height:' + size + 'px">' +
    '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '">' +
    '<defs>' +
    '<path id="sealpath" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"/>' +
    '<radialGradient id="sealcore" cx="50%" cy="40%" r="65%">' +
    '<stop offset="0%" stop-color="#0E3D6E"/><stop offset="60%" stop-color="#062A52"/><stop offset="100%" stop-color="#041B3F"/>' +
    '</radialGradient>' +
    '</defs>' +
    '<circle class="rim-o" cx="60" cy="60" r="56"/>' +
    '<circle class="band" cx="60" cy="60" r="54.5"/>' +
    '<circle class="band" cx="60" cy="60" r="45.5"/>' +
    '<g class="ring"><text dy="1.6" textLength="314" lengthAdjust="spacing"><textPath href="#sealpath" startOffset="0" textLength="314" lengthAdjust="spacing">' + ring + '</textPath></text></g>' +
    '<g class="ticks">' + ticks + '</g>' +
    '<circle class="rim-i" cx="60" cy="60" r="37.5"/>' +
    '<circle class="core-glow" cx="60" cy="60" r="29"/>' +
    '<circle cx="60" cy="60" r="29" fill="url(#sealcore)"/>' +
    '<circle class="core-r" cx="60" cy="60" r="29"/>' +
    '<circle class="core-i" cx="60" cy="60" r="25.5"/>' +
    '<g class="tracer"><circle class="tg" cx="110" cy="60" r="3.6"/><circle class="td" cx="110" cy="60" r="1.5"/></g>' +
    '<g transform="translate(60,60.5) scale(.62) translate(-24,-22)">' +
      '<path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".92"/>' +
      '<path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/>' +
      '<path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#2F6FD8"/>' +
      '<path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '</g>' +
    '</svg></div>';
})();

/* ═══ scroll reveal ═══ */
(function(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.18});
  document.querySelectorAll("[data-rv]").forEach(function(el){ io.observe(el); });

  var nav = document.querySelector(".nav");
  window.addEventListener("scroll", function(){
    nav.classList.toggle("scrolled", window.scrollY > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.style.setProperty("--sp", max > 0 ? Math.min(1, window.scrollY / max) : 0);
  }, {passive:true});
})();

/* ═══ live tape ═══ */
(function(){
  var ITEMS = [
    ["conform","ISO 42001 · 6.1.2","risk assessment: record found, 12 Jul"],
    ["major","EU AI ACT · Art. 12","log sequence gap: 3 days"],
    ["conform","ISO 42001 · A.6.2.4","model registry: 4 versions approved"],
    ["minor","DISCOVERY","IAM drift: 3 non-eng principals on model bucket"],
    ["conform","EU AI ACT · Art. 15","accuracy 0.94, above declared floor"],
    ["major","ISO 42001 · 9.2","internal audit: 0 records in 8 months"],
    ["info","PROBE","PII masking: 1,204 prompts, 0 leaks"]
  ];
  var h = ITEMS.concat(ITEMS).map(function(it){
    return '<span class="tape-i"><span class="dot '+it[0]+'"></span><b>'+it[1]+'</b>&nbsp;'+it[2]+'</span>';
  }).join('');
  document.getElementById("tape").innerHTML = h;
})();

/* ═══ i18n — EN / عربي (shares the login page's saved choice) ═══ */
(function(){
  var STRINGS = {
    en: {
      nOverview:"Overview", nGov:"Governance", nFw:"Frameworks", nDisc:"Discovery", nAdv:"Adversarial", nPii:"PII", nGuard:"Guardrails",
      ctaSm:"Start assessment", signout:"Sign out",
      eyeHero:"Continuous AI assurance",
      display:"Trust is not declared.<br>It is <em>demonstrated.</em>",
      lede:"We map your system against the frameworks that bind it, then keep watching. The day a control stops operating, you find out. Not the auditor.",
      cta1:"Start an assessment \u2192", cta2:"See how it works",
      eyeHow:"How it works", h2How:"Four movements. One continuous loop.",
      m1t:"Ingest", m2t:"Interview", m3t:"Discover", m4t:"Assure",
      m1p:"Upload what you have. The engine extracts only the facts a framework needs, and cites the page.",
      m2p:"An auditor-grade chatbot asks what the documents didn't say. It follows up.",
      m3p:"A read-only collector inside your boundary observes what your system actually does.",
      m4p:"Gap assessment, SoA, risk matrix. Then the loop stays open, and drift raises an alarm.",
      eyeMethod:"The method", h2Method:"We never trust a single source.",
      subMethod:"A finding is the <em>delta</em> between what you believe, what you wrote down, and what your system is doing.",
      fxT:"Model bucket access", sev:"MAJOR NONCONFORMITY",
      fxSum:"The documented control is not operating. <b>Two findings, one delta.</b>",
      stClaim:"\u201cModel bucket access is restricted to engineering.\u201d",
      stDoc:"Access Control Policy v3: least privilege, engineering only.",
      stReal:"IAM: <b>14 principals</b>, 3 non-engineering, 1 service account with <code>*</code>.",
      eyeSurf:"Three surfaces", h2Surf:"One engine. Three ways in.",
      s1t:"Governance", s2t:"Adversarial", s3t:"PII",
      s1p:"Pick a framework. The chatbot maps it, discovery verifies it, the artefacts write themselves.",
      s2p:"Continuous red-teaming against the OWASP LLM Top 10, on a schedule, not once a year.",
      s3p:"Every prompt that carried personal data: masked, blocked, or the one you need to know about.",
      s1g:"Start an assessment <i>\u2192</i>", s2g:"View posture <i>\u2192</i>", s3g:"View log <i>\u2192</i>",
      eyeAcc:"Access", h2Acc:"We never hold your keys.",
      subAcc:"The collector runs inside your boundary, under your credentials.",
      accT:"Zero custody",
      accSum:"Runs under your credentials, inside your boundary. <b>We never hold your keys.</b>",
      d1:"Production inference payloads", d2:"Personal data of any kind", d3:"Model weights", d4:"Any write access, anywhere",
      a1:"Config, IAM, registry metadata", a2:"Log <b>completeness</b>, not contents", a3:"Aggregate metrics you already compute"
    },
    ar: {
      nOverview:"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629", nGov:"\u0627\u0644\u062d\u0648\u0643\u0645\u0629", nFw:"\u0627\u0644\u0623\u064f\u0637\u0631", nDisc:"\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641", nAdv:"\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a", nPii:"\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629", nGuard:"\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u062d\u0645\u0627\u064a\u0629",
      ctaSm:"\u0627\u0628\u062f\u0623 \u0627\u0644\u062a\u0642\u064a\u064a\u0645", signout:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
      eyeHero:"\u0627\u0644\u062a\u0623\u0645\u064a\u0646 \u0627\u0644\u0645\u0633\u062a\u0645\u0631 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a",
      display:"\u0627\u0644\u062b\u0642\u0629 \u0644\u0627 \u062a\u064f\u0639\u0644\u0646.<br>\u0628\u0644 <em>\u062a\u064f\u062b\u0628\u064e\u062a.</em>",
      lede:"\u0646\u064f\u0637\u0627\u0628\u0642 \u0646\u0638\u0627\u0645\u0643 \u0645\u0639 \u0627\u0644\u0623\u064f\u0637\u0631 \u0627\u0644\u062a\u064a \u062a\u062d\u0643\u0645\u0647\u060c \u062b\u0645 \u0646\u0648\u0627\u0635\u0644 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629. \u064a\u0648\u0645 \u064a\u062a\u0648\u0642\u0641 \u0623\u064a \u0636\u0627\u0628\u0637 \u0639\u0646 \u0627\u0644\u0639\u0645\u0644\u060c \u0623\u0646\u062a \u0645\u0646 \u064a\u0639\u0644\u0645 \u0623\u0648\u0644\u064b\u0627. \u0644\u0627 \u0627\u0644\u0645\u062f\u0642\u0651\u0642.",
      cta1:"\u0627\u0628\u062f\u0623 \u062a\u0642\u064a\u064a\u0645\u064b\u0627 \u2190", cta2:"\u0643\u064a\u0641 \u064a\u0639\u0645\u0644",
      eyeHow:"\u0643\u064a\u0641 \u064a\u0639\u0645\u0644", h2How:"\u0623\u0631\u0628\u0639 \u062d\u0631\u0643\u0627\u062a. \u062d\u0644\u0642\u0629 \u0648\u0627\u062d\u062f\u0629 \u0645\u062a\u0635\u0644\u0629.",
      m1t:"\u0627\u0633\u062a\u064a\u0639\u0627\u0628", m2t:"\u0645\u0642\u0627\u0628\u0644\u0629", m3t:"\u0627\u0633\u062a\u0643\u0634\u0627\u0641", m4t:"\u062a\u0623\u0645\u064a\u0646",
      m1p:"\u0627\u0631\u0641\u0639 \u0645\u0627 \u0644\u062f\u064a\u0643. \u064a\u0633\u062a\u062e\u0631\u062c \u0627\u0644\u0645\u062d\u0631\u0643 \u0627\u0644\u062d\u0642\u0627\u0626\u0642 \u0627\u0644\u062a\u064a \u064a\u062a\u0637\u0644\u0628\u0647\u0627 \u0627\u0644\u0625\u0637\u0627\u0631 \u0641\u0642\u0637\u060c \u0645\u0639 \u0627\u0644\u0627\u0633\u062a\u0634\u0647\u0627\u062f \u0628\u0627\u0644\u0635\u0641\u062d\u0629.",
      m2p:"\u0631\u0648\u0628\u0648\u062a \u0645\u062d\u0627\u062f\u062b\u0629 \u0628\u0645\u0633\u062a\u0648\u0649 \u0645\u062f\u0642\u0651\u0642 \u064a\u0633\u0623\u0644 \u0639\u0645\u0651\u0627 \u0644\u0645 \u062a\u0642\u0644\u0647 \u0627\u0644\u0648\u062b\u0627\u0626\u0642\u060c \u0648\u064a\u062a\u0627\u0628\u0639.",
      m3p:"\u0645\u064f\u062c\u0645\u0651\u0639 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637 \u062f\u0627\u062e\u0644 \u0646\u0637\u0627\u0642\u0643 \u064a\u0631\u0627\u0642\u0628 \u0645\u0627 \u064a\u0641\u0639\u0644\u0647 \u0646\u0638\u0627\u0645\u0643 \u0641\u0639\u0644\u064b\u0627.",
      m4p:"\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0641\u062c\u0648\u0627\u062a\u060c \u0648\u0628\u064a\u0627\u0646 \u0627\u0644\u0642\u0627\u0628\u0644\u064a\u0629\u060c \u0648\u0645\u0635\u0641\u0648\u0641\u0629 \u0627\u0644\u0645\u062e\u0627\u0637\u0631. \u062b\u0645 \u062a\u0628\u0642\u0649 \u0627\u0644\u062d\u0644\u0642\u0629 \u0645\u0641\u062a\u0648\u062d\u0629\u060c \u0648\u0623\u064a \u0627\u0646\u062d\u0631\u0627\u0641 \u064a\u0637\u0644\u0642 \u0625\u0646\u0630\u0627\u0631\u064b\u0627.",
      eyeMethod:"\u0627\u0644\u0645\u0646\u0647\u062c\u064a\u0629", h2Method:"\u0644\u0627 \u0646\u062b\u0642 \u0628\u0645\u0635\u062f\u0631 \u0648\u0627\u062d\u062f \u0623\u0628\u062f\u064b\u0627.",
      subMethod:"\u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u0647\u064a <em>\u0627\u0644\u0641\u0627\u0631\u0642</em> \u0628\u064a\u0646 \u0645\u0627 \u062a\u0639\u062a\u0642\u062f\u0647\u060c \u0648\u0645\u0627 \u062f\u0648\u0651\u0646\u062a\u0647\u060c \u0648\u0645\u0627 \u064a\u0641\u0639\u0644\u0647 \u0646\u0638\u0627\u0645\u0643.",
      fxT:"\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0633\u062a\u0648\u062f\u0639 \u0627\u0644\u0646\u0645\u0627\u0630\u062c", sev:"\u0639\u062f\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u062c\u0633\u064a\u0645",
      fxSum:"\u0627\u0644\u0636\u0627\u0628\u0637 \u0627\u0644\u0645\u0648\u062b\u0651\u0642 \u0644\u0627 \u064a\u0639\u0645\u0644. <b>\u0646\u062a\u064a\u062c\u062a\u0627\u0646\u060c \u0641\u0627\u0631\u0642 \u0648\u0627\u062d\u062f.</b>",
      stClaim:"\u00ab\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0633\u062a\u0648\u062f\u0639 \u0627\u0644\u0646\u0645\u0627\u0630\u062c \u0645\u0642\u0635\u0648\u0631 \u0639\u0644\u0649 \u0641\u0631\u064a\u0642 \u0627\u0644\u0647\u0646\u062f\u0633\u0629.\u00bb",
      stDoc:"\u0633\u064a\u0627\u0633\u0629 \u0636\u0628\u0637 \u0627\u0644\u0648\u0635\u0648\u0644 v3: \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0627\u062a\u060c \u0644\u0644\u0647\u0646\u062f\u0633\u0629 \u0641\u0642\u0637.",
      stReal:"IAM: <b>14 \u062d\u0633\u0627\u0628\u064b\u0627</b>\u060c 3 \u0645\u0646 \u062e\u0627\u0631\u062c \u0627\u0644\u0647\u0646\u062f\u0633\u0629\u060c \u0648\u062d\u0633\u0627\u0628 \u062e\u062f\u0645\u0629 \u0648\u0627\u062d\u062f \u0628\u0635\u0644\u0627\u062d\u064a\u0629 <code>*</code>.",
      eyeSurf:"\u062b\u0644\u0627\u062b \u0648\u0627\u062c\u0647\u0627\u062a", h2Surf:"\u0645\u062d\u0631\u0643 \u0648\u0627\u062d\u062f. \u062b\u0644\u0627\u062b\u0629 \u0645\u062f\u0627\u062e\u0644.",
      s1t:"\u0627\u0644\u062d\u0648\u0643\u0645\u0629", s2t:"\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a", s3t:"\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629",
      s1p:"\u0627\u062e\u062a\u0631 \u0625\u0637\u0627\u0631\u064b\u0627. \u064a\u0631\u0633\u0645\u0647 \u0627\u0644\u0631\u0648\u0628\u0648\u062a\u060c \u0648\u064a\u062a\u062d\u0642\u0642 \u0645\u0646\u0647 \u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641\u060c \u0648\u062a\u064f\u0643\u062a\u0628 \u0627\u0644\u0645\u062e\u0631\u062c\u0627\u062a \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627.",
      s2p:"\u0641\u0631\u0642 \u062d\u0645\u0631\u0627\u0621 \u0645\u0633\u062a\u0645\u0631\u0629 \u0636\u062f OWASP LLM Top 10\u060c \u0648\u0641\u0642 \u062c\u062f\u0648\u0644\u060c \u0644\u0627 \u0645\u0631\u0629 \u0641\u064a \u0627\u0644\u0633\u0646\u0629.",
      s3p:"\u0643\u0644 \u0645\u0648\u062c\u0651\u0647 \u062d\u0645\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0634\u062e\u0635\u064a\u0629: \u0645\u064f\u0642\u0646\u0651\u0639\u060c \u0645\u062d\u0638\u0648\u0631\u060c \u0623\u0648 \u0630\u0627\u0643 \u0627\u0644\u0630\u064a \u064a\u062c\u0628 \u0623\u0646 \u062a\u0639\u0631\u0641\u0647.",
      s1g:"\u0627\u0628\u062f\u0623 \u062a\u0642\u064a\u064a\u0645\u064b\u0627 <i>\u2190</i>", s2g:"\u0627\u0639\u0631\u0636 \u0627\u0644\u0648\u0636\u0639 <i>\u2190</i>", s3g:"\u0627\u0639\u0631\u0636 \u0627\u0644\u0633\u062c\u0644 <i>\u2190</i>",
      eyeAcc:"\u0627\u0644\u0648\u0635\u0648\u0644", h2Acc:"\u0644\u0627 \u0646\u062d\u062a\u0641\u0638 \u0628\u0645\u0641\u0627\u062a\u064a\u062d\u0643 \u0623\u0628\u062f\u064b\u0627.",
      subAcc:"\u064a\u0639\u0645\u0644 \u0627\u0644\u0645\u064f\u062c\u0645\u0651\u0639 \u062f\u0627\u062e\u0644 \u0646\u0637\u0627\u0642\u0643\u060c \u0648\u0628\u0635\u0644\u0627\u062d\u064a\u0627\u062a\u0643.",
      accT:"\u062d\u064a\u0627\u0632\u0629 \u0635\u0641\u0631\u064a\u0629",
      accSum:"\u064a\u0639\u0645\u0644 \u0628\u0635\u0644\u0627\u062d\u064a\u0627\u062a\u0643\u060c \u062f\u0627\u062e\u0644 \u0646\u0637\u0627\u0642\u0643. <b>\u0644\u0627 \u0646\u062d\u062a\u0641\u0638 \u0628\u0645\u0641\u0627\u062a\u064a\u062d\u0643 \u0623\u0628\u062f\u064b\u0627.</b>",
      d1:"\u062d\u0645\u0648\u0644\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u062f\u0644\u0627\u0644 \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629",
      d2:"\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0628\u0623\u064a \u0634\u0643\u0644",
      d3:"\u0623\u0648\u0632\u0627\u0646 \u0627\u0644\u0646\u0645\u0627\u0630\u062c",
      d4:"\u0623\u064a \u0635\u0644\u0627\u062d\u064a\u0629 \u0643\u062a\u0627\u0628\u0629\u060c \u0641\u064a \u0623\u064a \u0645\u0643\u0627\u0646",
      a1:"\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0648IAM \u0648\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0633\u062c\u0644 \u0627\u0644\u0648\u0635\u0641\u064a\u0629",
      a2:"<b>\u0627\u0643\u062a\u0645\u0627\u0644</b>&nbsp;\u0627\u0644\u0633\u062c\u0644\u0627\u062a\u060c \u0644\u0627 \u0645\u062d\u062a\u0648\u0627\u0647\u0627",
      a3:"\u0627\u0644\u0645\u0642\u0627\u064a\u064a\u0633 \u0627\u0644\u0645\u062c\u0645\u0651\u0639\u0629 \u0627\u0644\u062a\u064a \u062a\u062d\u0633\u0628\u0647\u0627 \u0623\u0635\u0644\u064b\u0627"
    }
  };

  var root = document.querySelector(".ovx") || document.documentElement;
  var ledeEl = document.querySelector(".lede");
  if (ledeEl) ledeEl.setAttribute("data-i18n","lede");

  function applyLang(lang){
    var dict = STRINGS[lang] || STRINGS.en;
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function(b){
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem("tahara-lang", lang); } catch(e){}
  }

  document.querySelectorAll(".lang button").forEach(function(b){
    b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
  });

  var saved = "en";
  try { saved = localStorage.getItem("tahara-lang") || "en"; } catch(e){}
  if (saved === "ar") applyLang("ar");
})();

/* ═══ theme toggle — shared platform key ═══ */
(function(){
  var KEY = "tahara-theme";
  var btn = document.getElementById("themeTg");
  function apply(t){
    document.documentElement.dataset.theme = t;
    try{ localStorage.setItem(KEY, t); }catch(e){}
  }
  if (btn) btn.addEventListener("click", function(){
    apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
})();

  } finally {
    window.IntersectionObserver = _origIO;
    window.addEventListener = _origAdd;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
  };
}
