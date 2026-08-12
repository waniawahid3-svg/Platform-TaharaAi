/* Ported from the approved design file. */
export function initFramework(){
  const _ios = [];
  const _winHandlers = [];
  const _origIO = window.IntersectionObserver;
  const _trackedIO = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  window.IntersectionObserver = _trackedIO;
  const _origAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origAdd(t, fn, o); };
  try{

  document.querySelectorAll(".fwx img").forEach(function(img){
    function fb(){ img.style.display="none"; var f=img.nextElementSibling; if (f && f.tagName.toLowerCase()==="svg") f.style.display="block"; }
    img.addEventListener("error", fb);
    if (img.complete && img.naturalWidth === 0) fb();
  });

const FW = {

  'eu-ai-act': {
    name: 'EU AI Act',
    kind: 'Binding law',
    seal: 'EU',
    ring: 'REGULATION (EU) 2024/1689 · ',
    desc: 'Regulation (EU) 2024/1689. Risk-tiered, extraterritorial. Binds you if your output is used in the Union, regardless of where you are established.',
    meta: ['IN FORCE <b>01 AUG 2024</b>', 'PROVISIONS <b>113</b>', 'PENALTY CEILING <b style="color:var(--sig-major)">7% TURNOVER</b>'],
    kpis: [['113','Provisions'],['73','Operator-facing'],['62','Profile fields'],['2','Need interpretation']],
    count: '113 provisions',
    obligations: [

      { ref: 'Art. 6(2)',
        title: 'High-risk classification: Annex III',
        quote: '“AI systems referred to in Annex III shall be considered to be high-risk.”',
        control: {
          expr: `<span class="fld">system.is_ai_system</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">system.available_in_eu</span> <span class="op">||</span> <span class="fld">system.output_used_in_eu</span>
<span class="op">&&</span> size(<span class="fld">system.annex_iii_domains</span>) <span class="op">&gt;</span> <span class="lit">0</span>
<span class="op">&&</span> <span class="op">!</span>(<span class="lit">'none'</span> in <span class="fld">system.annex_iii_domains</span>)`,
          note: 'One of only <b>two</b> provisions in the whole Regulation that needs a model: to decide whether a free-text intended purpose falls inside an Annex III area. Everything else is a boolean.'
        },
        probes: [
          ['T0','Intended purpose extracted from your architecture doc and model card', 't0'],
          ['T1','Product marketing copy and API docs scanned for use-case language', 't1'],
          ['T2','Model registry read: what the deployed model is actually scored against', 't2']
        ],
        evidence: [
          ['conform','NOT ANNEX III','A <b>documented intended purpose</b>, human-attested, that falls outside all eight Annex III areas. A machine extraction is <b>not enough</b>. An exclusion here removes the entire high-risk regime, so it requires your signature.'],
          ['major','IS ANNEX III','Nothing to produce yet, but Articles 9–15, 17, 43, 48 and 49 now all engage. This obligation is a <b>gate</b>, not a control.']
        ],
        maps: ['ISO 42001 Cl. 6.1.4', 'ISO 42005 §5']
      },

      { ref: 'Art. 6(3)',
        title: 'Derogation from high-risk classification',
        quote: '“…shall not be considered high-risk where it does not pose a significant risk of harm… Notwithstanding, an AI system shall always be considered high-risk where it performs profiling of natural persons.”',
        control: {
          expr: `<span class="op">//</span> ADJUDICATED: interpretive
<span class="fld">system.annex_iii_profiling</span> <span class="op">==</span> <span class="lit">true</span>
  <span class="op">→</span> derogation UNAVAILABLE <span class="op">//</span> absolute bar, no balancing`,
          note: 'The final subparagraph is an <b>absolute bar</b>. Not a factor to be weighed. A hard stop. This is the provision most tools get wrong, and they get it wrong in the dangerous direction: clearing a system that should have been high-risk.'
        },
        probes: [
          ['T0','Model card and architecture read for evaluative language about individuals', 't0'],
          ['T2','Model output schema inspected: does it emit a per-person score, rank or grade?', 't2'],
          ['T2','Feature list read from the model registry: are personal attributes inputs?', 't2']
        ],
        evidence: [
          ['conform','DEROGATION AVAILABLE','<b>Documented assessment</b> against all four Art. 6(3) grounds, plus an attested statement that the system performs no profiling. Registration under Art. 49 is <b>still required</b>. The derogation does not exempt you from that.'],
          ['major','DEROGATION BARRED','No evidence will help. Profiling is dispositive. Proceed to the full high-risk regime.']
        ],
        maps: ['ISO 42001 Cl. 6.1.4', 'GDPR Art. 22']
      },

      { ref: 'Art. 9',
        title: 'Risk management system',
        quote: '“A risk management system shall be established, implemented, documented and maintained… as a continuous iterative process planned and run throughout the entire lifecycle.”',
        control: {
          expr: `IS_HIGH_RISK
<span class="op">&&</span> <span class="fld">org.role_provider</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">→</span> requires: <span class="fld">lifecycle.has_risk_management_system</span>`,
          note: 'Note the wording: <b>continuous iterative process</b>, not a document. A risk register with three entries from 2024 does not satisfy this, and an auditor will say so.'
        },
        probes: [
          ['T1','Document store and repo searched for a risk register, risk policy, FRIA', 't1'],
          ['T1','Ticketing system read for risk-review records. <b>When did you last run one?</b>', 't1'],
          ['T3','Review cadence measured against your own declared policy', 't2']
        ],
        evidence: [
          ['conform','OPERATING','A risk management <b>policy</b>, a populated <b>register</b>, and, the part that matters, <b>records of at least three review cycles</b> within the stated cadence. Having the policy is a ten-second check. Showing you followed it is the audit.'],
          ['minor','DOCUMENTED, NOT OPERATING','Policy and register exist; no review records in the observation window. <b>Minor NC.</b> Produce the last three review minutes, or run one.'],
          ['major','ABSENT','No AI-specific risk process. An ISO 27001 register does <b>not</b> satisfy this. It addresses information security risk, not risk to fundamental rights.']
        ],
        maps: ['ISO 42001 Cl. 6.1.2', 'ISO 23894 §6', 'NIST MAP-1.1']
      },

      { ref: 'Art. 12',
        title: 'Record-keeping',
        quote: '“High-risk AI systems shall technically allow for the automatic recording of events (logs) over the lifetime of the system.”',
        control: {
          expr: `IS_HIGH_RISK
<span class="op">→</span> requires: <span class="fld">lifecycle.has_automatic_logging</span> <span class="op">==</span> <span class="lit">true</span>`,
          note: 'This is the obligation continuous discovery is <b>best</b> at. A snapshot audit asks “is logging enabled?” and gets told yes. We watch the log sequence and notice when it <b>stops</b>.'
        },
        probes: [
          ['T2','Logging configuration read: enabled, retention period, immutability', 't2'],
          ['T3','Log <b>sequence completeness</b> checked: gaps, not contents', 't2'],
          ['T3','Retention verified against the period you declared', 't2']
        ],
        evidence: [
          ['conform','OPERATING','Logging config, retention policy, and a <b>continuous, gap-free sequence</b> over the observation window. The collector never reads log <i>contents</i>, only that the records exist and are unbroken.'],
          ['major','SEQUENCE GAP','Logging is configured but the trail has a <b>3-day hole</b>. Produce an incident record explaining it, or the control is not operating. This is exactly the failure a point-in-time audit cannot see.']
        ],
        maps: ['ISO 42001 A.6.2.8', 'ISO 27001 A.8.15']
      },

      { ref: 'Art. 14',
        title: 'Human oversight',
        quote: '“High-risk AI systems shall be designed… such that they can be effectively overseen by natural persons during the period in which they are in use.”',
        control: {
          expr: `IS_HIGH_RISK
<span class="op">→</span> requires: <span class="fld">system.human_oversight_possible</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">system.autonomy_level</span> <span class="op">!=</span> <span class="lit">'fully_autonomous'</span>`,
          note: 'The word doing the work is <b>effectively</b>. A human who rubber-stamps 98% of outputs is not oversight. They are a liability shield, and the Regulation anticipates that.'
        },
        probes: [
          ['T2','Decision pipeline inspected for an auto-action path that bypasses review', 't2'],
          ['T3','<b>Override rate measured.</b> If humans never disagree with the model, oversight is nominal.', 't2'],
          ['T3','Confidence thresholds read: is there an auto-reject above a score?', 't2']
        ],
        evidence: [
          ['conform','EFFECTIVE','A documented oversight procedure, <b>plus</b> an observed override rate that shows humans actually intervene. Both. A procedure alone proves nothing.'],
          ['minor','NOMINAL','Oversight exists on paper; the observed override rate is <b>under 2%</b>. Produce evidence the reviewer has authority, time and information to disagree, or accept the finding.'],
          ['major','BYPASSED','An auto-reject path operates above a confidence threshold with no human in the loop. That is an <b>autonomous adverse decision</b> about a natural person.']
        ],
        maps: ['ISO 42001 A.9.2', 'GDPR Art. 22', 'NIST MANAGE-2.2']
      }
    ]
  },

  'iso-42001': {
    name: 'ISO/IEC 42001:2023',
    kind: 'Certifiable standard',
    seal: '42',
    ring: 'AI MANAGEMENT SYSTEM · CERTIFIABLE · ',
    desc: 'An AI management system standard. Clauses 4–10 are mandatory; Annex A gives 38 controls you select and justify in a Statement of Applicability. The certifiable one.',
    meta: ['PUBLISHED <b>DEC 2023</b>', 'CLAUSES <b>4–10</b>', 'ANNEX A <b>38 CONTROLS</b>'],
    kpis: [['76','Requirements'],['38','Annex A controls'],['SoA','Central artefact'],['3yr','Cert cycle']],
    count: '76 requirements across Clauses 4–10 and Annex A',
    obligations: [

      { ref: 'Cl. 6.1.2',
        title: 'AI risk assessment',
        quote: '“The organization shall define and apply an AI risk assessment process that… produces consistent, valid and comparable results.”',
        control: {
          expr: `AIMS_IN_SCOPE
<span class="op">→</span> requires: <span class="fld">iso.risk_process_documented</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">iso.risk_criteria_defined</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">iso.risk_process_repeatable</span> <span class="op">==</span> <span class="lit">true</span>`,
          note: 'The word <b>consistent</b> is the requirement. Two assessors, same system, must reach the same risk rating, which means your criteria have to be written down, not held in someone\'s head.'
        },
        probes: [
          ['T1','Risk methodology document located and read', 't1'],
          ['T1','Risk register read: are ratings <b>justified</b>, or just asserted?', 't1'],
          ['T3','Consistency tested: same risk category, do ratings agree across entries?', 't2']
        ],
        evidence: [
          ['conform','OPERATING','Documented methodology with <b>defined criteria</b>, a populated register, and evidence of application across at least one full cycle. This is the seam with <b>EU AI Act Art. 9</b>: satisfy one and you have most of the other.'],
          ['minor','INCONSISTENT','A process exists but ratings are not reproducible. Produce your risk criteria, or the results are not <i>comparable</i> in the sense the clause requires.']
        ],
        maps: ['EU AI Act Art. 9', 'ISO 23894 §6', 'NIST MAP-1.1']
      },

      { ref: 'Cl. 9.2',
        title: 'Internal audit',
        quote: '“The organization shall conduct internal audits at planned intervals to provide information on whether the AI management system conforms…”',
        control: {
          expr: `AIMS_IN_SCOPE
<span class="op">→</span> requires: <span class="fld">iso.internal_audit_programme</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> count(<span class="fld">iso.audit_records</span>, window: <span class="lit">12mo</span>) <span class="op">&gt;</span> <span class="lit">0</span>`,
          note: '<b>This is where certifications fail.</b> Not because companies lack an audit programme, but because they have one and never ran it. The clause is satisfied by <b>records</b>, not by a plan.'
        },
        probes: [
          ['T1','Document store searched for internal audit reports', 't1'],
          ['T1','Ticketing read for audit-related work items and their closure', 't1'],
          ['T3','<b>Interval measured</b> against your own declared audit programme', 't2']
        ],
        evidence: [
          ['conform','OPERATING','An audit <b>programme</b>, plus <b>audit reports</b> covering the last planned interval, plus evidence that findings were <b>actioned</b>. All three. A report with open findings from 18 months ago is worse than no report.'],
          ['major','NO RECORDS','Programme exists; zero audits performed in 12 months. <b>Major NC.</b> This alone will stop a certification audit at the door. No argument rescues it.']
        ],
        maps: ['EU AI Act Art. 17', 'ISO 27001 Cl. 9.2']
      },

      { ref: 'A.4.2',
        title: 'AI system resources: access control',
        quote: '“The organization shall identify and provide resources for the AI system, including… controlled access to data, tooling and computing resources.”',
        control: {
          expr: `SOA_SELECTED(<span class="lit">'A.4.2'</span>)
<span class="op">→</span> requires: <span class="fld">iso.access_control_documented</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">discovery.iam_matches_policy</span> <span class="op">==</span> <span class="lit">true</span>`,
          note: 'This control is the <b>clearest case for continuous discovery</b> in the entire standard. The policy is static. IAM drifts every week. Only one of those two is observable.'
        },
        probes: [
          ['T2','<b>IAM principals enumerated</b> on model buckets, registries, training data', 't2'],
          ['T2','Each principal matched against the role the policy permits', 't2'],
          ['T2','Wildcard grants and service accounts flagged specifically', 't2'],
          ['T3','Access changes tracked over time: is drift happening?', 't2']
        ],
        evidence: [
          ['conform','OPERATING','An access-control policy, <b>and an IAM state that matches it</b>. Both, simultaneously, observed. This is the triangle: what you say, what you wrote, what is true.'],
          ['major','DRIFT','Policy says engineering only. IAM shows <b>14 principals, 3 outside engineering, 1 wildcard service account</b>. The documented control is not operating. Two findings, one delta: the drift itself, and the <b>Clause 7.3 awareness gap</b> that let the owner believe otherwise.']
        ],
        maps: ['EU AI Act Art. 15', 'ISO 27001 A.5.15', 'NIST GOVERN-1.3']
      }
    ]
  },

  'nist-ai-rmf': {
    name: 'NIST AI RMF 1.0',
    kind: 'Voluntary framework',
    seal: 'N',
    ring: 'GOVERN · MAP · MEASURE · MANAGE · ',
    desc: 'Voluntary, but the de-facto US baseline and increasingly referenced by Gulf regulators. Four functions: Govern, Map, Measure, Manage.',
    meta: ['PUBLISHED <b>JAN 2023</b>', 'FUNCTIONS <b>4</b>', 'STATUS <b>VOLUNTARY</b>'],
    kpis: [['37','Subcategories'],['4','Functions'],['0','Penalties'],['—','Not certifiable']],
    count: '37 subcategories across four functions',
    obligations: [

      { ref: 'GOVERN-1.1',
        title: 'Legal and regulatory requirements understood',
        quote: '“Legal and regulatory requirements involving AI are understood, managed, and documented.”',
        control: {
          expr: `<span class="op">// this framework maps ONTO the others</span>
<span class="fld">crosswalk.frameworks_identified</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">crosswalk.applicability_documented</span> <span class="op">==</span> <span class="lit">true</span>`,
          note: 'Amusingly, <b>this subcategory is satisfied by using this product</b>. The gap assessment <i>is</i> the documented understanding of which requirements apply.'
        },
        probes: [
          ['T0','Frameworks in scope, and the justification for each', 't0'],
          ['T1','Legal register located, if one exists', 't1']
        ],
        evidence: [
          ['conform','OPERATING','A documented determination of which frameworks bind you and why. Your <b>gap assessment report</b> satisfies this directly.']
        ],
        maps: ['ISO 42001 Cl. 4.2', 'EU AI Act Art. 4']
      },

      { ref: 'MEASURE-2.7',
        title: 'AI system security and resilience evaluated',
        quote: '“AI system security and resilience — as identified in the MAP function — are evaluated and documented.”',
        control: {
          expr: `<span class="fld">adversarial.probes_run</span> <span class="op">==</span> <span class="lit">true</span>
<span class="op">&&</span> <span class="fld">adversarial.results_documented</span> <span class="op">==</span> <span class="lit">true</span>`,
          note: 'This is the subcategory the <b>Adversarial surface</b> feeds. OWASP LLM Top 10 results map here directly.'
        },
        probes: [
          ['T4','OWASP LLM Top 10 probed on a schedule, <b>staging only</b>', 't2'],
          ['T3','Results trended over time, not just a point-in-time pass', 't2']
        ],
        evidence: [
          ['conform','OPERATING','Documented adversarial evaluation with <b>results over time</b>. A single pentest from last year is a point, not a trend.'],
          ['major','FAILING','Prompt injection succeeding at <b>39%</b>. Document the finding, the remediation, and re-probe. The evidence is the <b>closure</b>, not the discovery.']
        ],
        maps: ['EU AI Act Art. 15', 'ISO 42001 A.6.2.6']
      }
    ]
  }
};


(function(){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.1});
  document.querySelectorAll("[data-rv]").forEach(function(el){ io.observe(el); });
  window.__rv = io;
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
  document.getElementById("themeTg").addEventListener("click", function(){
    var t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    try{ localStorage.setItem("tahara-theme", t); }catch(e){}
  });
})();

