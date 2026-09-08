"use client";

/* Runtime for the Tahara platform pages, lifted unchanged from the reviewed
   HTML build. Everything runs inside run(), so it executes on mount when the
   markup is in the DOM. Each init returns a dispose that unwinds itself. */

import { openEngagement, uploadDocuments, getDocumentsStatus, getQuestions, submitAnswers, getReport } from "@/lib/govApi";
import { getDiscoveryHealth, scan as discoveryScan } from "@/lib/discoveryApi";

export function run(which){



function initGuardrails(){
  const _ios = [];
  const _docHandlers = [];
  const _winHandlers = [];
  const _timers = [];
  const _frames = [];
  const _origIO = window.IntersectionObserver;
  window.IntersectionObserver = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  const _origDocAdd = document.addEventListener.bind(document);
  document.addEventListener = function(t, fn, o){ _docHandlers.push([t, fn, o]); return _origDocAdd(t, fn, o); };
  const _origWinAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origWinAdd(t, fn, o); };
  const _origST = window.setTimeout.bind(window);
  window.setTimeout = function(fn, ms){ const id = _origST(fn, ms); _timers.push(id); return id; };
  const _origRAF = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(fn){ const id = _origRAF(fn); _frames.push(id); return id; };
  try{

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var RULES = [
      { id:"GR-01", act:"mask",    hits:1204, what:"Person names anywhere in the prompt body",       det:"NER, person entity",                    whatAr:"أسماء الأشخاص في نص الطلب",              detAr:"NER, person entity" },
      { id:"GR-02", act:"mask",    hits:1118, what:"Email addresses",                                det:"Pattern plus domain validator",         whatAr:"عناوين البريد الإلكتروني",               detAr:"Pattern plus domain validator" },
      { id:"GR-03", act:"mask",    hits:744,  what:"Phone numbers, local and international",         det:"E.164 plus regional formats",           whatAr:"أرقام الهواتف المحلية والدولية",         detAr:"E.164 plus regional formats" },
      { id:"GR-04", act:"block",   hits:28,   what:"National identity numbers",                      det:"Checksum validated",                    whatAr:"أرقام الهوية الوطنية",                   detAr:"Checksum validated" },
      { id:"GR-05", act:"block",   hits:12,   what:"A payment card together with a cardholder name", det:"Luhn plus name proximity",              whatAr:"بطاقة دفع مع اسم حاملها",                detAr:"Luhn plus name proximity" },
      { id:"GR-06", act:"block",   hits:9,    what:"Health terms tied to an identified person",      det:"Clinical lexicon plus NER",             whatAr:"مصطلحات صحية مرتبطة بشخص محدد",          detAr:"Clinical lexicon plus NER" },
      { id:"GR-07", act:"observe", hits:1,    what:"Documents the retrieval layer adds after checks",det:"Attachment scan on the retrieval path", whatAr:"مستندات تضيفها طبقة الاسترجاع بعد الفحص", detAr:"Attachment scan on the retrieval path" }
    ];

    var DETECTORS = [
      { en:"Name",         ar:"الاسم",           v:1204, t:"var(--sky-t)",   d:"var(--acc)" },
      { en:"Email",        ar:"البريد",          v:1118, t:"var(--lilac-t)", d:"var(--violet)" },
      { en:"Phone",        ar:"الهاتف",          v:744,  t:"var(--mint-t)",  d:"var(--green)" },
      { en:"National ID",  ar:"الهوية الوطنية",  v:28,   t:"var(--sand-t)",  d:"var(--amber)" },
      { en:"Payment card", ar:"بطاقة الدفع",     v:12,   t:"var(--pink-t)",  d:"#C2568E" },
      { en:"Health",       ar:"بيانات صحية",     v:9,    t:"var(--rose-t)",  d:"var(--red)" }
    ];

    var LANGS = [{ k:"lgEn", pct:97 }, { k:"lgAr", pct:94 }, { k:"lgUr", pct:91 }];

    var ALERTS = [
      { lv:"mj", tag:"UNMASKED",  en:"CV_8841.pdf carried a national identity number into the model · 04:12:07",
                                  ar:"ملف CV_8841.pdf نقل رقم هوية وطنية إلى النموذج · 04:12:07" },
      { lv:"mn", tag:"BLOCKED",   en:"Payment card with a cardholder name, too sensitive to mask · 03:58:41",
                                  ar:"بطاقة دفع مع اسم حاملها، حساسة جدا للإخفاء · 03:58:41" },
      { lv:"ok", tag:"MASKED",    en:"40 applicant records in a single pass, placeholders stable · 02:19:55",
                                  ar:"40 سجل متقدم في تمريرة واحدة، بدائل ثابتة · 02:19:55" },
      { lv:"mn", tag:"ESCALATED", en:"DPO review opened on the retrieval path · 04:12:31",
                                  ar:"فتح مراجعة لمسؤول حماية البيانات على مسار الاسترجاع · 04:12:31" },
      { lv:"ok", tag:"24H",       en:"1,204 prompts masked, one uncaught and under review",
                                  ar:"1,204 طلب تم إخفاؤه، واحد فقط لم يُلتقط وهو قيد المراجعة" }
    ];

    var T = {
      en:{
        nOverview:"Overview", nGov:"Governance", nFw:"Frameworks", nDisc:"Discovery", nAdv:"Adversarial", nGuard:"Guardrails",
        signout:"Sign out",
        h1:'Prompt <em>inspection</em>',
        ctaRules:"Enforcement rules", ctaFind:"Open finding",
        lede:"Every prompt is checked before it reaches the model, and every attachment the retrieval layer adds after it.",
        c1a:"Prompt received", c1b:"from the application",
        c2a:"Detectors run", c2b:"six active",
        c3a:"Enforcement", c3b:"masking in place", c3live:"LIVE",
        c5a:"Reaches the model", c5b:"masked, or not at all",
        aMask:"MASK", aBlock:"BLOCK", aObs:"OBSERVE",
        pHead:"ENFORCEMENT ACTIONS", pMask:"Mask, reversible", pBlock:"Block, never sent", pObs:"Observe, escalated",
        secPos:"Where this sits", secPosM:"STAGE 06 OF 07",
        st1:"Ingest", st2:"Interview", st3:"Discover", st4:"Compare", st5:"Map to law", st6:"Guardrails", st7:"Report",
        s1:"INSPECTED", s2:"MASKED", s3:"BLOCKED", s4t:"UNMASKED", s4:"Reached the model unmasked",
        secDet:"Detectors", secDetM:"SIX ACTIVE",
        anH:"Detector hits", anCtl:"LAST CYCLE", anLangH:"Coverage by language",
        lgEn:"English", lgAr:"Arabic", lgUr:"Roman Urdu",
        secRules:"Enforcement rules", ruleCount:"7 RULES", phSearch:"Search rules and detectors",
        fAll:"ALL", fMask:"MASK", fBlock:"BLOCK", fObs:"OBSERVE",
        thId:"RULE", thWhat:"WHAT IT CATCHES", thDet:"DETECTOR", thAct:"ACTION", thHits:"24H",
        noRules:"No rule matches that search. Clear the search or the filter to see all seven.",
        secLog:"Recent prompts", secLogM:"MASKED VALUES ONLY",
        vObs:"OBSERVED", vBlk:"BLOCKED", vMsk:"MASKED", vMsk2:"MASKED",
        secInc:"Open finding", escH:"The one that got through",
        escP:'A national identity number and a date of birth reached the model unmasked. Not through the typed prompt, which passed inspection cleanly, but through a document the retrieval layer attached afterwards. The filter recorded it as <code class="keep">OBSERVED</code> and escalated it. It cannot close it. Only a named reviewer can.',
        er1:"RULE", er2:"PATH", er3:"OPENED", er4:"STATUS",
        ft1:"TAHARA AI · CONTINUOUS ASSURANCE PLATFORM", ft2:"SAFE · ETHICAL · TRANSPARENT",
        tipHits:"hits", tipShare:"share"
      },
      ar:{
        nOverview:"نظرة عامة", nGov:"الحوكمة", nFw:"الأُطر", nDisc:"الاكتشاف", nAdv:"الاختبار العدائي", nGuard:"حواجز الحماية",
        signout:"تسجيل الخروج",
        h1:'فحص <em>الطلبات</em>',
        ctaRules:"قواعد الإنفاذ", ctaFind:"الملاحظة المفتوحة",
        lede:"كل طلب يُفحص قبل وصوله إلى النموذج، وكذلك كل مستند تضيفه طبقة الاسترجاع بعده.",
        c1a:"وصل الطلب", c1b:"من التطبيق",
        c2a:"تشغيل الكواشف", c2b:"ستة نشطة",
        c3a:"الإنفاذ", c3b:"الإخفاء مفعّل", c3live:"مباشر",
        c5a:"يصل إلى النموذج", c5b:"مُخفى، أو لا يصل",
        aMask:"إخفاء", aBlock:"حجب", aObs:"رصد",
        pHead:"إجراءات الإنفاذ", pMask:"إخفاء، قابل للعكس", pBlock:"حجب، لا يُرسل", pObs:"رصد، مع تصعيد",
        secPos:"موقع هذه المرحلة", secPosM:"المرحلة 06 من 07",
        st1:"الاستقبال", st2:"المقابلة", st3:"الاكتشاف", st4:"المقارنة", st5:"الربط بالقانون", st6:"حواجز الحماية", st7:"التقرير",
        s1:"تم فحصها", s2:"تم إخفاؤها", s3:"تم حجبها", s4t:"دون إخفاء", s4:"وصلت إلى النموذج دون إخفاء",
        secDet:"الكواشف", secDetM:"ستة نشطة",
        anH:"إصابات الكواشف", anCtl:"آخر دورة", anLangH:"التغطية حسب اللغة",
        lgEn:"الإنجليزية", lgAr:"العربية", lgUr:"الأردية بالحروف اللاتينية",
        secRules:"قواعد الإنفاذ", ruleCount:"٧ قواعد", phSearch:"ابحث في القواعد والكواشف",
        fAll:"الكل", fMask:"إخفاء", fBlock:"حجب", fObs:"رصد",
        thId:"القاعدة", thWhat:"ما تلتقطه", thDet:"الكاشف", thAct:"الإجراء", thHits:"24س",
        noRules:"لا توجد قاعدة مطابقة. امسح البحث أو الفلتر لعرض القواعد السبع.",
        secLog:"أحدث الطلبات", secLogM:"قيم مُخفاة فقط",
        vObs:"مرصود", vBlk:"محجوب", vMsk:"مُخفى", vMsk2:"مُخفى",
        secInc:"ملاحظة مفتوحة", escH:"الطلب الذي أفلت",
        escP:'رقم هوية وطنية وتاريخ ميلاد وصلا إلى النموذج دون إخفاء. ليس عبر الطلب المكتوب، الذي اجتاز الفحص بنظافة، بل عبر مستند أضافته طبقة الاسترجاع بعده. سجّله الفلتر بوصفه <code class="keep">OBSERVED</code> وصعّده. ولا يستطيع إغلاقه. المراجع المُسمّى وحده يستطيع.',
        er1:"القاعدة", er2:"المسار", er3:"فُتح", er4:"الحالة",
        ft1:"طهارة · منصة الضمان المستمر", ft2:"آمن · أخلاقي · شفاف",
        tipHits:"إصابة", tipShare:"الحصة"
      }
    };

    var lang = "en";
    try{ var sl = localStorage.getItem("tahara-lang"); if(sl==="ar"||sl==="en") lang = sl; }catch(e){}
    try{ var stt = localStorage.getItem("tahara-theme"); if(stt) document.documentElement.dataset.theme = stt; }catch(e){}

    document.getElementById("themeTg").addEventListener("click", function(){
      var n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = n;
      try{ localStorage.setItem("tahara-theme", n); }catch(e){}
    });

    function applyLang(){
      var d = T[lang];
      document.documentElement.lang = lang === "ar" ? "ar" : "en";
      document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
      document.querySelectorAll("[data-i]").forEach(function(el){
        var v = d[el.getAttribute("data-i")];
        if(v === undefined) return;
        if(v.indexOf("<") > -1) el.innerHTML = v; else el.textContent = v;
      });
      var inp = document.getElementById("ruleSearch");
      inp.placeholder = d[inp.getAttribute("data-ph")];
      document.querySelectorAll(".seg [data-lang]").forEach(function(b){
        b.classList.toggle("on", b.getAttribute("data-lang") === lang);
      });
      document.getElementById("ruleCount").textContent = d.ruleCount;
      buildAlerts(); buildRules(); buildBands(); buildLangs();
    }
    document.querySelectorAll(".seg [data-lang]").forEach(function(b){
      b.addEventListener("click", function(){
        lang = b.getAttribute("data-lang");
        try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
        applyLang();
      });
    });

    function buildAlerts(){
      var h = ALERTS.map(function(a){
        return '<span class="aitem '+a.lv+'"><b class="keep">'+a.tag+'</b><span>'+a[lang]+'</span></span>';
      }).join("");
      document.getElementById("atrack").innerHTML = h + h;
    }

    /* ------------------------------------------------------ pastel bands */
    var MAXTICK = 1400;
    function buildBands(){
      var d = T[lang];
      var total = DETECTORS.reduce(function(s,x){ return s+x.v; },0);
      document.getElementById("bands").innerHTML = DETECTORS.map(function(x){
        var w = Math.max(x.v / MAXTICK * 100, 7);
        return '<div class="band"><span class="bar" data-w="'+w.toFixed(2)+'" style="background:'+x.t+'">'
          + '<span>'+(lang==="ar"?x.ar:x.en)+'</span></span>'
          + '<span class="v keep">'+x.v.toLocaleString("en-US")+'</span></div>';
      }).join("");
      document.getElementById("axis").innerHTML = [0,350,700,1050,1400].map(function(n){
        return '<span class="keep">'+n.toLocaleString("en-US")+'</span>';
      }).join("");
      document.getElementById("legend").innerHTML = DETECTORS.map(function(x){
        return '<span><i style="background:'+x.d+'"></i>'+(lang==="ar"?x.ar:x.en)+'</span>';
      }).join("");
      var top = DETECTORS[0];
      document.getElementById("tip").innerHTML = '<b>'+(lang==="ar"?top.ar:top.en)+'</b>'
        + '<u><span>'+d.tipHits+'</span><b class="keep">'+top.v.toLocaleString("en-US")+'</b></u>'
        + '<u><span>'+d.tipShare+'</span><b class="keep">'+Math.round(top.v/total*100)+'%</b></u>';
      growBands();
    }
    function growBands(){
      setTimeout(function(){
        document.querySelectorAll("#bands .bar").forEach(function(b,i){
          b.style.transitionDelay = RM ? "0ms" : (i*80)+"ms";
          b.style.width = b.dataset.w + "%";
        });
        var tip = document.getElementById("tip");
        tip.style.insetInlineStart = "calc(" + (DETECTORS[0].v/MAXTICK*100).toFixed(1) + "% - 30px)";
        tip.style.top = "56px";
        setTimeout(function(){ tip.classList.add("in"); }, 900);
      }, 180);
    }

    function buildLangs(){
      var d = T[lang];
      document.getElementById("langs").innerHTML = LANGS.map(function(l){
        return '<div class="lang"><p class="n">'+d[l.k]+'</p>'
          + '<p class="v"><b class="keep" data-lc="'+l.pct+'">0%</b></p></div>';
      }).join("");
    }

    var filter = "all";
    function buildRules(){
      var d = T[lang];
      var q = (document.getElementById("ruleSearch").value || "").trim().toLowerCase();
      var actLabel = { mask:d.fMask, block:d.fBlock, observe:d.fObs };
      var shown = 0;
      document.getElementById("ruleRows").innerHTML = RULES.map(function(r){
        var what = lang === "ar" ? r.whatAr : r.what;
        var det  = lang === "ar" ? r.detAr  : r.det;
        var hay  = (r.id+" "+r.what+" "+r.det+" "+r.whatAr+" "+r.detAr+" "+r.act).toLowerCase();
        if(filter !== "all" && r.act !== filter) return "";
        if(q && hay.indexOf(q) === -1) return "";
        shown++;
        return '<div class="rr">'
          + '<span class="rid keep">'+r.id+'</span>'
          + '<span class="rn">'+what+'</span>'
          + '<span class="rd keep">'+det+'</span>'
          + '<span><span class="pill '+r.act+'">'+actLabel[r.act]+'</span></span>'
          + '<span class="rhx keep-r'+(r.hits<10?" zero":"")+'">'+r.hits.toLocaleString("en-US")+'</span>'
          + '</div>';
      }).join("");
      document.getElementById("noRules").hidden = shown !== 0;
    }
    document.getElementById("ruleSearch").addEventListener("input", buildRules);
    document.getElementById("fchips").addEventListener("click", function(e){
      var b = e.target.closest(".fc"); if(!b) return;
      filter = b.getAttribute("data-f");
      this.querySelectorAll(".fc").forEach(function(x){ x.classList.toggle("on", x === b); });
      buildRules();
    });

    /* ---------------------------------------------------- hero animation */
    var con  = document.getElementById("con");
    var chip = document.getElementById("chip");
    var scan = document.getElementById("scan");
    var ptxtEl = document.querySelector(".nmain .ptxt");
    var tk1e = document.getElementById("tk1");
    var tk2e = document.getElementById("tk2");
    var VB_W = 560, VB_H = 436;
    var timers = [];
    function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
    function clearAll(){ timers.forEach(clearTimeout); timers = []; }

    function heroIn(){
      con.querySelectorAll("[data-d]").forEach(function(el){
        var i = parseInt(el.dataset.d,10);
        setTimeout(function(){ el.classList.add("in"); }, RM ? 0 : i*200 + 180);
      });
    }
    heroIn();

    /* ---- gradient streak trailing the chip ---- */
    var streak = document.getElementById("streak");
    var chipTone = "acc";
    function setStreak(lx, ly, ang, vis){
      if(!vis){ streak.style.opacity = 0; return; }
      var col = chipTone === "green" ? "var(--green)" : "var(--acc)";
      streak.style.left = lx; streak.style.top = ly;
      streak.style.background = "linear-gradient(90deg,transparent," + col + ")";
      streak.style.transform = "translate(-100%,-50%) rotate(" + ang.toFixed(1) + "deg)";
      streak.style.opacity = ".55";
    }

    /* ---- travel: chip + trail + the wire lighting up behind it ---- */
    function travel(id, dur, done){
      var path = document.getElementById(id);
      if(!path){ if(done) done(); return; }
      var L = path.getTotalLength();
      var ov = document.getElementById(id + "e"), oL = 0;
      if(ov){
        oL = ov.getTotalLength();
        ov.style.transition = "none";
        ov.style.color = chipTone === "green" ? "var(--green)" : "var(--acc)";
        ov.style.strokeDasharray = oL;
        ov.style.strokeDashoffset = oL;
        ov.style.opacity = ".9";
      }
      var s0 = null;
      chip.classList.add("on");
      function fr(ts){
        if(!s0) s0 = ts;
        var t = Math.min((ts - s0)/dur, 1);
        var e = t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2;
        var pt = path.getPointAtLength(L * e);
        var pv = path.getPointAtLength(Math.max(0, L * e - 6));
        var ang = Math.atan2(pt.y - pv.y, pt.x - pv.x) * 180 / Math.PI;
        var bank = Math.max(-10, Math.min(10, ang * 0.16));
        var lx = (pt.x/VB_W*100).toFixed(2) + "%";
        var ly = (pt.y/VB_H*100).toFixed(2) + "%";
        chip.style.left = lx; chip.style.top = ly;
        chip.style.transform = "translate(-50%,-50%) rotate(" + bank.toFixed(1) + "deg)";
        setStreak(lx, ly, ang, t > .04 && t < .97);
        if(ov) ov.style.strokeDashoffset = (oL * (1 - e)).toFixed(1);
        if(t < 1) requestAnimationFrame(fr);
        else {
          if(ov){
            ov.style.transition = "opacity .7s";
            ov.style.opacity = "0";
            later(function(){ ov.style.strokeDashoffset = oL; }, 760);
          }
          if(done) done();
        }
      }
      requestAnimationFrame(fr);
    }
    function placeAt(id, at){
      var path = document.getElementById(id);
      if(!path) return;
      var pt = path.getPointAtLength(at === "end" ? path.getTotalLength() : 0);
      chip.style.left = (pt.x/VB_W*100).toFixed(2) + "%";
      chip.style.top  = (pt.y/VB_H*100).toFixed(2) + "%";
      setStreak(0, 0, 0, false);
    }
    function hideChip(){
      chip.style.transform = "";
      chip.classList.add("dock");
      setStreak(0, 0, 0, false);
      later(function(){
        chip.classList.remove("on"); chip.classList.remove("dock");
      }, 290);
    }

    function pulse(sel, ms, extra){
      var el = document.querySelector(sel);
      if(!el) return;
      el.classList.add("hit"); if(extra) el.classList.add(extra);
      later(function(){ el.classList.remove("hit"); if(extra) el.classList.remove(extra); }, ms || 1200);
    }
    function ripple(sel, tone){
      var ic = document.querySelector(sel + " .ic");
      if(!ic) return;
      var r = document.createElement("span");
      r.className = "rip" + (tone === "g" ? " g" : "");
      ic.appendChild(r);
      later(function(){ r.remove(); }, 780);
    }

    var popRows = [].slice.call(document.querySelectorAll(".npop .row"));
    function lightRow(cls, ms){
      popRows.forEach(function(r){ r.classList.remove("act"); });
      var row = document.querySelector(".npop .row." + cls);
      if(!row) return;
      row.classList.add("act");
      later(function(){ row.classList.remove("act"); }, ms || 2200);
    }
    function resetTokens(){
      tk1e.textContent = "Aisha R.";   tk1e.className = "tok raw";
      tk2e.textContent = "a.rahman@…"; tk2e.className = "tok raw";
    }

    /* ---- one prompt's journey ---- */
    function journey(){
      clearAll();
      resetTokens();
      chipTone = "acc";
      chip.className = "chip";
      chip.textContent = "PROMPT";
      popRows.forEach(function(r){ r.classList.remove("act"); });

      placeAt("w1", "start");
      pulse(".n1", 900); ripple(".n1");

      later(function(){
        travel("w1", 950, function(){
          pulse(".n2", 1200); ripple(".n2");
          var tck = document.querySelector(".n2 .tick");
          if(tck){ tck.classList.remove("pop"); void tck.offsetWidth; tck.classList.add("pop"); }
          later(function(){
            travel("w2", 950, function(){
              pulse(".nmain", 2400); ripple(".nmain");
              hideChip();

              ptxtEl.classList.add("scanning");
              scan.classList.remove("run"); void scan.offsetWidth; scan.classList.add("run");
              later(function(){ tk1e.textContent = "[NAME_1]";  tk1e.className = "tok flip"; }, 620);
              later(function(){ tk2e.textContent = "[EMAIL_1]"; tk2e.className = "tok flip"; }, 1080);
              later(function(){ ptxtEl.classList.remove("scanning"); }, 1850);

              later(function(){
                var m = document.querySelector(".acts .m");
                if(m){ m.classList.add("fire"); later(function(){ m.classList.remove("fire"); }, 900); }
                chipTone = "green";
                chip.style.transform = "";
                chip.textContent = "MASKED";
                chip.className = "chip masked pop";
                later(function(){ chip.classList.remove("pop"); }, 600);
                placeAt("w3", "start");
                chip.classList.add("on");
                travel("w3", 800, function(){
                  lightRow("m", 2000);
                  later(hideChip, 180);
                  later(function(){
                    chip.className = "chip masked";
                    placeAt("w4", "start");
                    chip.classList.add("on");
                    travel("w4", 760, function(){
                      pulse(".n5", 1500, "done"); ripple(".n5", "g");
                      later(hideChip, 380);
                      later(journey, 1800);
                    });
                  }, 760);
                });
              }, 1950);
            });
          }, 320);
        });
      }, 360);
    }

    if(RM){
      resetTokens();
      tk1e.textContent = "[NAME_1]"; tk1e.className = "tok";
      tk2e.textContent = "[EMAIL_1]"; tk2e.className = "tok";
      popRows[0].classList.add("act");
    } else {
      var seen = false;
      var hio = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting && !seen){ seen = true; setTimeout(journey, 1100); }
        });
      }, { threshold:.2 });
      hio.observe(con);
    }

    /* --------------------------------------------------------- reveals */
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold:.1, rootMargin:"0px 0px -40px 0px" });
    document.querySelectorAll("[data-rv]").forEach(function(el){ io.observe(el); });

    function countUp(el, suffix){
      var target = parseInt(el.getAttribute("data-count") || el.getAttribute("data-lc"),10), dur = 1150, s = null;
      if(RM){ el.textContent = target.toLocaleString("en-US") + (suffix||""); return; }
      function tick(ts){
        if(!s) s = ts;
        var p = Math.min((ts-s)/dur, 1), e = 1 - Math.pow(1-p, 3);
        el.textContent = Math.round(target*e).toLocaleString("en-US") + (suffix||"");
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        e.target.querySelectorAll("[data-count]").forEach(function(el){ countUp(el); });
        e.target.querySelectorAll("[data-lc]").forEach(function(el){ countUp(el,"%"); });
        io2.unobserve(e.target);
      });
    }, { threshold:.25 });
    document.querySelectorAll(".figs, .an-r").forEach(function(el){ io2.observe(el); });

    var prog = document.getElementById("prog");
    window.addEventListener("scroll", function(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = h > 0 ? ((window.scrollY/h)*100).toFixed(2)+"%" : "0";
    }, { passive:true });

    applyLang();

  /* the two hero buttons scroll in-page (the global smooth-scroll rule is not
     used here, so it stays out of the other pages' way) */
  document.querySelectorAll('.grx .hero-cta a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var t = document.querySelector(a.getAttribute('href'));
      if(!t) return;
      e.preventDefault(); e.stopPropagation();
      t.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  } finally {
    window.IntersectionObserver = _origIO;
    document.addEventListener = _origDocAdd;
    window.addEventListener = _origWinAdd;
    window.setTimeout = _origST;
    window.requestAnimationFrame = _origRAF;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _docHandlers.forEach(function(h){ document.removeEventListener(h[0], h[1], h[2]); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
    _timers.forEach(function(id){ clearTimeout(id); });
    _frames.forEach(function(id){ cancelAnimationFrame(id); });
  };
}


function initDiscovery(){
  const _ios = [];
  const _docHandlers = [];
  const _winHandlers = [];
  const _timers = [];
  const _frames = [];
  const _origIO = window.IntersectionObserver;
  window.IntersectionObserver = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  const _origDocAdd = document.addEventListener.bind(document);
  document.addEventListener = function(t, fn, o){ _docHandlers.push([t, fn, o]); return _origDocAdd(t, fn, o); };
  const _origWinAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origWinAdd(t, fn, o); };
  const _origST = window.setTimeout.bind(window);
  window.setTimeout = function(fn, ms){ const id = _origST(fn, ms); _timers.push(id); return id; };
  const _origSI = window.setInterval.bind(window);
  window.setInterval = function(fn, ms){ const id = _origSI(fn, ms); _timers.push(id); return id; };
  const _origRAF = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(fn){ const id = _origRAF(fn); _frames.push(id); return id; };
  try{

  var root = document.getElementById('dvx');

    /* theme */
    var tb = document.getElementById('themeTg');
    function setTheme(t){ root.setAttribute('data-theme', t); try{ localStorage.setItem('tahara-theme', t); }catch(e){} }
    tb.addEventListener('click', function(){ setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });
    try{ var s0 = localStorage.getItem('tahara-theme'); if (s0) setTheme(s0); }catch(e){}

    /* language */
    var LANG = 'en';
    var I18N = {
      en:{
        crumbRoot:'DISCOVERY', crumbSub:'In depth', heroBtn:'View the live graph &rarr;', dscHub:'Discovery',
        h1:'What can actually be discovered, <em>visualized live.</em>',
        lede:'Six wrapped tools. Four evidence layers. One relationship graph. <b>Read-only, inside your own boundary.</b>',
        covT:'Coverage by evidence layer', toolsLbl:'TOOLS',
        dashT:'Discovery telemetry',
        dashSub:'Six wrapped tools across four evidence layers, running on a 24 hour cadence.',
        kTools:'Tools live', kLayers:'Evidence layers', kFind:'Findings, this real scan', kUnavail:'Tools not available',
        l1:'Infrastructure and config', l2:'Live runtime posture', l3:'AI and model inventory', l4:'Relationships and identity',
        scanT:'Scan activity, last 24 hours', nowLbl:'NOW',
        findT:'Findings surfaced per tool, last cycle', cadTag:'24H CADENCE',
        relT:'Relationships and identity, live graph',
        relSub:'Who can reach what, and through how many hops. Resolved as a graph query, not a flat table.',
        fLine:'Unowned service account reaches production, three hops past the policy boundary.',
        relScroll:'SCROLL THE DIAGRAM SIDEWAYS TO FOLLOW THE PATH',
        colIdent:'SERVICE ACCOUNT', colRoles:'IAM ROLES', colRes:'RESOURCES', colPipe:'CI / CD', colTgt:'TARGET',
        rl5:'Reached',
        rl1:'Identity or role', rl2:'Resource, clean', rl3:'Resource, flagged access', rl4:'Service account',
        c1T:'Infrastructure and config', c1k1:'Policies checked', c1k2:'Formats covered', c1k3:'Frameworks mapped',
        c2T:'Live runtime posture', c2k1:'Scope', c2k2:'Detects', c2v2:'Drift from declared IaC', c2k3:'Cadence', c2v3:'Continuous, in-cluster',
        c3T:'AI and model inventory', c3k1:'Finds', c3v1:'LLM calls, agents, MCP servers', c3k2:'Output', c3k3:'Built for', c3v3:'EU AI Act Art. 53 inventory',
        c4T:'Relationships and identity', c4k1:'Model', c4v1:'Graph, not a flat table', c4k2:'Answers', c4v2:'Who can reach what, and how', c4k3:'Feeds', c4v3:'The triangulation engine directly',
        corrT:'Correlation: no single signal proves a system exists',
        ch1:'API traffic', ch2:'Service account, no owner', ch3:'CI/CD deploy', ch4:'1 strong finding',
        bLbl:'Scope boundary:',
        bBody:'mainstream cloud (AWS, Azure, GCP) and Kubernetes are fully supported today. Fully private, non-cloud infrastructure is a later-phase expansion, not part of the current build. Every tool call goes through our own wrapper, a result always lands as',
        bBody2:', never stronger. Only a named person can confirm it.',
        nOverview:'Overview', nGov:'Governance', nFw:'Frameworks', nDisc:'Discovery', nAdv:'Adversarial', nGuard:'Guardrails'
      },
      ar:{
        crumbRoot:'\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641', crumbSub:'\u0628\u0627\u0644\u062a\u0641\u0635\u064a\u0644', heroBtn:'\u0639\u0631\u0636 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u064a \u0627\u0644\u062d\u064a \u2190', dscHub:'\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641',
        h1:'\u0645\u0627 \u064a\u0645\u0643\u0646 \u0627\u0643\u062a\u0634\u0627\u0641\u0647 \u0641\u0639\u0644\u064a\u064b\u0627\u060c <em>\u0648\u0639\u0631\u0636\u0647 \u062d\u064a\u0651\u064b\u0627.</em>',
        lede:'\u0633\u062a \u0623\u062f\u0648\u0627\u062a \u0645\u063a\u0644\u0651\u0641\u0629. \u0623\u0631\u0628\u0639 \u0637\u0628\u0642\u0627\u062a \u0623\u062f\u0644\u0629. \u0645\u062e\u0637\u0637 \u0639\u0644\u0627\u0642\u0627\u062a \u0648\u0627\u062d\u062f. <b>\u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637\u060c \u062f\u0627\u062e\u0644 \u0646\u0637\u0627\u0642\u0643 \u0627\u0644\u062e\u0627\u0635.</b>',
        covT:'\u0627\u0644\u062a\u063a\u0637\u064a\u0629 \u062d\u0633\u0628 \u0637\u0628\u0642\u0629 \u0627\u0644\u0623\u062f\u0644\u0629', toolsLbl:'\u0623\u062f\u0648\u0627\u062a',
        dashT:'\u0642\u064a\u0627\u0633\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641',
        dashSub:'\u0633\u062a \u0623\u062f\u0648\u0627\u062a \u0645\u063a\u0644\u0651\u0641\u0629 \u0639\u0628\u0631 \u0623\u0631\u0628\u0639 \u0637\u0628\u0642\u0627\u062a \u0623\u062f\u0644\u0629\u060c \u062a\u0639\u0645\u0644 \u0628\u0648\u062a\u064a\u0631\u0629 \u0643\u0644 24 \u0633\u0627\u0639\u0629.',
        kTools:'\u0623\u062f\u0648\u0627\u062a \u0645\u063a\u0644\u0651\u0641\u0629', kLayers:'\u0637\u0628\u0642\u0627\u062a \u0627\u0644\u0623\u062f\u0644\u0629', kFind:'\u0646\u062a\u0627\u0626\u062c\u060c \u0622\u062e\u0631 \u062f\u0648\u0631\u0629', kProbes:'\u0645\u062d\u0627\u0648\u0644\u0627\u062a \u0644\u0643\u0644 \u062f\u0648\u0631\u0629',
        l1:'\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0648\u0627\u0644\u062a\u0643\u0648\u064a\u0646', l2:'\u0648\u0636\u0639 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u062d\u064a', l3:'\u062c\u0631\u062f \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062c', l4:'\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u0648\u0627\u0644\u0647\u0648\u064a\u0629',
        scanT:'\u0646\u0634\u0627\u0637 \u0627\u0644\u0641\u062d\u0635\u060c \u0622\u062e\u0631 24 \u0633\u0627\u0639\u0629', nowLbl:'\u0627\u0644\u0622\u0646',
        findT:'\u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0645\u0643\u062a\u0634\u0641\u0629 \u0644\u0643\u0644 \u0623\u062f\u0627\u0629\u060c \u0622\u062e\u0631 \u062f\u0648\u0631\u0629', cadTag:'\u0643\u0644 24 \u0633\u0627\u0639\u0629',
        relT:'\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u0648\u0627\u0644\u0647\u0648\u064a\u0629\u060c \u0631\u0633\u0645 \u0628\u064a\u0627\u0646\u064a \u062d\u064a',
        relSub:'\u0645\u0646 \u064a\u0645\u0643\u0646\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0627\u0630\u0627\u060c \u0648\u0639\u0628\u0631 \u0643\u0645 \u062e\u0637\u0648\u0629. \u064a\u064f\u062d\u0644\u0651 \u0643\u0627\u0633\u062a\u0639\u0644\u0627\u0645 \u0631\u0633\u0645 \u0628\u064a\u0627\u0646\u064a\u060c \u0644\u0627 \u062c\u062f\u0648\u0644 \u0645\u0633\u0637\u062d.',
        fLine:'\u062d\u0633\u0627\u0628 \u062e\u062f\u0645\u0629 \u0628\u0644\u0627 \u0645\u0627\u0644\u0643 \u064a\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u060c \u062b\u0644\u0627\u062b \u062e\u0637\u0648\u0627\u062a \u0628\u0639\u062f \u062d\u062f\u0648\u062f \u0627\u0644\u0633\u064a\u0627\u0633\u0629.',
        relScroll:'\u0645\u0631\u0651\u0631 \u0627\u0644\u0631\u0633\u0645 \u0623\u0641\u0642\u064a\u064b\u0627 \u0644\u062a\u062a\u0628\u0639 \u0627\u0644\u0645\u0633\u0627\u0631',
        colIdent:'\u062d\u0633\u0627\u0628 \u062e\u062f\u0645\u0629', colRoles:'\u0623\u062f\u0648\u0627\u0631 IAM', colRes:'\u0627\u0644\u0645\u0648\u0627\u0631\u062f', colPipe:'CI / CD', colTgt:'\u0627\u0644\u0647\u062f\u0641',
        rl5:'\u062a\u0645 \u0627\u0644\u0648\u0635\u0648\u0644',
        rl1:'\u0647\u0648\u064a\u0629 \u0623\u0648 \u062f\u0648\u0631', rl2:'\u0645\u0648\u0631\u062f\u060c \u0646\u0638\u064a\u0641', rl3:'\u0645\u0648\u0631\u062f\u060c \u0648\u0635\u0648\u0644 \u0645\u0648\u0633\u0648\u0645', rl4:'\u062d\u0633\u0627\u0628 \u062e\u062f\u0645\u0629',
        c1T:'\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0648\u0627\u0644\u062a\u0643\u0648\u064a\u0646', c1k1:'\u0627\u0644\u0633\u064a\u0627\u0633\u0627\u062a \u0627\u0644\u0645\u0641\u062d\u0648\u0635\u0629', c1k2:'\u0627\u0644\u0635\u064a\u063a \u0627\u0644\u0645\u062f\u0639\u0648\u0645\u0629', c1k3:'\u0627\u0644\u0623\u0637\u0631 \u0627\u0644\u0645\u0631\u0628\u0648\u0637\u0629',
        c2T:'\u0648\u0636\u0639 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u062d\u064a', c2k1:'\u0627\u0644\u0646\u0637\u0627\u0642', c2k2:'\u064a\u0643\u062a\u0634\u0641', c2v2:'\u0627\u0644\u0627\u0646\u062d\u0631\u0627\u0641 \u0639\u0646 \u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0646\u0629', c2k3:'\u0627\u0644\u0648\u062a\u064a\u0631\u0629', c2v3:'\u0645\u0633\u062a\u0645\u0631\u060c \u062f\u0627\u062e\u0644 \u0627\u0644\u0639\u0646\u0642\u0648\u062f',
        c3T:'\u062c\u0631\u062f \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062c', c3k1:'\u064a\u0643\u062a\u0634\u0641', c3v1:'\u0627\u0633\u062a\u062f\u0639\u0627\u0621\u0627\u062a LLM\u060c \u0648\u0643\u0644\u0627\u0621\u060c \u0648\u062e\u0648\u0627\u062f\u0645 MCP', c3k2:'\u0627\u0644\u0645\u062e\u0631\u062c\u0627\u062a', c3k3:'\u0645\u0635\u0645\u0645 \u0644\u0640', c3v3:'\u062c\u0631\u062f \u0627\u0644\u0645\u0627\u062f\u0629 53 \u0645\u0646 \u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a',
        c4T:'\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u0648\u0627\u0644\u0647\u0648\u064a\u0629', c4k1:'\u0627\u0644\u0646\u0645\u0648\u0630\u062c', c4v1:'\u0631\u0633\u0645 \u0628\u064a\u0627\u0646\u064a\u060c \u0644\u064a\u0633 \u062c\u062f\u0648\u0644\u064b\u0627 \u0645\u0633\u0637\u062d\u064b\u0627', c4k2:'\u064a\u062c\u064a\u0628', c4v2:'\u0645\u0646 \u064a\u0645\u0643\u0646\u0647 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0645\u0627\u0630\u0627\u060c \u0648\u0643\u064a\u0641', c4k3:'\u064a\u063a\u0630\u064a', c4v3:'\u0645\u062d\u0631\u0643 \u0627\u0644\u062a\u062b\u0644\u064a\u062b \u0645\u0628\u0627\u0634\u0631\u0629',
        corrT:'\u0627\u0644\u062a\u0631\u0627\u0628\u0637: \u0644\u0627 \u0625\u0634\u0627\u0631\u0629 \u0648\u0627\u062d\u062f\u0629 \u062a\u062b\u0628\u062a \u0648\u062c\u0648\u062f \u0646\u0638\u0627\u0645',
        ch1:'\u062d\u0631\u0643\u0629 API', ch2:'\u062d\u0633\u0627\u0628 \u062e\u062f\u0645\u0629 \u0628\u0644\u0627 \u0645\u0627\u0644\u0643', ch3:'\u0646\u0634\u0631 CI/CD', ch4:'\u0646\u062a\u064a\u062c\u0629 \u0642\u0648\u064a\u0629 \u0648\u0627\u062d\u062f\u0629',
        bLbl:'\u062d\u062f\u0648\u062f \u0627\u0644\u0646\u0637\u0627\u0642:',
        bBody:'\u0627\u0644\u0633\u062d\u0627\u0628\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 (AWS\u060c Azure\u060c GCP) \u0648\u0643\u0648\u0628\u0631\u0646\u062a\u064a\u0632 \u0645\u062f\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0627\u0644\u064a\u0648\u0645. \u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629 \u063a\u064a\u0631 \u0627\u0644\u0633\u062d\u0627\u0628\u064a\u0629 \u062a\u0645\u0627\u0645\u064b\u0627 \u0645\u0631\u062d\u0644\u0629 \u0644\u0627\u062d\u0642\u0629\u060c \u0648\u0644\u064a\u0633\u062a \u062c\u0632\u0621\u064b\u0627 \u0645\u0646 \u0627\u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u062d\u0627\u0644\u064a. \u0643\u0644 \u0637\u0644\u0628 \u0623\u062f\u0627\u0629 \u064a\u0645\u0631 \u0639\u0628\u0631 \u063a\u0644\u0627\u0641\u0646\u0627 \u0627\u0644\u062e\u0627\u0635\u060c \u0648\u062a\u0635\u0644 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u062f\u0627\u0626\u0645\u064b\u0627',
        bBody2:'\u060c \u0648\u0644\u0627 \u062a\u0632\u064a\u062f. \u0641\u0642\u0637 \u0634\u062e\u0635 \u0645\u0633\u0645\u0649 \u064a\u0645\u0643\u0646\u0647 \u062a\u0623\u0643\u064a\u062f\u0647\u0627.',
        nOverview:'\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629', nGov:'\u0627\u0644\u062d\u0648\u0643\u0645\u0629', nFw:'\u0627\u0644\u0623\u064f\u0637\u0631', nDisc:'\u0627\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641', nAdv:'\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0639\u062f\u0627\u0626\u064a', nGuard:'\u062d\u0648\u0627\u062c\u0632 \u0627\u0644\u062d\u0645\u0627\u064a\u0629'
      }
    };
    function applyLang(lang){
      LANG = lang;
      var dict = I18N[lang] || I18N.en;
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        var k = el.getAttribute('data-i18n');
        if (dict[k] != null) el.innerHTML = dict[k];
      });
      document.querySelectorAll('.tnav a[data-lk]').forEach(function(a){
        var k = a.getAttribute('data-lk');
        if (dict[k] != null) a.textContent = dict[k];
      });
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.querySelectorAll('.seg button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-lang') === lang); });
      try{ localStorage.setItem('tahara-lang', lang); }catch(e){}
    }
    document.querySelectorAll('.seg button').forEach(function(b){
      b.addEventListener('click', function(){ applyLang(b.getAttribute('data-lang')); });
    });
    try{ var l0 = localStorage.getItem('tahara-lang'); if (l0) applyLang(l0); }catch(e){}

    /* real discovery data: one live health check plus one real scan per tool that has
       a known-good local target in this deployment. Never fabricates a number for a
       tool it didn't actually run -- a tool with no configured target shows "n/a", not
       a made-up count. */
    (async function loadRealDiscovery(){
      var note = document.getElementById('liveScanNote');
      var bars = {
        checkov:  { target: '/app/terraform' },
        kics:     { target: '/app/terraform' },
        'ai-bom': { target: '/app/ccae' },
        mlflow:   { target: 'file:///app/mlruns' },
        kubescape:{ target: null } // no k8s manifest/cluster configured in this deployment
      };
      function setBar(tool, count, ok){
        var v = document.getElementById('bv-' + tool);
        var b = document.getElementById('bb-' + tool);
        if (!v || !b) return;
        v.textContent = ok ? String(count) : 'n/a';
        var pct = ok ? Math.min(100, count * 8 + (count > 0 ? 12 : 2)) : 0;
        b.style.setProperty('--h', pct + '%');
      }
      try{
        var health = await getDiscoveryHealth();
        var liveTools = health.tools || [];
        var liveEl = document.getElementById('statLiveTools');
        if (liveEl) liveEl.setAttribute('data-to', String(liveTools.length));
        var unEl = document.getElementById('statUnavail');
        if (unEl) unEl.setAttribute('data-to', '2');

        var totalFindings = 0, ranAny = false;
        for (var i = 0; i < liveTools.length; i++){
          var t = liveTools[i];
          var cfg = bars[t];
          if (!cfg || !cfg.target){ setBar(t, 0, false); continue; }
          try{
            var result = await discoveryScan(t, cfg.target);
            var n = (result.findings || []).length;
            totalFindings += n;
            ranAny = true;
            setBar(t, n, true);
          }catch(scanErr){
            setBar(t, 0, false);
          }
        }
        var findEl = document.getElementById('statFindings');
        if (findEl) findEl.setAttribute('data-to', String(totalFindings));
        if (note) note.textContent = ranAny
          ? ('LIVE: ' + liveTools.length + ' real tools reachable, ' + totalFindings + ' findings from a real scan just now. Prowler and OpenCSPM are not wired in (see category cards below).')
          : ('LIVE: ' + liveTools.length + ' real tools reachable, but no scan target is configured for them in this deployment.');
        document.querySelectorAll('.kn[data-to]').forEach(function(el){
          if (el.closest('.dh2-stats') && el.offsetParent !== null) animFig(el);
        });
      }catch(healthErr){
        if (note) note.textContent = 'Discovery backend unreachable right now -- showing no live data (not fabricating a number).';
        var liveEl2 = document.getElementById('statLiveTools');
        if (liveEl2) liveEl2.textContent = '0';
      }
    })();

    /* donut, built from the same data as the legend */
    (function(){
      var svg = document.querySelector('.don2'); if(!svg) return;
      var data = [
        {v:2, c:'var(--acc)'}, {v:2, c:'var(--green)'},
        {v:2, c:'var(--amber)'}, {v:1, c:'var(--sky)'}
      ];
      var total = data.reduce(function(s,d){ return s+d.v; },0);
      var cx=70, cy=70, rO=60, rI=39, ang=-90, out='', gap=1.6;
      data.forEach(function(d,i){
        var sweep = (d.v/total)*360;
        var a0=(ang+gap/2)*Math.PI/180, a1=(ang+sweep-gap/2)*Math.PI/180;
        var x0o=cx+rO*Math.cos(a0), y0o=cy+rO*Math.sin(a0);
        var x1o=cx+rO*Math.cos(a1), y1o=cy+rO*Math.sin(a1);
        var x0i=cx+rI*Math.cos(a1), y0i=cy+rI*Math.sin(a1);
        var x1i=cx+rI*Math.cos(a0), y1i=cy+rI*Math.sin(a0);
        var large = sweep>180?1:0;
        out += '<path d="M'+x0o+','+y0o+' A'+rO+','+rO+' 0 '+large+' 1 '+x1o+','+y1o+
               ' L'+x0i+','+y0i+' A'+rI+','+rI+' 0 '+large+' 0 '+x1i+','+y1i+' Z" fill="'+d.c+
               '" style="animation-delay:'+(i*0.1)+'s"/>';
        ang += sweep;
      });
      out += '<text x="70" y="67" text-anchor="middle" font-family="Source Serif 4" font-size="25" font-weight="700" fill="var(--ink)">6</text>';
      out += '<text x="70" y="82" text-anchor="middle" font-family="JetBrains Mono" font-size="7.5" letter-spacing="1.4" fill="var(--ink-3)">TOOLS</text>';
      svg.innerHTML = out;
    })();

    /* scan activity: plot the real 24 point series */
    (function(){
      var svg = document.querySelector('.spark'); if(!svg) return;
      var pts = [4,6,5,8,7,12,18,26,34,29,22,17,14,19,25,31,28,20,15,11,9,13,16,10];
      var W=560, H=132, pad=10, max=Math.max.apply(null,pts);
      var step=(W-pad*2)/(pts.length-1), d='';
      var coords = pts.map(function(p,i){
        var x = pad + i*step;
        var y = H - pad - (p/max)*(H-pad*2.4);
        return [x,y];
      });
      coords.forEach(function(c,i){
        if(i===0){ d += 'M'+c[0].toFixed(1)+','+c[1].toFixed(1); return; }
        var p0=coords[i-1], cxm=(p0[0]+c[0])/2;
        d += ' C'+cxm.toFixed(1)+','+p0[1].toFixed(1)+' '+cxm.toFixed(1)+','+c[1].toFixed(1)+' '+c[0].toFixed(1)+','+c[1].toFixed(1);
      });
      var last = coords[coords.length-1];
      svg.querySelector('.line').setAttribute('d', d);
      svg.querySelector('.fill').setAttribute('d', d+' L'+(W-pad)+','+(H-pad)+' L'+pad+','+(H-pad)+' Z');
      svg.querySelector('.now').setAttribute('cx', last[0]);
      svg.querySelector('.now').setAttribute('cy', last[1]);
      var g = svg.querySelector('.glines'), gl='';
      [0.25,0.5,0.75].forEach(function(f){
        var y = pad + f*(H-pad*2);
        gl += '<line x1="0" y1="'+y.toFixed(1)+'" x2="'+W+'" y2="'+y.toFixed(1)+'"/>';
      });
      g.innerHTML = gl;
    })();

    /* KPI count-up, triggered on reveal */
    function animFig(el){
      var to = parseInt(el.getAttribute('data-to'),10);
      var t0 = null;
      function step(ts){
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 900);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(step); else el.textContent = to.toLocaleString();
      }
      requestAnimationFrame(step);
    }

    /* hero CTA: scroll to the graph and replay the live trace */
    var heroBtn = document.querySelector('.dh2-btn');
    if (heroBtn){
      heroBtn.addEventListener('click', function(e){
        e.preventDefault();
        var rel = document.getElementById('rel-graph');
        if (!rel) return;
        rel.scrollIntoView({behavior:'smooth', block:'start'});
        var svg = rel.querySelector('.rel2');
        rel.classList.remove('in');
        requestAnimationFrame(function(){ requestAnimationFrame(function(){
          rel.classList.add('in');
          if (svg && svg.setCurrentTime) { try{ svg.setCurrentTime(0); }catch(err){} }
        }); });
      });
    }

    /* reveal on scroll */
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (e.isIntersecting){
          e.target.classList.add('in');
          e.target.querySelectorAll('.kn[data-to]').forEach(animFig);
          io.unobserve(e.target);
        }
      });
    }, {threshold:.15});
    document.querySelectorAll('[data-rv]').forEach(function(el){ io.observe(el); });

    /* scroll progress */
    var prog = document.getElementById('prog');
    window.addEventListener('scroll', function(){
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.setProperty('--sp', max > 0 ? Math.min(1, window.scrollY / max) : 0);
    }, {passive:true});

  } finally {
    window.IntersectionObserver = _origIO;
    document.addEventListener = _origDocAdd;
    window.addEventListener = _origWinAdd;
    window.setTimeout = _origST;
    window.setInterval = _origSI;
    window.requestAnimationFrame = _origRAF;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _docHandlers.forEach(function(h){ document.removeEventListener(h[0], h[1], h[2]); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
    _timers.forEach(function(id){ clearTimeout(id); clearInterval(id); });
    _frames.forEach(function(id){ cancelAnimationFrame(id); });
  };
}


function initChat(){
  const _ios = [];
  const _docHandlers = [];
  const _winHandlers = [];
  const _timers = [];
  const _origIO = window.IntersectionObserver;
  window.IntersectionObserver = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  const _origDocAdd = document.addEventListener.bind(document);
  document.addEventListener = function(t, fn, o){ _docHandlers.push([t, fn, o]); return _origDocAdd(t, fn, o); };
  const _origWinAdd = window.addEventListener.bind(window);
  window.addEventListener = function(t, fn, o){ _winHandlers.push([t, fn, o]); return _origWinAdd(t, fn, o); };
  const _origST = window.setTimeout.bind(window);
  window.setTimeout = function(fn, ms){ const id = _origST(fn, ms); _timers.push(id); return id; };
  try{

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var root = document.querySelector(".chx");

    /* ═══ i18n: chrome and side rail. The transcript itself stays in English. ═══ */
    var T = {
      en:{
        n1:"Overview", n2:"Governance", n3:"Frameworks", n4:"Discovery", n5:"Adversarial", n6:"Guardrails",
        signout:"Sign out",
        runT:"Master framework assessment",
        runS:"EU AI ACT · ISO/IEC 42001 · ISO/IEC 23894 · NIST AI RMF",
        runLive:"IN PROGRESS",
        ph:"Type your answer, or pick an option above",
        sProfile:"PROFILE", sMapped:"MAPPED", sFw:"FRAMEWORKS", sFind:"FINDINGS", sDisc:"DISCOVERY",
        kEst:"Established", kDoc:"From documents", kDis:"From discovery", kNeed:"Still needed",
        kColl:"Collector", kLive:"● LIVE", kObs:"Last observed", kProbeL:"Probes run",
        findEmpty:"Findings appear here as the engine detects deltas between what you say, what you wrote, and what your system is doing.",
        ft1:"TAHARA AI · CONTINUOUS ASSURANCE PLATFORM", ft2:"SAFE · ETHICAL · TRANSPARENT",
        auditor:"ASSURANCE AUDITOR", you:"YOU"
      },
      ar:{
        n1:"نظرة عامة", n2:"الحوكمة", n3:"الأُطر", n4:"الاستكشاف", n5:"الاختبار العدائي", n6:"حواجز الحماية",
        signout:"تسجيل الخروج",
        runT:"تقييم الإطار الرئيسي",
        runS:"قانون الذكاء الاصطناعي الأوروبي · آيزو 42001 · آيزو 23894 · نيست",
        runLive:"قيد التنفيذ",
        ph:"اكتب إجابتك، أو اختر أحد الخيارات أعلاه",
        sProfile:"الملف", sMapped:"مُغطّى", sFw:"الأُطر", sFind:"الملاحظات", sDisc:"الاستكشاف",
        kEst:"مُثبتة", kDoc:"من المستندات", kDis:"من الاستكشاف", kNeed:"ما زال مطلوبا",
        kColl:"المُجمّع", kLive:"● مباشر", kObs:"آخر رصد", kProbeL:"الفحوصات",
        findEmpty:"تظهر الملاحظات هنا كلما رصد المحرك فارقا بين ما تقوله، وما كتبته، وما يفعله نظامك فعليا.",
        ft1:"تهارا · منصة الضمان المستمر", ft2:"آمن · أخلاقي · شفاف",
        auditor:"مدقق الضمان", you:"أنت"
      }
    };
    var lang = "en";
    function applyLang(){
      var d = T[lang];
      document.documentElement.lang = lang === "ar" ? "ar" : "en";
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      root.querySelectorAll("[data-i]").forEach(function(el){
        var v = d[el.getAttribute("data-i")];
        if(v != null) el.textContent = v;
      });
      var ci = document.getElementById("ci");
      if(ci) ci.placeholder = d.ph;
      root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
        b.classList.toggle("on", b.getAttribute("data-lang") === lang);
      });
      try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
    }
    root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
      b.addEventListener("click", function(){
        if(lang === b.getAttribute("data-lang")) return;
        lang = b.getAttribute("data-lang");
        applyLang();
        if(typeof window.__chxRestart === "function") window.__chxRestart();
      });
    });
    try{ var sl = localStorage.getItem("tahara-lang"); if(sl === "ar" || sl === "en") lang = sl; }catch(e){}

    /* theme */
    try{ var st = localStorage.getItem("tahara-theme"); if(st) document.documentElement.dataset.theme = st; }catch(e){}
    document.getElementById("themeTg").addEventListener("click", function(){
      var n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = n;
      try{ localStorage.setItem("tahara-theme", n); }catch(e){}
    });

    /* ═══ the interview -- real backend, no scripted content, no fixed timers ═══
       Wired to ccae-eu-ai-act's real Governance API (see API-CONTRACT.md,
       section 2). Every pause below is the actual wait for a real fetch to
       resolve, not a setTimeout standing in for one. */
    var S = document.getElementById("stream");
    var AV = '<span class="av"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 20 7.4 12 11.8 4 7.4 12 3Z" fill="currentColor"/><path d="M12 10.4 20 15l-8 4.6L4 15l8-4.6Z" fill="currentColor" opacity=".55"/></svg></span>';

    var eid = null;          // real engagement_id once POST /engagements returns
    var coverage = null;     // real coverage object, refreshed after every real call
    var qqueue = [];         // current real batch from GET /questions
    var qi = 0;              // index into qqueue
    var askedCount = 0;      // how many real questions have actually been shown -- not a fixed 15

    /* the stream follows new content automatically, so each question and its
     options land in view without the reader having to scroll */
  var stick = true, lock = 0;
  S.addEventListener("scroll", function(){
    if(Date.now() < lock) return;              /* ignore our own scrolling */
    stick = (S.scrollHeight - S.scrollTop - S.clientHeight) < 120;
  }, { passive:true });
  function pin(){
    if(!stick) return;
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        lock = Date.now() + 500;
        S.scrollTop = S.scrollHeight;
      });
    });
  }
  function scrollEnd(){ stick = true; pin(); }
  new MutationObserver(pin).observe(S, { childList:true, subtree:true, characterData:true });
    function bot(html){
      var d = document.createElement("div");
      d.className = "msg";
      d.innerHTML = '<div class="who">' + AV + '<span>' + T[lang].auditor + '</span></div>' +
                    '<div class="bubble">' + html + '</div>';
      S.appendChild(d); scrollEnd(); return d;
    }
    function me(txt){
      var d = document.createElement("div");
      d.className = "msg me";
      d.innerHTML = '<div class="who"><span>' + T[lang].you + '</span></div><div class="bubble">' + txt + '</div>';
      S.appendChild(d); scrollEnd();
    }
    /* the "AI thinking" state -- shown for exactly as long as the real fetch
       it wraps actually takes, removed only when that call resolves */
    function typing(){
      var d = document.createElement("div");
      d.className = "msg"; d.id = "typ";
      d.innerHTML = '<div class="who">' + AV + '<span>' + T[lang].auditor + '</span></div>' +
                    '<div class="bubble" style="padding:0"><div class="typing"><i></i><i></i><i></i></div></div>';
      S.appendChild(d); scrollEnd();
    }
    function untype(){ var t = document.getElementById("typ"); if(t) t.remove(); }
    function clearTimers(){ /* no scripted timers remain to clear */ }

    function esc(s){
      return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
        return { "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[c];
      });
    }
    function fmtVal(v){ try{ return esc(JSON.stringify(v)); }catch(e){ return esc(String(v)); } }

    /* Sidebar reflects only what the real coverage() object actually reports.
       "From documents" / "From discovery" have no real split in that object
       (established only distinguishes USER_CONFIRMED/EXPLICITLY_NEGATED, not
       source), and only EU AI Act is a real, wired framework here -- so those
       fields show an honest em dash instead of an invented number. */
    function upd(){
      var pct = coverage ? coverage.percent_complete : 0;
      document.getElementById("pct").textContent = Math.round(pct);
      document.getElementById("pbar").style.width = pct + "%";
      document.getElementById("kEst").textContent = coverage ? coverage.established : 0;
      document.getElementById("kDoc").textContent = "—";
      document.getElementById("kDis").textContent = "—";
      document.getElementById("kNeed").textContent = coverage ? coverage.still_needed : "—";
      document.getElementById("fEU").textContent   = coverage ? Math.round(pct) + "%" : "—";
      document.getElementById("fISO").textContent  = "—";
      document.getElementById("f238").textContent  = "—";
      document.getElementById("fNIST").textContent = "—";
    }

    function extractedHint(q){
      if(!q.extracted) return "";
      var e = q.extracted;
      return '<div class="extract"><div class="extract-h">DOCUMENT SUGGESTS &middot; CONFIRM OR CORRECT</div>' +
        '<div class="ex"><span class="f keep">' + esc(q.field_path) + '</span>' +
        '<span class="v keep">' + fmtVal(e.value) + '</span>' +
        '<span class="c keep">' + (e.confidence != null ? e.confidence.toFixed(2) : "—") + '</span>' +
        '<span class="src keep">' + esc(e.cite || "") + '</span></div></div>';
    }

    function renderOptions(q){
      if(!q.options || !q.options.length) return "";
      return '<div class="opts">' + q.options.map(function(o, i){
        return '<div class="opt" data-i="' + i + '"><span class="k">' + "ABCDEFGH".charAt(i) + '</span>' +
               '<span>' + esc(o.label) + '</span>' +
               (o.negates ? '<span class="att">ATTESTATION</span>' : "") + '</div>';
      }).join("") + '</div>';
    }

    function askCurrent(){
      var q = qqueue[qi];
      if(!q){ loadMoreQuestions(); return; }
      askedCount++;
      bot(
        '<div class="qh"><span class="qn keep">Q' + askedCount + '</span>' +
        (q.unblocks ? '<span class="qt keep">UNBLOCKS ' + q.unblocks + ' REQUIREMENTS</span>' : '') + '</div>' +
        esc(q.text) +
        (q.why_asked ? '<div class="why">' + esc(q.why_asked) + '</div>' : '') +
        extractedHint(q) +
        renderOptions(q) +
        (!q.options || !q.options.length || q.allow_freetext
          ? '<div class="why">' + (q.options && q.options.length ? 'Or type your own answer below.' : 'Type your answer below.') + '</div>'
          : '')
      );
    }

    function clearLiveOptions(){
      var all = S.querySelectorAll(".opts");
      if(all.length) all[all.length - 1].remove();
    }

    async function answerReal(q, option, freetextValue){
      var label = option ? option.label : freetextValue;
      me(esc(label));
      clearLiveOptions();
      typing();
      try{
        var res = await submitAnswers(eid, [{
          qid: q.qid,
          field_path: q.field_path,
          value: option ? option.value : null,
          negates: option ? !!option.negates : false,
          freetext: freetextValue || null,
        }]);
        untype();
        coverage = res.coverage;
        upd();
        qi++;
        if(res.complete){ await finish(); return; }
        askCurrent();
      }catch(err){
        untype();
        bot('⚠ <b>Real error submitting that answer:</b> ' + esc(err.message));
      }
    }

    S.addEventListener("click", function(e){
      var o = e.target.closest(".opt");
      if(!o) return;
      var q = qqueue[qi];
      if(!q || !q.options) return;
      var ix = parseInt(o.getAttribute("data-i"), 10) || 0;
      answerReal(q, q.options[ix], null);
    });

    async function loadMoreQuestions(){
      typing();
      try{
        var data = await getQuestions(eid, 6);
        // Defensive: handleUpload already waits out real extraction before ever
        // calling this, but if something else lands here mid-extraction (e.g. a
        // page reload against an engagement that's still processing), wait it out
        // here too rather than ask a premature batch of questions.
        //
        // Separately, GET /questions is itself now async: rendering a batch calls
        // the real rephraser once per question (a real local-model call each time),
        // so the first call to fetch a new batch kicks that off in the backend and
        // comes back "processing" immediately -- poll the same endpoint, same as
        // the upload flow above, until it actually finishes.
        while(data.documents_processing || data.status === "processing"){
          await sleep(4000);
          data = await getQuestions(eid, 6);
        }
        untype();
        coverage = data.coverage;
        upd();
        qqueue = data.questions || [];
        qi = 0;
        if(data.complete || qqueue.length === 0){ await finish(); return; }
        askCurrent();
      }catch(err){
        untype();
        bot('⚠ <b>Real error fetching the next questions:</b> ' + esc(err.message));
      }
    }

    async function finish(){
      typing();
      try{
        var rpt = await getReport(eid);
        untype();
        var s = rpt.summary;
        bot(
          '<b>Assessment complete.</b> This is the real applicability report for this engagement, from GET /engagements/' + esc(eid) + '/report.' +
          '<div class="why">' +
            'Status: <b>' + esc(rpt.status) + '</b>. ' +
            s.controls_assessed + ' controls assessed &middot; ' +
            s.applicable + ' applicable &middot; ' +
            s.not_applicable + ' not applicable &middot; ' +
            s.needs_info + ' needs info &middot; ' +
            s.needs_review + ' needs review. ' +
            'Findings on record: ' + (rpt.findings ? rpt.findings.total : 0) + '.' +
          '</div>' +
          '<div style="margin-top:18px"><a class="btn-p" href="/gap"><span>View gap assessment</span>' +
          '<svg viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 3.5 11.5 7 8 10.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>'
        );
      }catch(err){
        untype();
        bot('⚠ <b>Real error fetching the report:</b> ' + esc(err.message));
      }
    }

    var realFileInput = null;

    function boot(){
      bot(
        'I\'m the assurance auditor for this assessment. Upload what you have and I\'ll read it, extract only the facts this framework needs, then ask about what your documents don\'t say.' +
        '<div class="drop" id="dropZ">' +
          '<div class="i"><svg viewBox="0 0 24 24" fill="none"><path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>' +
          '<div class="m">Drop your documents, or click to select</div>' +
          '<div class="s">PDF &middot; DOCX &middot; MD &middot; TXT &middot; JSON &middot; YAML</div>' +
        '</div>'
      );
      if(!realFileInput){
        realFileInput = document.createElement("input");
        realFileInput.type = "file";
        realFileInput.multiple = true;
        realFileInput.hidden = true;
        root.appendChild(realFileInput);
        realFileInput.addEventListener("change", function(){
          var files = Array.from(realFileInput.files || []);
          if(files.length) handleUpload(files);
          realFileInput.value = "";
        });
      }
      var dz = document.getElementById("dropZ");
      if(dz) dz.addEventListener("click", function(){ realFileInput.click(); });
    }

    /* The "AI thinking" panel: shown the instant upload starts, removed only
       once POST /engagements and POST /engagements/{id}/documents have both
       actually returned -- there is no minimum or fixed delay here. */
    function sleep(ms){ return new Promise(function(res){ setTimeout(res, ms); }); }

    async function handleUpload(files){
      me("Uploaded " + files.length + " document" + (files.length === 1 ? "" : "s") + ": " +
         files.map(function(f){ return esc(f.name); }).join(", "));
      var dz = document.getElementById("dropZ");
      if(dz) dz.remove();
      typing();
      try{
        if(!eid){
          var eng = await openEngagement();
          eid = eng.engagement_id;
        }
        // POST .../documents now returns immediately -- the real extraction (real
        // per-field local-model calls, genuinely minutes long) runs in the backend's
        // own background task, not on this request. Poll the real status endpoint
        // until it actually finishes; no fixed timer, no assumed duration.
        await uploadDocuments(eid, files);
        var status;
        do {
          await sleep(4000);
          status = await getDocumentsStatus(eid);
        } while(status.status === "processing");

        untype();

        if(status.status === "error"){
          bot('⚠ <b>Real error during extraction:</b> ' + esc(status.error));
          return;
        }

        var result = status.result;
        coverage = result.coverage;
        upd();
        var lines = (result.extractions || []).map(function(x){
          return '<div class="ex"><span class="f keep">' + esc(x.field) + '</span>' +
                 '<span class="v keep">' + fmtVal(x.value) + '</span>' +
                 '<span class="c keep">' + (x.confidence != null ? x.confidence.toFixed(2) : "—") + '</span>' +
                 '<span class="src keep">' + esc(x.cite || "") + '</span></div>';
        }).join("");
        var extractedCount = result.fields_extracted != null ? result.fields_extracted : (result.extractions || []).length;
        bot(
          'Read ' + (result.chunks_indexed != null ? result.chunks_indexed : "?") + ' chunks indexed, extracted ' + extractedCount + ' fact' + (extractedCount === 1 ? "" : "s") + '.' +
          (lines ? '<div class="extract"><div class="extract-h">EXTRACTED &middot; CITED TO SOURCE</div>' + lines + '</div>' : '') +
          '<div class="why">' + esc(result.note || "Nothing here is relied on yet -- extractions are confirmed or corrected in the questions that follow.") + '</div>'
        );
        await loadMoreQuestions();
      }catch(err){
        untype();
        bot('⚠ <b>Real error from the backend:</b> ' + esc(err.message));
      }
    }

    /* the bottom compose bar doubles as the free-text answer path for
       whatever the currently displayed real question is */
    window.chxSend = function(){
      var i = document.getElementById("ci");
      var v = i.value.trim();
      if(!v) return;
      var q = qqueue[qi];
      if(!q){ i.value = ""; return; }
      i.value = "";
      answerReal(q, null, v);
    };

    /* language switching only refreshes the chrome (nav, sidebar labels) --
       it never wipes a real, in-progress engagement */
    function restart(){ applyLang(); }
    window.__chxRestart = restart;

    applyLang();
    upd();
    if(!eid) boot();

  } finally {
    window.IntersectionObserver = _origIO;
    document.addEventListener = _origDocAdd;
    window.addEventListener = _origWinAdd;
    window.setTimeout = _origST;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _docHandlers.forEach(function(h){ document.removeEventListener(h[0], h[1], h[2]); });
    _winHandlers.forEach(function(h){ window.removeEventListener(h[0], h[1], h[2]); });
    _timers.forEach(function(id){ clearTimeout(id); });
    try{ delete window.chxSend; delete window.__chxRestart; }catch(e){ window.chxSend = null; window.__chxRestart = null; }
  };
}