function buildSealHTML(size, ring, core){
  var ticks = "";
  for (var i=0;i<36;i++){
    var a=(i*10)*Math.PI/180, maj=i%3===0, r1=43.5, r2=maj?40:41.8;
    ticks += '<line class="tick '+(maj?'maj':'')+'" x1="'+(60+r1*Math.cos(a)).toFixed(2)+'" y1="'+(60+r1*Math.sin(a)).toFixed(2)+'" x2="'+(60+r2*Math.cos(a)).toFixed(2)+'" y2="'+(60+r2*Math.sin(a)).toFixed(2)+'"/>';
  }
  var uid = Math.random().toString(36).slice(2,7);
  return '<div class="seal" style="width:'+size+'px;height:'+size+'px"><svg viewBox="0 0 120 120" width="'+size+'" height="'+size+'">'+
    '<defs><path id="sp'+uid+'" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"/>'+
    '<radialGradient id="sc'+uid+'" cx="50%" cy="40%" r="65%"><stop offset="0%" stop-color="#0E3D6E"/><stop offset="60%" stop-color="#062A52"/><stop offset="100%" stop-color="#041B3F"/></radialGradient></defs>'+
    '<circle class="rim-o" cx="60" cy="60" r="56"/><circle class="band" cx="60" cy="60" r="54.5"/><circle class="band" cx="60" cy="60" r="45.5"/>'+
    '<g class="ring"><text dy="1.6" textLength="314" lengthAdjust="spacing"><textPath href="#sp'+uid+'" textLength="314" lengthAdjust="spacing">'+ring+'</textPath></text></g>'+
    '<g>'+ticks+'</g>'+
    '<circle cx="60" cy="60" r="29" fill="url(#sc'+uid+')"/><circle class="core-r" cx="60" cy="60" r="29"/>'+
    '<text x="60" y="67.5" font-size="16" font-weight="700" text-anchor="middle" fill="#D8F4EA" font-family="Inter,sans-serif" letter-spacing="1">'+core+'</text>'+
    '</svg></div>';
}