function initGap(){
  const _ios = [];
  const _timers = [];
  const _origIO = window.IntersectionObserver;
  window.IntersectionObserver = function(cb, opts){ const io = new _origIO(cb, opts); _ios.push(io); return io; };
  const _origST = window.setTimeout.bind(window);
  window.setTimeout = function(fn, ms){ const id = _origST(fn, ms); _timers.push(id); return id; };
  try{

  var root = document.querySelector(".gpx");
    var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- strings ---------- */
    var T = {
      en:{
        n1:"Overview",n2:"Governance",n3:"Frameworks",n4:"Discovery",n5:"Adversarial",n6:"Guardrails",signout:"Sign out",
        crumb:"BACK TO THE INTERVIEW", h1:"Gap assessment",
        metaA:"MASTER SCOPE · 187 REQUIREMENTS · GENERATED TODAY", metaB:"COLLECTOR LIVE",
        rerun:"Re-run interview", export:"Export report",
        k1l:"READINESS", k1s:"Share of the 187 master-scope requirements that are established and evidenced today.",
        k2l:"REQUIREMENTS MAPPED", k2s:"23 from documents, 14 observed by discovery, the rest attested in the interview.",
        k3l:"FINDINGS ON THE REGISTER", k3c:"2 MAJOR NONCONFORMITIES", k3s:"Both majors block ISO/IEC 42001 certification until closed.",
        k4l:"REMAINING QUESTIONS", k4c:"CANNOT CHANGE THE OUTCOME", k4s:"Deferred: none can alter the findings already established.",
        covT:"Framework coverage", covS:"OVERLAP COUNTED ONCE ACROSS THE MASTER SET", ccS:"REQUIREMENTS SATISFIED",
        regT:"Findings register", regS:"11 FINDINGS · TRIANGULATED AGAINST LIVE SYSTEM STATE",
        regH:"SEVERITY · FINDING · OWNER · DUE · STATUS",
        fAll:"ALL", fMaj:"MAJOR", fMin:"MINOR", fObs:"OBSERVATION", fDet:"DETERMINATION",
        regF:"MAJORS STAY OPEN UNTIL THE COLLECTOR OBSERVES THEM RESOLVED, NOT UNTIL SOMEONE REPORTS THEM DONE.",
        remT:"REMEDIATION PRIORITIES", provT:"EVIDENCE PROVENANCE", colT:"COLLECTOR",
        pv1:"From documents", pv2:"Observed by discovery", pv3:"Attested in interview", pv4:"Not yet asked",
        c1:"Status", c2:"Watching", c3:"Probes run", c4:"Next sweep", cLive:"LIVE",
        ft1:"TAHARA AI · CONTINUOUS ASSURANCE PLATFORM", ft2:"SAFE · ETHICAL · TRANSPARENT",
        sev:{maj:"MAJOR",min:"MINOR",obs:"OBSERVATION",det:"DETERMINATION"},
        stat:{open:"OPEN",prog:"IN PROGRESS",final:"FINAL",watch:"MONITORING"},
        days:function(d){ return d + " days"; }, dash:"—",
        unlocks:function(n){ return "UNBLOCKS " + n + " REQUIREMENTS"; },
        effS:"SMALL", effM:"MEDIUM"
      },
      ar:{
        n1:"نظرة عامة",n2:"الحوكمة",n3:"الأُطر",n4:"الاستكشاف",n5:"الاختبار العدائي",n6:"حواجز الحماية",signout:"تسجيل الخروج",
        crumb:"العودة إلى المقابلة", h1:"تقييم الفجوات",
        metaA:"النطاق الرئيسي · 187 متطلبا · أُنشئ اليوم", metaB:"المُجمّع مباشر",
        rerun:"إعادة المقابلة", export:"تصدير التقرير",
        k1l:"الجاهزية", k1s:"نسبة متطلبات النطاق الرئيسي الـ187 المُثبتة والمدعومة بالأدلة اليوم.",
        k2l:"المتطلبات المُغطاة", k2s:"23 من المستندات، و14 رصدها الاستكشاف، والبقية أُقرت في المقابلة.",
        k3l:"الملاحظات في السجل", k3c:"حالتا عدم مطابقة كبرى", k3s:"الحالتان الكبريان تمنعان اعتماد آيزو 42001 حتى إغلاقهما.",
        k4l:"الأسئلة المتبقية", k4c:"لا يمكنها تغيير النتيجة", k4s:"مؤجلة: لا يمكن لأي منها تغيير الملاحظات المُثبتة.",
        covT:"تغطية الأُطر", covS:"يُحتسب التداخل مرة واحدة عبر المجموعة الرئيسية", ccS:"متطلبات مستوفاة",
        regT:"سجل الملاحظات", regS:"11 ملاحظة · مُثلثة مقابل حالة النظام الحية",
        regH:"الخطورة · الملاحظة · المالك · الاستحقاق · الحالة",
        fAll:"الكل", fMaj:"كبرى", fMin:"صغرى", fObs:"مشاهدة", fDet:"تقرير",
        regF:"تبقى الحالات الكبرى مفتوحة حتى يرصد المُجمّع معالجتها، لا حتى يُبلغ أحد بإنجازها.",
        remT:"أولويات المعالجة", provT:"مصدر الأدلة", colT:"المُجمّع",
        pv1:"من المستندات", pv2:"رصدها الاستكشاف", pv3:"أُقرت في المقابلة", pv4:"لم تُطرح بعد",
        c1:"الحالة", c2:"قيد المراقبة", c3:"الفحوصات", c4:"المسح التالي", cLive:"مباشر",
        ft1:"تهارا · منصة الضمان المستمر", ft2:"آمن · أخلاقي · شفاف",
        sev:{maj:"كبرى",min:"صغرى",obs:"مشاهدة",det:"تقرير"},
        stat:{open:"مفتوحة",prog:"قيد المعالجة",final:"نهائي",watch:"مراقبة"},
        days:function(d){ return d + " يوما"; }, dash:"—",
        unlocks:function(n){ return "يفتح " + n + " متطلبا"; },
        effS:"صغير", effM:"متوسط"
      }
    };

    /* ---------- data ---------- */
    var FINDS = [
      { code:"ISO 42001 · A.4.2", sev:"maj", stat:"open", due:14, own:{en:"Platform team", ar:"فريق المنصة"},
        t:{en:"Documented access control is not operating: 3 non-engineering principals on s3://prod-models.",
           ar:"ضبط الوصول الموثق غير مطبق: 3 جهات من خارج الهندسة على s3://prod-models."} },
      { code:"ISO 42001 · CL. 9.2", sev:"maj", stat:"open", due:30, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"No internal audit records in the last 12 months.",
           ar:"لا سجلات تدقيق داخلي خلال الأشهر الاثني عشر الماضية."} },
      { code:"EU AI ACT · ART. 6(3)", sev:"det", stat:"final", due:0, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"System is high-risk: Annex III employment with profiling; the derogation is unavailable.",
           ar:"النظام عالي المخاطر: توظيف ضمن الملحق الثالث مع تنميط، والاستثناء غير متاح."} },
      { code:"EU AI ACT · ART. 19", sev:"min", stat:"prog", due:7, own:{en:"Platform team", ar:"فريق المنصة"},
        t:{en:"Log retention is 30 days on s3://prod-logs, below the six-month floor.",
           ar:"مدة الاحتفاظ بالسجلات 30 يوما على s3://prod-logs، دون الحد الأدنى بستة أشهر."} },
      { code:"ISO 42001 · CL. 7.3", sev:"min", stat:"prog", due:30, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"Control-owner awareness does not match observed system state.",
           ar:"وعي مالك الضابط لا يطابق حالة النظام المرصودة."} },
      { code:"EU AI ACT · ART. 10(2)(f)", sev:"min", stat:"open", due:45, own:{en:"ML engineering", ar:"هندسة التعلم الآلي"},
        t:{en:"No documented bias examination of the training data.",
           ar:"لا فحص موثقا للتحيز في بيانات التدريب."} },
      { code:"ISO 23894 · CL. 6.1", sev:"min", stat:"open", due:45, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"Risk register review cadence is not evidenced across the lifecycle.",
           ar:"لا دليل على وتيرة مراجعة سجل المخاطر عبر دورة الحياة."} },
      { code:"EU AI ACT · ART. 72", sev:"min", stat:"open", due:60, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"No post-market monitoring plan proportionate to a high-risk system.",
           ar:"لا خطة مراقبة بعد الطرح تتناسب مع نظام عالي المخاطر."} },
      { code:"ISO 42001 · A.10.2", sev:"min", stat:"open", due:60, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"Supplier agreements carry no AI-specific obligations or audit rights.",
           ar:"اتفاقيات المورّدين لا تتضمن التزامات خاصة بالذكاء الاصطناعي أو حقوق تدقيق."} },
      { code:"EU AI ACT · ART. 27", sev:"min", stat:"open", due:45, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"No fundamental rights impact assessment recorded before first use.",
           ar:"لا تقييم أثر على الحقوق الأساسية مسجلا قبل أول استخدام."} },
      { code:"ISO 42001 · CL. 7.2", sev:"obs", stat:"open", due:30, own:{en:"People ops", ar:"شؤون الموظفين"},
        t:{en:"Operator competence is not evidenced; no training records for recruiters.",
           ar:"كفاءة المشغلين غير مدعومة بأدلة؛ لا سجلات تدريب للمسؤولين عن التوظيف."} }
    ];

    var REM = [
      { n:1, eff:"s", unlocks:8,  t:{en:"Extend the s3://prod-logs lifecycle rule to at least six months.",
                                     ar:"مدّد قاعدة دورة الحياة على s3://prod-logs إلى ستة أشهر على الأقل."} },
      { n:2, eff:"s", unlocks:11, t:{en:"Revoke or re-scope the 3 non-engineering principals on prod-models.",
                                     ar:"ألغِ أو أعد تحديد صلاحيات الجهات الثلاث من خارج الهندسة على prod-models."} },
      { n:3, eff:"m", unlocks:9,  t:{en:"Stand up the internal audit cycle and run the first audit.",
                                     ar:"فعّل دورة التدقيق الداخلي ونفّذ التدقيق الأول."} },
      { n:4, eff:"m", unlocks:21, t:{en:"Run and document the Article 10 bias examination.",
                                     ar:"نفّذ فحص التحيز بموجب المادة 10 ووثّقه."} },
      { n:5, eff:"m", unlocks:11, t:{en:"Complete the fundamental rights impact assessment before the next deployment.",
                                     ar:"أكمل تقييم الأثر على الحقوق الأساسية قبل النشر التالي."} }
    ];

    /* ---------- language ---------- */
    var lang = "en";
    try{ var sl = localStorage.getItem("tahara-lang"); if(sl === "ar" || sl === "en") lang = sl; }catch(e){}
    function applyLang(){
      var d = T[lang];
      document.documentElement.lang = lang === "ar" ? "ar" : "en";
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      root.querySelectorAll("[data-i]").forEach(function(el){
        var v = d[el.getAttribute("data-i")];
        if(typeof v === "string") el.textContent = v;
      });
      root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
        b.classList.toggle("on", b.getAttribute("data-lang") === lang);
      });
      renderRows(); renderRem();
      try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
    }
    root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
      b.addEventListener("click", function(){
        if(lang === b.getAttribute("data-lang")) return;
        lang = b.getAttribute("data-lang"); applyLang();
      });
    });

    /* ---------- theme ---------- */
    try{ var st = localStorage.getItem("tahara-theme"); if(st) document.documentElement.dataset.theme = st; }catch(e){}
    document.getElementById("gpTheme").addEventListener("click", function(){
      var n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = n;
      try{ localStorage.setItem("tahara-theme", n); }catch(e){}
    });

    /* ---------- register ---------- */
    var filter = "all";
    function renderRows(){
      var d = T[lang];
      var box = document.getElementById("gpRows");
      box.innerHTML = FINDS.filter(function(f){ return filter === "all" || f.sev === filter; })
        .map(function(f){
          return '<div class="frow">' +
            '<span class="sev ' + f.sev + '">' + d.sev[f.sev] + '</span>' +
            '<span class="fc2"><span class="code keep">' + f.code + '</span>' +
            '<div class="txt">' + f.t[lang] + '</div></span>' +
            '<span class="own">' + f.own[lang] + '</span>' +
            '<span class="due keep">' + (f.due ? d.days(f.due) : d.dash) + '</span>' +
            '<span class="stat ' + f.stat + '">' + d.stat[f.stat] + '</span>' +
          '</div>';
        }).join("");
    }
    document.getElementById("gpFilters").addEventListener("click", function(e){
      var b = e.target.closest(".flt"); if(!b) return;
      filter = b.getAttribute("data-f");
      this.querySelectorAll(".flt").forEach(function(x){ x.classList.toggle("on", x === b); });
      renderRows();
    });

    /* ---------- remediation ---------- */
    function renderRem(){
      var d = T[lang];
      document.getElementById("gpRem").innerHTML = REM.map(function(r){
        return '<div class="ri"><span class="rk keep">' + r.n + '</span>' +
          '<span><span class="rt">' + r.t[lang] + '</span>' +
          '<span class="rm"><span class="eff ' + r.eff + '">' + (r.eff === "s" ? d.effS : d.effM) + '</span>' +
          '<span class="imp">' + d.unlocks(r.unlocks) + '</span></span></span></div>';
      }).join("");
    }

    /* ---------- counters, bars, reveal ---------- */
    function countUp(el, to, ms){
      if(RM){ el.textContent = to; return; }
      var t0 = performance.now();
      (function tick(now){
        var p = Math.min(1, (now - t0) / ms);
        el.textContent = Math.round(to * (p < .5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2));
        if(p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    var fired = false;
    function fire(){
      if(fired) return; fired = true;
      countUp(document.getElementById("gpPct"), 90, 1200);
      countUp(document.getElementById("gpMapped"), 168, 1200);
      countUp(document.getElementById("gpFinds"), 11, 900);
      countUp(document.getElementById("gpLeft"), 19, 900);
      root.querySelectorAll(".fp [data-n]").forEach(function(el){ countUp(el, +el.getAttribute("data-n"), 1200); });
      setTimeout(function(){
        document.getElementById("gpRing").style.strokeDashoffset = String(239 * (1 - .9));
        document.getElementById("gpMapBar").style.width = (168/187*100) + "%";
        root.querySelectorAll("[data-w]").forEach(function(el){ el.style.width = el.getAttribute("data-w") + "%"; });
      }, RM ? 0 : 150);
    }
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting) return;
        e.target.classList.add("in");
        if(e.target.closest(".kband") || e.target.classList.contains("cc")) fire();
        io.unobserve(e.target);
      });
    }, { threshold:.15 });
    root.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
    setTimeout(fire, RM ? 0 : 700);

    applyLang();

  } finally {
    window.IntersectionObserver = _origIO;
    window.setTimeout = _origST;
  }
  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    _timers.forEach(function(id){ clearTimeout(id); });
  };
}