(function(){
  var which = new URLSearchParams(location.search).get("fw") || "eu-ai-act";
  var f = FW[which] || FW["eu-ai-act"];

  document.title = f.name + " \u00b7 Tahara AI";
  document.getElementById("fwName").textContent = f.name;
  var kindEl = document.getElementById("fwKind");
  var kl = f.kind.toLowerCase();
  kindEl.textContent = f.kind.toUpperCase();
  kindEl.className = "kindchip " + (kl.indexOf("law")>-1 ? "law" : kl.indexOf("certifiable")>-1 ? "cert" : "guide");
  document.getElementById("fwDesc").textContent = f.desc;
  document.getElementById("fwCount").textContent = f.count;
  var ringTxt = f.ring; while (ringTxt.length < 62) ringTxt += f.ring;
  document.getElementById("fwSeal").outerHTML = buildSealHTML(118, ringTxt, f.seal);
  document.getElementById("fwMeta").innerHTML = f.meta.map(function(m){ return "<span>"+m+"</span>"; }).join("");

  document.getElementById("fwKpis").innerHTML = f.kpis.map(function(kv){
    var num = String(kv[0]), lab = kv[1];
    var m = num.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    var inner = m ? m[1] + '<span data-count="' + m[2] + '">0</span>' + m[3] : num;
    return '<div class="cell"><div class="n">' + inner + '</div><div class="l">' + lab + '</div></div>';
  }).join("");

  var STAGES = ["OBLIGATION","CONTROL","PROBE","EVIDENCE"];
  document.getElementById("obligations").innerHTML = f.obligations.map(function(o, oi){
    return '<div class="plate ob' + (oi===0 ? ' open' : '') + '" data-rv>' +
      '<div class="ob-h" role="button" tabindex="0">' +
        '<span class="ob-ref">' + o.ref + '</span>' +
        '<div class="ob-t"><h3>' + o.title + '</h3><div class="ob-sub">' + o.probes.length + ' PROBES \u00b7 ' + o.evidence.length + ' OUTCOMES</div></div>' +
        '<span class="chev"><svg viewBox="0 0 24 24" fill="none"><path d="m5 9 7 7 7-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '</div>' +
      '<div class="obw"><div class="obb">' +
        '<div class="q">' + o.quote + '</div>' +
        '<div class="pipe">' +
          '<div class="stage"><span class="sn">1</span><div class="sc">' +
            '<p class="sl">' + STAGES[0] + '</p>' +
            '<p class="stg-p" data-i18n="obFine">Verbatim, with citation, SHA-256 pinned. Any amendment flags every dependent report automatically.</p>' +
          '</div></div>' +
          '<div class="stage"><span class="sn">2</span><div class="sc">' +
            '<p class="sl">' + STAGES[1] + ' \u00b7 <b>COMPILED RULE</b></p>' +
            '<div class="rule">' + o.control.expr + '</div>' +
            '<p class="stg-note">' + o.control.note + '</p>' +
          '</div></div>' +
          '<div class="stage"><span class="sn">3</span><div class="sc">' +
            '<p class="sl">' + STAGES[2] + '</p>' +
            o.probes.map(function(p){
              return '<div class="pli"><span class="tier ' + p[2] + '">' + p[0] + '</span><span class="t">' + p[1] + '</span></div>';
            }).join("") +
          '</div></div>' +
          '<div class="stage"><span class="sn">4</span><div class="sc">' +
            '<p class="sl">' + STAGES[3] + '</p>' +
            o.evidence.map(function(e){
              return '<div class="ev ' + e[0] + '"><div class="f">\u25b8 IF ' + e[1] + '</div><div class="d">' + e[2] + '</div></div>';
            }).join("") +
          '</div></div>' +
        '</div>' +
        '<div class="xmap"><span class="l">ALSO SATISFIES</span>' +
          o.maps.map(function(m){ return '<span>' + m + '</span>'; }).join("") +
        '</div>' +
      '</div></div>' +
    '</div>';
  }).join("");

  document.querySelectorAll("#obligations [data-rv]").forEach(function(el){ window.__rv.observe(el); });

  /* stage-by-stage sweep reveal as the pipeline scrolls into view */
  var sio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add("vis"); sio.unobserve(e.target); }
    });
  }, {threshold:0, rootMargin:"0px 0px -4% 0px"});
  document.querySelectorAll(".stage").forEach(function(st){ sio.observe(st); });
  window.__stageIO = sio;

  document.querySelectorAll(".ob-h").forEach(function(h){
    function tog(){
      var ob = h.closest(".ob");
      ob.classList.toggle("open");
      if (ob.classList.contains("open")){
        requestAnimationFrame(function(){
          ob.querySelectorAll(".stage").forEach(function(st){
            var r = st.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0){
              st.classList.add("vis");
              if (window.__stageIO) window.__stageIO.unobserve(st);
            }
          });
        });
      }
    }
    h.addEventListener("click", tog);
    h.addEventListener("keydown", function(e){ if (e.key === "Enter" || e.key === " "){ e.preventDefault(); tog(); } });
  });

  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, to = parseFloat(el.dataset.count), t0 = null;
      var dec = (el.dataset.count.indexOf(".") > -1) ? 1 : 0;
      function stp(ts){
        if (!t0) t0 = ts;
        var p = Math.min((ts-t0)/900, 1);
        var v = to*(1-Math.pow(1-p,3));
        el.textContent = dec ? v.toFixed(dec) : Math.round(v);
        if (p<1) requestAnimationFrame(stp);
      }
      requestAnimationFrame(stp);
      cio.unobserve(el);
    });
  }, {threshold:.4});
  document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });
})();