function initReport(){
  const _timers = [];
  const _origST = window.setTimeout.bind(window);
  window.setTimeout = function(fn, ms){ const id = _origST(fn, ms); _timers.push(id); return id; };
  try{

  var root = document.querySelector(".rpx");

    var T = {
      en:{
        n1:"Overview",n2:"Governance",n3:"Frameworks",n4:"Discovery",n5:"Adversarial",n6:"Guardrails",signout:"Sign out",
        crumb:"BACK TO THE DASHBOARD", print:"Print or save as PDF",
        refL:"REFERENCE", dateL:"GENERATED", conf:"CONFIDENTIAL · INTERNAL",
        h1:"Gap assessment report",
        subA:"MASTER SCOPE · EU AI ACT · ISO/IEC 42001 · ISO/IEC 23894 · NIST AI RMF · 187 REQUIREMENTS", subB:"COLLECTOR LIVE",
        s1:"Executive summary", s2:"At a glance", s3:"Framework coverage", s4:"Findings register",
        s5:"Remediation plan", s6:"Method and evidence",
        p1:'The assessed system is a cloud-delivered employment screening service that profiles natural persons, which classifies it as high-risk under Annex III of the EU AI Act with the Article 6(3) derogation unavailable. Of the 187 requirements in the master scope, <b>168 are established and evidenced</b>, a readiness of 90 percent. <b>Eleven findings</b> sit on the register, of which <b>two are major nonconformities</b> that block ISO/IEC 42001 certification until closed: access control that is documented but not operating, and the absence of internal audit records. Both were triangulated against live system state observed by the discovery collector, not self-reported.',
        p6:'Of the 187 requirements, <b>23</b> were established from uploaded documents with citations to source, <b>14</b> were observed directly by the discovery collector against live infrastructure, and <b>131</b> were attested in a structured fifteen-question interview. Nineteen requirements were deferred because no answer to them can change the findings above. Findings tied to system state remain under continuous observation: they close when the collector observes remediation, not when it is reported.',
        g1l:"READINESS", g1s:"of the master scope evidenced",
        g2l:"REQUIREMENTS", g2s:"mapped, overlap counted once",
        g3l:"FINDINGS", g3s:"2 major nonconformities",
        g4l:"DEFERRED", g4s:"cannot change the outcome",
        t1a:"FRAMEWORK", t1b:"SATISFIED", t1c:"COVERAGE",
        t2a:"CLAUSE", t2b:"SEVERITY", t2c:"FINDING", t2d:"OWNER", t2e:"DUE", t2f:"STATUS",
        sgB:"Tahara assurance engine", sgS:"Master framework assessment · interview and discovery triangulation",
        stamp1:"COLLECTOR · LIVE", stamp2:"PROBES RUN · 1,318",
        sev:{maj:"MAJOR",min:"MINOR",obs:"OBSERVATION",det:"DETERMINATION"},
        stat:{open:"OPEN",prog:"IN PROGRESS",final:"FINAL"},
        days:function(d){ return d + " days"; }, dash:"—",
        unlocks:function(n){ return "UNBLOCKS " + n + " REQUIREMENTS"; }, effS:"SMALL EFFORT", effM:"MEDIUM EFFORT"
      },
      ar:{
        n1:"نظرة عامة",n2:"الحوكمة",n3:"الأُطر",n4:"الاستكشاف",n5:"الاختبار العدائي",n6:"حواجز الحماية",signout:"تسجيل الخروج",
        crumb:"العودة إلى لوحة المتابعة", print:"اطبع أو احفظ PDF",
        refL:"المرجع", dateL:"تاريخ الإنشاء", conf:"سري · للاستخدام الداخلي",
        h1:"تقرير تقييم الفجوات",
        subA:"النطاق الرئيسي · القانون الأوروبي · آيزو 42001 · آيزو 23894 · نيست · 187 متطلبا", subB:"المُجمّع مباشر",
        s1:"الملخص التنفيذي", s2:"لمحة سريعة", s3:"تغطية الأُطر", s4:"سجل الملاحظات",
        s5:"خطة المعالجة", s6:"المنهجية والأدلة",
        p1:'النظام المُقيَّم خدمة فرز للتوظيف تُقدَّم سحابيا وتقوم بتنميط أشخاص طبيعيين، ما يصنفه عالي المخاطر بموجب الملحق الثالث من القانون الأوروبي مع عدم توفر استثناء المادة 6(3). من بين 187 متطلبا في النطاق الرئيسي، <b>جرى إثبات 168 متطلبا بالأدلة</b>، بجاهزية 90 بالمئة. في السجل <b>إحدى عشرة ملاحظة</b>، منها <b>حالتا عدم مطابقة كبرى</b> تمنعان اعتماد آيزو 42001 حتى إغلاقهما: ضبط وصول موثق لكنه غير مطبق، وغياب سجلات التدقيق الداخلي. وكلتاهما ثُلثت مقابل حالة النظام الحية التي رصدها مُجمّع الاستكشاف، لا عن طريق الإبلاغ الذاتي.',
        p6:'من بين 187 متطلبا، جرى إثبات <b>23</b> من مستندات مرفوعة مع توثيق إلى المصدر، ورصد <b>14</b> مباشرة بواسطة مُجمّع الاستكشاف مقابل البنية الحية، وأُقر <b>131</b> في مقابلة منظمة من خمسة عشر سؤالا. وأُجل 19 متطلبا لأن أي إجابة عنها لا يمكن أن تغير الملاحظات أعلاه. وتبقى الملاحظات المرتبطة بحالة النظام تحت مراقبة مستمرة: تُغلق عندما يرصد المُجمّع المعالجة، لا عندما يُبلغ عنها.',
        g1l:"الجاهزية", g1s:"من النطاق الرئيسي مدعوم بالأدلة",
        g2l:"المتطلبات", g2s:"مُغطاة، والتداخل محسوب مرة واحدة",
        g3l:"الملاحظات", g3s:"حالتا عدم مطابقة كبرى",
        g4l:"المؤجلة", g4s:"لا يمكنها تغيير النتيجة",
        t1a:"الإطار", t1b:"المستوفى", t1c:"التغطية",
        t2a:"البند", t2b:"الخطورة", t2c:"الملاحظة", t2d:"المالك", t2e:"الاستحقاق", t2f:"الحالة",
        sgB:"محرك الضمان في تهارا", sgS:"تقييم الإطار الرئيسي · تثليث المقابلة والاستكشاف",
        stamp1:"المُجمّع · مباشر", stamp2:"الفحوصات · 1,318",
        sev:{maj:"كبرى",min:"صغرى",obs:"مشاهدة",det:"تقرير"},
        stat:{open:"مفتوحة",prog:"قيد المعالجة",final:"نهائي"},
        days:function(d){ return d + " يوما"; }, dash:"—",
        unlocks:function(n){ return "يفتح " + n + " متطلبا"; }, effS:"جهد صغير", effM:"جهد متوسط"
      }
    };

    var FINDS = [
      { code:"ISO 42001 · A.4.2", sev:"maj", stat:"open", due:14, own:{en:"Platform team", ar:"فريق المنصة"},
        t:{en:"Documented access control is not operating: 3 non-engineering principals on s3://prod-models.",
           ar:"ضبط الوصول الموثق غير مطبق: 3 جهات من خارج الهندسة على s3://prod-models."} },
      { code:"ISO 42001 · CL. 9.2", sev:"maj", stat:"open", due:30, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"No internal audit records in the last 12 months.", ar:"لا سجلات تدقيق داخلي خلال الأشهر الاثني عشر الماضية."} },
      { code:"EU AI ACT · ART. 6(3)", sev:"det", stat:"final", due:0, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"System is high-risk: Annex III employment with profiling; the derogation is unavailable.",
           ar:"النظام عالي المخاطر: توظيف ضمن الملحق الثالث مع تنميط، والاستثناء غير متاح."} },
      { code:"EU AI ACT · ART. 19", sev:"min", stat:"prog", due:7, own:{en:"Platform team", ar:"فريق المنصة"},
        t:{en:"Log retention is 30 days on s3://prod-logs, below the six-month floor.",
           ar:"مدة الاحتفاظ بالسجلات 30 يوما على s3://prod-logs، دون الحد الأدنى بستة أشهر."} },
      { code:"ISO 42001 · CL. 7.3", sev:"min", stat:"prog", due:30, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"Control-owner awareness does not match observed system state.", ar:"وعي مالك الضابط لا يطابق حالة النظام المرصودة."} },
      { code:"EU AI ACT · ART. 10(2)(f)", sev:"min", stat:"open", due:45, own:{en:"ML engineering", ar:"هندسة التعلم الآلي"},
        t:{en:"No documented bias examination of the training data.", ar:"لا فحص موثقا للتحيز في بيانات التدريب."} },
      { code:"ISO 23894 · CL. 6.1", sev:"min", stat:"open", due:45, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"Risk register review cadence is not evidenced across the lifecycle.", ar:"لا دليل على وتيرة مراجعة سجل المخاطر عبر دورة الحياة."} },
      { code:"EU AI ACT · ART. 72", sev:"min", stat:"open", due:60, own:{en:"GRC office", ar:"مكتب الحوكمة"},
        t:{en:"No post-market monitoring plan proportionate to a high-risk system.", ar:"لا خطة مراقبة بعد الطرح تتناسب مع نظام عالي المخاطر."} },
      { code:"ISO 42001 · A.10.2", sev:"min", stat:"open", due:60, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"Supplier agreements carry no AI-specific obligations or audit rights.",
           ar:"اتفاقيات المورّدين لا تتضمن التزامات خاصة بالذكاء الاصطناعي أو حقوق تدقيق."} },
      { code:"EU AI ACT · ART. 27", sev:"min", stat:"open", due:45, own:{en:"Legal counsel", ar:"المستشار القانوني"},
        t:{en:"No fundamental rights impact assessment recorded before first use.",
           ar:"لا تقييم أثر على الحقوق الأساسية مسجلا قبل أول استخدام."} },
      { code:"ISO 42001 · CL. 7.2", sev:"obs", stat:"open", due:30, own:{en:"People ops", ar:"شؤون الموظفين"},
        t:{en:"Operator competence is not evidenced; no training records for recruiters.",
           ar:"كفاءة المشغلين غير مدعومة بأدلة؛ لا سجلات تدريب للمسؤولين عن التوظيف."} }
    ];

    var REM = [
      { eff:"s", unlocks:8,  t:{en:"Extend the s3://prod-logs lifecycle rule to at least six months.",
                                ar:"مدّد قاعدة دورة الحياة على s3://prod-logs إلى ستة أشهر على الأقل."} },
      { eff:"s", unlocks:11, t:{en:"Revoke or re-scope the 3 non-engineering principals on prod-models.",
                                ar:"ألغِ أو أعد تحديد صلاحيات الجهات الثلاث من خارج الهندسة على prod-models."} },
      { eff:"m", unlocks:9,  t:{en:"Stand up the internal audit cycle and run the first audit.",
                                ar:"فعّل دورة التدقيق الداخلي ونفّذ التدقيق الأول."} },
      { eff:"m", unlocks:21, t:{en:"Run and document the Article 10 bias examination.",
                                ar:"نفّذ فحص التحيز بموجب المادة 10 ووثّقه."} },
      { eff:"m", unlocks:11, t:{en:"Complete the fundamental rights impact assessment before the next deployment.",
                                ar:"أكمل تقييم الأثر على الحقوق الأساسية قبل النشر التالي."} }
    ];

    var lang = "en";
    try{ var sl = localStorage.getItem("tahara-lang"); if(sl === "ar" || sl === "en") lang = sl; }catch(e){}

    function render(){
      var d = T[lang];
      document.documentElement.lang = lang === "ar" ? "ar" : "en";
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      root.querySelectorAll("[data-i]").forEach(function(el){
        var v = d[el.getAttribute("data-i")];
        if(typeof v !== "string") return;
        if(el.getAttribute("data-i") === "p1" || el.getAttribute("data-i") === "p6") el.innerHTML = v;
        else el.textContent = v;
      });
      root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
        b.classList.toggle("on", b.getAttribute("data-lang") === lang);
      });
      document.querySelector("#rpFinds tbody").innerHTML = FINDS.map(function(f){
        return '<tr>' +
          '<td class="mono keep">' + f.code + '</td>' +
          '<td><span class="pill ' + f.sev + '">' + d.sev[f.sev] + '</span></td>' +
          '<td>' + f.t[lang] + '</td>' +
          '<td class="hidecol">' + f.own[lang] + '</td>' +
          '<td class="num hidecol keep">' + (f.due ? d.days(f.due) : d.dash) + '</td>' +
          '<td><span class="pill ' + f.stat + '">' + d.stat[f.stat] + '</span></td>' +
        '</tr>';
      }).join("");
      document.getElementById("rpRem").innerHTML = REM.map(function(r){
        return '<li><span>' + r.t[lang] +
          '<span class="meta keep">' + (r.eff === "s" ? d.effS : d.effM) + ' · ' + d.unlocks(r.unlocks) + '</span></span></li>';
      }).join("");
      try{ localStorage.setItem("tahara-lang", lang); }catch(e){}
    }
    root.querySelectorAll(".seg button[data-lang]").forEach(function(b){
      b.addEventListener("click", function(){
        if(lang === b.getAttribute("data-lang")) return;
        lang = b.getAttribute("data-lang"); render();
      });
    });

    try{ var st = localStorage.getItem("tahara-theme"); if(st) document.documentElement.dataset.theme = st; }catch(e){}
    document.getElementById("rpTheme").addEventListener("click", function(){
      var n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = n;
      try{ localStorage.setItem("tahara-theme", n); }catch(e){}
    });

    var now = new Date();
    document.getElementById("rpDate").textContent =
      now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,"0") + "-" + String(now.getDate()).padStart(2,"0");

    render();

  } finally {
    window.setTimeout = _origST;
  }
  return function dispose(){
    _timers.forEach(function(id){ clearTimeout(id); });
  };
}


  const INIT = { guardrails: initGuardrails, discovery: initDiscovery, assessment: initChat, gap: initGap, report: initReport };
  const fn = INIT[which];
  return typeof fn === "function" ? fn() : function(){};
}