(function(){
  var STRINGS = {
    en:{
      nOverview:"Overview", nGov:"Governance", nFw:"Frameworks", nDisc:"Discovery", nAdv:"Adversarial", nGuard:"Guardrails", signout:"Sign out",
      crumb:"\u2190 ALL FRAMEWORKS",
      eyeChain:"How a provision becomes a monitored control",
      h2Chain:"Obligation \u2192 Control \u2192 Probe \u2192 Evidence.",
      ledeChain:"Every provision in this framework is compiled into a rule the engine can evaluate, a probe that observes your live system, and a defined set of evidence that satisfies it. Below are the first few, in full.",
      ck1t:"Obligation", ck1p:"The provision as written. Verbatim, with its citation. We never paraphrase the law.",
      ck2t:"Control", ck2p:"A deterministic rule over your system profile. No model decides whether this applies.",
      ck3t:"Probe", ck3p:"What the collector reads from your live system to test whether the control is operating.",
      ck4t:"Evidence", ck4p:"What satisfies it, and what each possible finding demands you produce.",
      obFine:"Verbatim, with citation, SHA-256 pinned. Any amendment flags every dependent report automatically.",
      noteB:"This is an extract.", noteT:"Shown here are the first few obligations of",
      noteT2:"The full control library is compiled, hash-pinned and frozen at build time. Every provision gets the same four-stage treatment, and the build fails if any rule reads a profile field that was never declared."
    },
    ar:{
      nOverview:"\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629", nGov:"\u0627\u0644\u062d\u0648\u0643\u0645\u0629", nFw:"\u0627\u0644\u0623\u064f\u0637\u0631", nDisc:"\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641", nAdv:"\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a", nGuard:"\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u062d\u0645\u0627\u064a\u0629", signout:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
      crumb:"\u2192 \u0643\u0644 \u0627\u0644\u0623\u064f\u0637\u0631",
      eyeChain:"\u0643\u064a\u0641 \u064a\u0635\u0628\u062d \u0627\u0644\u0628\u0646\u062f \u0636\u0627\u0628\u0637\u064b\u0627 \u0645\u064f\u0631\u0627\u0642\u064e\u0628\u064b\u0627",
      h2Chain:"\u0627\u0644\u062a\u0632\u0627\u0645 \u2190 \u0636\u0627\u0628\u0637 \u2190 \u0645\u0633\u0628\u0627\u0631 \u2190 \u062f\u0644\u064a\u0644.",
      ledeChain:"\u0643\u0644 \u0628\u0646\u062f \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0625\u0637\u0627\u0631 \u064a\u064f\u062a\u0631\u062c\u0645 \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u064a\u0642\u064a\u0651\u0645\u0647\u0627 \u0627\u0644\u0645\u062d\u0631\u0643\u060c \u0648\u0645\u0633\u0628\u0627\u0631 \u064a\u0631\u0627\u0642\u0628 \u0646\u0638\u0627\u0645\u0643 \u0627\u0644\u062d\u064a\u060c \u0648\u0645\u062c\u0645\u0648\u0639\u0629 \u0623\u062f\u0644\u0629 \u0645\u062d\u062f\u062f\u0629 \u062a\u0641\u064a \u0628\u0647. \u0623\u062f\u0646\u0627\u0647 \u0627\u0644\u0623\u0645\u062b\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0643\u0627\u0645\u0644\u0629.",
      ck1t:"\u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645", ck1p:"\u0627\u0644\u0628\u0646\u062f \u0643\u0645\u0627 \u0643\u064f\u062a\u0628\u060c \u062d\u0631\u0641\u064a\u064b\u0627 \u0645\u0639 \u0645\u0631\u062c\u0639\u0647. \u0644\u0627 \u0646\u0639\u064a\u062f \u0635\u064a\u0627\u063a\u0629 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0623\u0628\u062f\u064b\u0627.",
      ck2t:"\u0627\u0644\u0636\u0627\u0628\u0637", ck2p:"\u0642\u0627\u0639\u062f\u0629 \u062d\u062a\u0645\u064a\u0629 \u0639\u0644\u0649 \u0645\u0644\u0641 \u0646\u0638\u0627\u0645\u0643. \u0644\u0627 \u0646\u0645\u0648\u0630\u062c \u064a\u0642\u0631\u0631 \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646 \u064a\u0646\u0637\u0628\u0642.",
      ck3t:"\u0627\u0644\u0645\u0633\u0628\u0627\u0631", ck3p:"\u0645\u0627 \u064a\u0642\u0631\u0623\u0647 \u0627\u0644\u0645\u064f\u062c\u0645\u0651\u0639 \u0645\u0646 \u0646\u0638\u0627\u0645\u0643 \u0627\u0644\u062d\u064a \u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0639\u0645\u0644 \u0627\u0644\u0636\u0627\u0628\u0637.",
      ck4t:"\u0627\u0644\u062f\u0644\u064a\u0644", ck4p:"\u0645\u0627 \u064a\u0641\u064a \u0628\u0647\u060c \u0648\u0645\u0627 \u062a\u0637\u0644\u0628\u0647 \u0643\u0644 \u0646\u062a\u064a\u062c\u0629 \u0645\u062d\u062a\u0645\u0644\u0629 \u0645\u0646\u0643.",
      obFine:"\u062d\u0631\u0641\u064a\u064b\u0627\u060c \u0645\u0639 \u0627\u0644\u0645\u0631\u062c\u0639\u060c \u0645\u062b\u0628\u0651\u062a \u0628\u0628\u0635\u0645\u0629 SHA-256. \u0623\u064a \u062a\u0639\u062f\u064a\u0644 \u064a\u064f\u0639\u0644\u0651\u0645 \u0643\u0644 \u062a\u0642\u0631\u064a\u0631 \u0645\u0639\u062a\u0645\u062f \u0639\u0644\u064a\u0647 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627.",
      noteB:"\u0647\u0630\u0627 \u0645\u0642\u062a\u0637\u0641.", noteT:"\u0627\u0644\u0645\u0639\u0631\u0648\u0636 \u0647\u0646\u0627 \u0623\u0648\u0644\u0649 \u0627\u0644\u062a\u0632\u0627\u0645\u0627\u062a",
      noteT2:"\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0636\u0648\u0627\u0628\u0637 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u062a\u064f\u062c\u0645\u0651\u0639 \u0648\u062a\u064f\u062b\u0628\u0651\u062a \u0628\u0627\u0644\u0628\u0635\u0645\u0629 \u0648\u062a\u064f\u062c\u0645\u0651\u062f \u0639\u0646\u062f \u0627\u0644\u0628\u0646\u0627\u0621. \u0643\u0644 \u0628\u0646\u062f \u064a\u0645\u0631 \u0628\u0627\u0644\u0645\u0631\u0627\u062d\u0644 \u0627\u0644\u0623\u0631\u0628\u0639 \u0646\u0641\u0633\u0647\u0627\u060c \u0648\u064a\u0641\u0634\u0644 \u0627\u0644\u0628\u0646\u0627\u0621 \u0625\u0630\u0627 \u0642\u0631\u0623\u062a \u0642\u0627\u0639\u062f\u0629 \u062d\u0642\u0644\u064b\u0627 \u063a\u064a\u0631 \u0645\u0639\u0644\u0646."
    }
  };
  function applyLang(lang){
    var dict = STRINGS[lang] || STRINGS.en;
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function(b){
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
  }
  document.querySelectorAll(".lang button").forEach(function(b){
    b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
  });
  var saved = "en";
  try{ saved = localStorage.getItem("tahara-lang") || "en"; }catch(e){}
  if (saved === "ar") applyLang("ar");
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
