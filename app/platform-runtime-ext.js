"use client";

/* Runtime for the Tahara platform pages, lifted unchanged from the reviewed
   HTML build. Everything runs inside run(), so it executes on mount when the
   markup is in the DOM. Each init returns a dispose that unwinds itself. */

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
        kTools:'Tools wrapped', kLayers:'Evidence layers', kFind:'Findings, last cycle', kProbes:'Probes per cycle',
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

    /* ═══ the interview ═══ */
    var S = document.getElementById("stream");
    var step = 0, est = 0, doc = 0, dis = 0, finds = 0;
    var TOTAL = 187;
    var AV = '<span class="av"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3 20 7.4 12 11.8 4 7.4 12 3Z" fill="currentColor"/><path d="M12 10.4 20 15l-8 4.6L4 15l8-4.6Z" fill="currentColor" opacity=".55"/></svg></span>';

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
    function bot(html, cls){
      var d = document.createElement("div");
      d.className = "msg";
      d.innerHTML = '<div class="who">' + AV + '<span>' + T[lang].auditor + '</span></div>' +
                    '<div class="bubble ' + (cls || "") + '">' + html + '</div>';
      S.appendChild(d); scrollEnd(); return d;
    }
    function me(txt){
      var d = document.createElement("div");
      d.className = "msg me";
      d.innerHTML = '<div class="who"><span>' + T[lang].you + '</span></div><div class="bubble">' + txt + '</div>';
      S.appendChild(d); scrollEnd();
    }
    function typing(){
      var d = document.createElement("div");
      d.className = "msg"; d.id = "typ";
      d.innerHTML = '<div class="who">' + AV + '<span>' + T[lang].auditor + '</span></div>' +
                    '<div class="bubble" style="padding:0"><div class="typing"><i></i><i></i><i></i></div></div>';
      S.appendChild(d); scrollEnd();
    }
    function untype(){ var t = document.getElementById("typ"); if(t) t.remove(); }
    var _t = [];
    function after(fn, ms){ var id = setTimeout(fn, RM ? 0 : ms); _t.push(id); return id; }
    function clearTimers(){ _t.forEach(clearTimeout); _t = []; }

    function upd(){
      var p = Math.round(est / TOTAL * 100);
      document.getElementById("pct").textContent = p;
      document.getElementById("pbar").style.width = p + "%";
      document.getElementById("kEst").textContent = est;
      document.getElementById("kDoc").textContent = doc;
      document.getElementById("kDis").textContent = dis;
      document.getElementById("kNeed").textContent = TOTAL - est;
      var fw = function(v){ return v > 0 ? Math.min(99, Math.round(v / TOTAL * 100)) + "%" : "—"; };
      document.getElementById("fEU").textContent   = fw(est);
      document.getElementById("fISO").textContent  = fw(est);
      document.getElementById("f238").textContent  = fw(est * 0.8);
      document.getElementById("fNIST").textContent = fw(est * 0.9);
    }
    function finding(code, txt){
      finds++;
      var f = document.getElementById("findings");
      if(finds === 1) f.innerHTML = "";
      f.insertAdjacentHTML("afterbegin",
        '<div class="find"><div class="c keep">' + code + '</div><div class="t keep">' + txt + '</div></div>');
      document.getElementById("fnCount").textContent = finds;
    }

    function L(o){ return (o && o[lang]) || (o && o.en) || o; }

    var TX = {
      en:{
        intro:'I\'m the assurance auditor for your <b>master framework</b> assessment: EU AI Act, ISO/IEC 42001, ISO/IEC 23894 and NIST AI RMF, scoped to <b>187 requirements</b> with the overlap removed.',
        how:'<b>How this works:</b> start by giving me whatever you already have. I\'ll read it and extract only the facts these frameworks actually need, then I\'ll ask about what your documents don\'t say.',
        dropM:'Drop your documents, or click to select',
        dropS:'ARCHITECTURE · MODEL CARDS · POLICIES · DPA · RISK REGISTER',
        uploaded:'Uploaded 3 documents',
        read:'Read all three, <b>147 chunks indexed</b>. I pulled 23 facts.',
        exH:'EXTRACTED · CITED TO SOURCE',
        notRelied:'<b>Nothing here is relied on yet.</b> These were read by a machine, not confirmed by you. Anything that would <i>excuse</i> you from an obligation, I\'ll put to you directly.',
        whatsLeft:'<b>What\'s left:</b> your documents answered 23 of 187. I have <b>15 questions</b> that your documents don\'t answer, and I\'ll stop as soon as the remainder can\'t change the outcome.',
        of:' / 15',
        finish:'I have enough to generate your gap assessment. There are <b>19 requirements</b> left, and none of them can change the findings we\'ve already established, so I\'m not going to ask you about them.',
        landed:function(e,f){ return '<b>Where you landed:</b> ' + e + ' of 187 requirements mapped, ' + f + ' findings on the register, two of them major nonconformities. The collector keeps watching the ones tied to system state.'; },
        viewGap:'View gap assessment',
        noted:'Noted, I\'ve added that to the profile. Continue with the options above.',
        triH:'▲ TRIANGULATION · THREE SOURCES, THREE ANSWERS',
        triH2:'▲ TRIANGULATION · RETENTION POLICY',
        claim:'CLAIM', document:'DOCUMENT', reality:'REALITY', observed:'OBSERVED', required:'REQUIRED'
      },
      ar:{
        intro:'أنا مدقق الضمان لتقييم <b>الإطار الرئيسي</b> الخاص بك: قانون الذكاء الاصطناعي الأوروبي، وآيزو 42001، وآيزو 23894، وإطار نيست، ضمن نطاق <b>187 متطلبا</b> بعد إزالة التداخل.',
        how:'<b>كيف تسير العملية:</b> ابدأ بإعطائي ما لديك بالفعل. سأقرؤه وأستخرج منه الحقائق التي تحتاجها هذه الأُطر فقط، ثم أسألك عما لا تذكره مستنداتك.',
        dropM:'أفلت مستنداتك هنا، أو انقر للاختيار',
        dropS:'البنية · بطاقات النماذج · السياسات · اتفاقية معالجة البيانات · سجل المخاطر',
        uploaded:'تم رفع 3 مستندات',
        read:'قرأت الثلاثة جميعا، <b>تمت فهرسة 147 مقطعا</b>. استخرجت 23 حقيقة.',
        exH:'مستخرجة · موثقة إلى المصدر',
        notRelied:'<b>لا شيء هنا معتمد بعد.</b> قرأتها آلة، ولم تؤكدها أنت. وكل ما قد <i>يعفيك</i> من التزام سأطرحه عليك مباشرة.',
        whatsLeft:'<b>ما تبقى:</b> أجابت مستنداتك عن 23 من 187. لدي <b>15 سؤالا</b> لا تجيب عنها مستنداتك، وسأتوقف حالما يصبح الباقي غير قادر على تغيير النتيجة.',
        of:' / ١٥',
        finish:'لدي ما يكفي لإصدار تقييم الفجوات. تبقى <b>19 متطلبا</b>، ولا يمكن لأي منها أن يغير الملاحظات التي أثبتناها، لذلك لن أسألك عنها.',
        landed:function(e,f){ return '<b>أين وصلت:</b> جرى تغطية ' + e + ' من 187 متطلبا، مع ' + f + ' ملاحظة في السجل، اثنتان منها عدم مطابقة كبرى. ويواصل المُجمّع مراقبة ما يرتبط منها بحالة النظام.'; },
        viewGap:'عرض تقييم الفجوات',
        noted:'سُجل، أضفته إلى الملف. تابع مع الخيارات أعلاه.',
        triH:'▲ تثليث · ثلاثة مصادر، ثلاث إجابات',
        triH2:'▲ تثليث · سياسة الاحتفاظ',
        claim:'ما قلته', document:'المستند', reality:'الواقع', observed:'المرصود', required:'المطلوب'
      }
    };

    function boot(){
      var t = TX[lang];
      bot(t.intro +
          '<div class="why">' + t.how + '</div>' +
          '<div class="drop" id="dropZ">' +
            '<div class="i"><svg viewBox="0 0 24 24" fill="none"><path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>' +
            '<div class="m">' + t.dropM + '</div>' +
            '<div class="s">' + t.dropS + '</div>' +
          '</div>');
      var dz = document.getElementById("dropZ");
      if(dz) dz.addEventListener("click", upload);
    }

    function upload(){
      var t = TX[lang];
        me(t.uploaded);
      var d = document.getElementById("dropZ"); if(d) d.remove();
      var ok = '<span class="ok"><svg viewBox="0 0 16 16" fill="none"><path d="m3.5 8.4 3 3 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      document.querySelector(".msg .bubble").insertAdjacentHTML("beforeend",
        '<div class="files">' +
        '<div class="file"><span class="n keep">architecture-v4.pdf</span><span class="s keep">2.1 MB</span>' + ok + '</div>' +
        '<div class="file"><span class="n keep">model-card.md</span><span class="s keep">14 KB</span>' + ok + '</div>' +
        '<div class="file"><span class="n keep">access-control-policy-v3.docx</span><span class="s keep">88 KB</span>' + ok + '</div>' +
        '</div>');
      typing();
      after(function(){
        untype();
        doc = 23; est = 23; upd();
        bot(t.read +
          '<div class="extract">' +
            '<div class="extract-h">' + t.exH + '</div>' +
            '<div class="ex"><span class="f keep">system.deployment_model</span><span class="v keep">cloud_saas</span><span class="c keep">0.94</span><span class="src keep">arch p.2</span></div>' +
            '<div class="ex"><span class="f keep">system.annex_iii_domains</span><span class="v keep">employment</span><span class="c keep">0.91</span><span class="src keep">arch p.1</span></div>' +
            '<div class="ex"><span class="f keep">data.processes_personal_data</span><span class="v keep">true</span><span class="c keep">0.97</span><span class="src keep">arch p.4</span></div>' +
            '<div class="ex"><span class="f keep">lifecycle.has_automatic_logging</span><span class="v keep">true</span><span class="c keep">0.88</span><span class="src keep">arch p.5</span></div>' +
            '<div class="ex"><span class="f keep">iso.access_control_policy</span><span class="v keep">documented</span><span class="c keep">0.93</span><span class="src keep">policy p.1</span></div>' +
          '</div>' +
          '<div class="why">' + t.notRelied + '</div>' +
          '<div class="why">' + t.whatsLeft + '</div>');
        after(ask, 420);
      }, 1000);
    }

    /* ═══ 15 questions your documents don't answer, in both languages ═══ */
    var Q = [
    { n:"01", tag:"EU AI ACT · ART. 6(3)", est:31,
      find:{ en:[["EU AI ACT · ART. 6(3)","Derogation unavailable. Profiling is an absolute bar, so the system is high-risk."]],
             ar:[["EU AI ACT · ART. 6(3)","الاستثناء غير متاح. التنميط مانع مطلق، لذا يُعد النظام عالي المخاطر."]] },
      en:{ q:'Your model card says the system evaluates candidates\' <b>likely job performance, reliability, and career progression</b>.',
           why:'<b>Why I\'m asking:</b> this decides whether the Article 6(3) derogation is available to you, and it also drives ISO 42001 Clause 6.1.4. It unblocks <b>34 requirements</b>.',
           o:["Yes, the system evaluates personal aspects of individuals","No, it makes no evaluation of any individual|ATTESTATION","Only in aggregate, never per-person"],
           r:'Understood, and that\'s decisive.<div class="why">Under the final subparagraph of <b>Article 6(3)</b>, an Annex III system that profiles natural persons is <b>always high-risk</b>, regardless of how narrow the task is. That engages Articles 9 to 15, 17, 43, 48 and 49, and ISO 42001 Clause 6.1.2 with it.</div>' },
      ar:{ q:'تذكر بطاقة النموذج أن النظام يقيّم لدى المرشحين <b>الأداء الوظيفي المتوقع والموثوقية والتقدم المهني</b>.',
           why:'<b>سبب السؤال:</b> هذا يحدد ما إذا كان استثناء المادة 6(3) متاحا لك، كما يقود البند 6.1.4 من آيزو 42001. ويفتح <b>34 متطلبا</b>.',
           o:["نعم، يقيّم النظام جوانب شخصية لدى الأفراد","لا، لا يجري أي تقييم لأي فرد|إقرار","بشكل تجميعي فقط، وليس لكل شخص"],
           r:'مفهوم، وهذه إجابة حاسمة.<div class="why">بموجب الفقرة الأخيرة من <b>المادة 6(3)</b>، فإن أي نظام ضمن الملحق الثالث يقوم بتنميط أشخاص طبيعيين يُعد <b>عالي المخاطر دائما</b>، مهما ضاقت مهمته. وهذا يفعّل المواد من 9 إلى 15، و17، و43، و48، و49، ومعها البند 6.1.2 من آيزو 42001.</div>' } },

    { n:"02", tag:"ISO 42001 · A.4.2", est:40, dis:9, probe:"1,247", flag:1,
      find:{ en:[["ISO 42001 · A.4.2","MAJOR NC. Documented access control is not operating: 3 non-engineering principals."],
                 ["ISO 42001 · CL. 7.3","Awareness gap. The control owner's understanding does not match system state."]],
             ar:[["ISO 42001 · A.4.2","عدم مطابقة كبرى. ضبط الوصول الموثق غير مطبق: 3 جهات من خارج الهندسة."],
                 ["ISO 42001 · CL. 7.3","فجوة وعي. فهم مالك الضابط لا يطابق حالة النظام."]] },
      en:{ q:'Access control. Your policy, <code>access-control-policy-v3</code>, states least privilege, engineering only.<br><br>Who can actually reach the model artefacts and training data today?',
           why:'<b>Why I\'m asking:</b> ISO 42001 <b>A.4.2</b> and EU AI Act <b>Art. 15</b>. Unblocks 11 requirements.',
           o:["Engineering team only, as the policy says","Engineering, plus leadership have read access","I'd have to check with the platform team"],
           r:function(label){ var t=TX.en; return 'I need to stop you there, and this isn\'t a criticism. It\'s exactly the kind of thing this process exists to surface.<br><br><b>The collector observed your IAM configuration 41 minutes ago.</b> It does not agree with either your policy or your answer.' +
              '<div class="evid"><div class="evid-h">' + t.triH + '</div>' +
              '<div class="evid-r"><b>' + t.claim + '</b><span>"' + label + '", you, just now</span></div>' +
              '<div class="evid-r"><b>' + t.document + '</b><span>Policy v3: least privilege, engineering only</span></div>' +
              '<div class="evid-r"><b>' + t.reality + '</b><span class="bad">14 principals on <code>s3://prod-models</code>. 3 outside engineering. 1 service account with <code>*</code>.</span></div></div>' +
              '<div class="why"><b>Two findings, one delta.</b> The control isn\'t operating, a major nonconformity under A.4.2. And the fact that you believed otherwise is itself a <b>Clause 7.3</b> awareness gap.</div>'; } },
      ar:{ q:'ضبط الوصول. تنص سياستك <code>access-control-policy-v3</code> على مبدأ الحد الأدنى من الامتيازات، وللهندسة فقط.<br><br>من يستطيع فعليا الوصول إلى مكوّنات النموذج وبيانات التدريب اليوم؟',
           why:'<b>سبب السؤال:</b> البند <b>A.4.2</b> من آيزو 42001 و<b>المادة 15</b> من القانون الأوروبي. ويفتح 11 متطلبا.',
           o:["فريق الهندسة فقط، كما تنص السياسة","الهندسة، مع صلاحية اطلاع للقيادة","سأحتاج إلى مراجعة فريق المنصة"],
           r:function(label){ var t=TX.ar; return 'سأتوقف هنا، وهذا ليس انتقادا. بل هو تحديدا ما وُجدت هذه العملية لكشفه.<br><br><b>رصد المُجمّع إعدادات إدارة الهوية لديك قبل 41 دقيقة.</b> وهي لا تتفق مع سياستك ولا مع إجابتك.' +
              '<div class="evid"><div class="evid-h">' + t.triH + '</div>' +
              '<div class="evid-r"><b>' + t.claim + '</b><span>«' + label + '»، منك، قبل قليل</span></div>' +
              '<div class="evid-r"><b>' + t.document + '</b><span>السياسة الإصدار 3: الحد الأدنى من الامتيازات، للهندسة فقط</span></div>' +
              '<div class="evid-r"><b>' + t.reality + '</b><span class="bad">14 جهة على <code>s3://prod-models</code>. 3 خارج الهندسة. وحساب خدمة واحد بصلاحية <code>*</code>.</span></div></div>' +
              '<div class="why"><b>ملاحظتان من فارق واحد.</b> الضابط غير مطبق، وهذه عدم مطابقة كبرى بموجب A.4.2. وكونك اعتقدت خلاف ذلك يمثل بذاته فجوة وعي بموجب <b>البند 7.3</b>.</div>'; } } },

    { n:"03", tag:"ISO 42001 · A.4.2", est:47,
      en:{ q:'Those three principals outside engineering. If they\'re legitimate we amend the policy; if they\'re not, that\'s a remediation item.<br><br>Which is it?',
           why:'<b>Why I\'m asking:</b> the finding stays open either way, but the treatment differs. One is a document change, the other is a revocation with a due date.',
           o:["They're legitimate, the policy is stale and needs updating","They should not have access, this needs revoking","I need to escalate this to the platform team"],
           r:'Logged, with an owner and a due date. It\'ll appear in your <b>risk treatment plan</b>, and the alarm stays open until the collector observes it resolved, not until someone tells me it\'s done.<div class="why">That\'s the difference between a snapshot and continuous assurance.</div>' },
      ar:{ q:'تلك الجهات الثلاث خارج الهندسة. إن كانت مشروعة نعدّل السياسة، وإن لم تكن فهذا بند معالجة.<br><br>أي الأمرين؟',
           why:'<b>سبب السؤال:</b> تبقى الملاحظة مفتوحة في الحالتين، لكن المعالجة تختلف. إحداهما تعديل مستند، والأخرى إلغاء صلاحية بموعد محدد.',
           o:["مشروعة، والسياسة قديمة وتحتاج تحديثا","لا ينبغي أن تملك الوصول، ويجب إلغاؤه","أحتاج إلى تصعيد الأمر إلى فريق المنصة"],
           r:'سُجل، مع مالك وموعد استحقاق. وسيظهر في <b>خطة معالجة المخاطر</b>، ويبقى التنبيه مفتوحا حتى يرصد المُجمّع أنه عولج فعليا، لا حتى يخبرني أحد بذلك.<div class="why">هذا هو الفرق بين لقطة ثابتة وضمان مستمر.</div>' } },

    { n:"04", tag:"ISO 42001 · CL. 9.2", est:56,
      find:{ en:[["ISO 42001 · CL. 9.2","MAJOR NC. No internal audit records in the observation window."]],
             ar:[["ISO 42001 · CL. 9.2","عدم مطابقة كبرى. لا توجد سجلات تدقيق داخلي خلال نافذة الرصد."]] },
      en:{ q:'<b>ISO 42001 Clause 9.2</b>, internal audit.<br><br>Your AIMS requires a documented internal audit programme. When did you last run one?',
           why:'<b>Why I\'m asking:</b> this is where most certifications fail. Having a policy is a Clause 7.5 check and takes ten seconds. <b>Showing me the last three times you followed it</b> is the actual audit.',
           o:["Within the last six months, records available","Over a year ago","We've never run one"],
           r:'That\'s a <b>major nonconformity</b>, and it\'s the one that would stop a certification audit at the door.<div class="why">Clause 9.2 isn\'t satisfied by having an audit <i>programme</i>. It\'s satisfied by <b>records of audits actually performed</b>, and my collector found none over the last 12 months.</div>' },
      ar:{ q:'<b>البند 9.2 من آيزو 42001</b>، التدقيق الداخلي.<br><br>يتطلب نظام إدارة الذكاء الاصطناعي لديك برنامج تدقيق داخلي موثقا. متى نفذت آخر تدقيق؟',
           why:'<b>سبب السؤال:</b> هنا تفشل معظم عمليات الاعتماد. وجود سياسة هو تحقق بموجب البند 7.5 ولا يستغرق عشر ثوان. أما <b>إظهار آخر ثلاث مرات طبّقتها فيها</b> فهو التدقيق الحقيقي.',
           o:["خلال الأشهر الستة الماضية، والسجلات متاحة","قبل أكثر من سنة","لم ننفذ أي تدقيق"],
           r:'هذه <b>عدم مطابقة كبرى</b>، وهي التي توقف تدقيق الاعتماد عند الباب.<div class="why">لا يُستوفى البند 9.2 بوجود <i>برنامج</i> تدقيق، بل بـ<b>سجلات تدقيقات نُفذت فعلا</b>، ولم يجد المُجمّع أيا منها خلال 12 شهرا.</div>' } },

    { n:"05", tag:"EU AI ACT · ART. 9", est:66,
      find:{ en:[["ISO 23894 · CL. 6.1","Risk register review cadence is not evidenced across the lifecycle."]],
             ar:[["ISO 23894 · CL. 6.1","لا دليل على وتيرة مراجعة سجل المخاطر عبر دورة الحياة."]] },
      en:{ q:'Risk management. <b>Article 9</b> requires a risk management system that runs across the entire lifecycle, not a document written once.<br><br>How often is your AI risk register actually reviewed?',
           why:'<b>Why I\'m asking:</b> Article 9(2) uses the words "continuous iterative process", and ISO 23894 Clause 6 mirrors it. Unblocks 16 requirements.',
           o:["Quarterly, with dated minutes","Annually, at the management review","It exists but has no fixed cadence"],
           r:'Noted. I\'ll test that against reality later rather than take it on trust.<div class="why">Article 9 is judged on evidence of iteration: versions, dates, and changes that followed an event. If the register hasn\'t changed since it was written, a reviewer reads that as a document, not a system.</div>' },
      ar:{ q:'إدارة المخاطر. تتطلب <b>المادة 9</b> نظام إدارة مخاطر يعمل عبر دورة الحياة كاملة، لا مستندا يُكتب مرة واحدة.<br><br>كم مرة يُراجع سجل مخاطر الذكاء الاصطناعي لديك فعليا؟',
           why:'<b>سبب السؤال:</b> تستخدم المادة 9(2) عبارة «عملية تكرارية مستمرة»، ويعكسها البند 6 من آيزو 23894. ويفتح 16 متطلبا.',
           o:["ربع سنويا، مع محاضر مؤرخة","سنويا، ضمن مراجعة الإدارة","موجود لكن دون وتيرة ثابتة"],
           r:'سُجل. وسأختبر ذلك لاحقا مقابل الواقع بدل أن آخذه على محمل الثقة.<div class="why">تُقاس المادة 9 بأدلة التكرار: الإصدارات، والتواريخ، والتغييرات التي تلت حدثا. وإن لم يتغير السجل منذ كتابته، يقرؤه المراجع بوصفه مستندا لا نظاما.</div>' } },

    { n:"06", tag:"EU AI ACT · ART. 10", est:75,
      find:{ en:[["EU AI ACT · ART. 10(2)(f)","No documented bias examination for an Annex III employment system."]],
             ar:[["EU AI ACT · ART. 10(2)(f)","لا فحص موثق للتحيز في نظام توظيف ضمن الملحق الثالث."]] },
      en:{ q:'Data governance. <b>Article 10(2)(f)</b> requires examination for bias that could affect health, safety or fundamental rights.<br><br>Have you examined your training data for bias, and are the results written down?',
           why:'<b>Why I\'m asking:</b> for an employment system this is the highest-exposure obligation you have. It also drives ISO 42001 A.7.4 and the NIST MEASURE function. Unblocks 21 requirements.',
           o:["Yes, documented with metrics per protected characteristic","Informally, nothing written down","Not yet, it's planned"],
           r:'That goes on the register as a priority item.<div class="why">Article 10 is one of the few obligations where the absence of a record is itself the nonconformity. For employment systems, a market surveillance authority will ask for this first.</div>' },
      ar:{ q:'حوكمة البيانات. تتطلب <b>المادة 10(2)(و)</b> فحصا للتحيز الذي قد يؤثر في الصحة أو السلامة أو الحقوق الأساسية.<br><br>هل فحصت بيانات التدريب بحثا عن التحيز، وهل النتائج مدونة؟',
           why:'<b>سبب السؤال:</b> في نظام توظيف، هذا أكثر التزاماتك تعرضا للمساءلة. كما يقود البند A.7.4 من آيزو 42001 ووظيفة القياس في إطار نيست. ويفتح 21 متطلبا.',
           o:["نعم، موثق بمقاييس لكل خاصية محمية","بشكل غير رسمي، دون توثيق","ليس بعد، وهو مخطط له"],
           r:'يُدرج في السجل كبند ذي أولوية.<div class="why">المادة 10 من الالتزامات القليلة التي يشكل فيها غياب السجل ذاته عدم مطابقة. وفي أنظمة التوظيف، تطلب سلطة مراقبة السوق هذا أولا.</div>' } },

    { n:"07", tag:"EU AI ACT · ART. 14", est:85,
      en:{ q:'Human oversight. <b>Article 14</b> requires that a natural person can understand the output, decide not to use it, and override it.<br><br>Can a recruiter override the score, and is the override recorded?',
           why:'<b>Why I\'m asking:</b> oversight that can\'t be evidenced doesn\'t count. This also maps to ISO 42001 A.9.2 and NIST GOVERN 3.2. Unblocks 12 requirements.',
           o:["Yes, overrides are possible and logged with a reason","Overrides are possible but not recorded","The score is advisory, nobody formally overrides it"],
           r:'Recorded. I\'ll ask the collector to look for override events in your application logs and reconcile that with what you\'ve told me.<div class="why">Article 14(4)(d) is about the ability to <i>disregard</i> the output. If no override has ever been exercised, that is not proof it can\'t be, but it is the first thing a reviewer probes.</div>' },
      ar:{ q:'الإشراف البشري. تتطلب <b>المادة 14</b> أن يتمكن شخص طبيعي من فهم المخرجات، وأن يقرر عدم استخدامها، وأن يتجاوزها.<br><br>هل يستطيع المسؤول عن التوظيف تجاوز النتيجة، وهل يُسجل التجاوز؟',
           why:'<b>سبب السؤال:</b> الإشراف الذي لا يمكن إثباته لا يُحتسب. وينطبق أيضا على A.9.2 من آيزو 42001 وGOVERN 3.2 في نيست. ويفتح 12 متطلبا.',
           o:["نعم، التجاوز ممكن ويُسجل مع السبب","التجاوز ممكن لكنه لا يُسجل","النتيجة استرشادية، ولا أحد يتجاوزها رسميا"],
           r:'سُجل. وسأطلب من المُجمّع البحث عن أحداث تجاوز في سجلات التطبيق ومطابقتها بما ذكرته.<div class="why">تتعلق المادة 14(4)(د) بالقدرة على <i>تجاهل</i> المخرجات. وعدم ممارسة أي تجاوز ليس دليلا على استحالته، لكنه أول ما يفحصه المراجع.</div>' } },

    { n:"08", tag:"EU AI ACT · ART. 12", est:94, dis:14, probe:"1,318",
      find:{ en:[["EU AI ACT · ART. 19","Log retention below the six-month floor observed on the logging bucket."]],
             ar:[["EU AI ACT · ART. 19","مدة الاحتفاظ بالسجلات أقل من الحد الأدنى المقرر بستة أشهر."]] },
      en:{ q:'Logging. Your architecture says automatic logging is enabled.<br><br>How long are those logs retained?',
           why:'<b>Why I\'m asking:</b> <b>Article 19</b> sets a floor of six months for high-risk systems, and Article 12 governs what must be in them.',
           o:["Twelve months or more","Ninety days","Thirty days"],
           r:'The collector already had a view on this.<div class="evid"><div class="evid-h">' + '▲ TRIANGULATION · RETENTION POLICY' + '</div>' +
              '<div class="evid-r"><b>OBSERVED</b><span class="bad">Lifecycle rule on <code>s3://prod-logs</code> expires objects after <b>30 days</b>.</span></div>' +
              '<div class="evid-r"><b>REQUIRED</b><span>Article 19: at least six months, appropriate to the intended purpose.</span></div></div>' +
              '<div class="why">This one is cheap to fix and expensive to leave. Until that rule changes, every other logging obligation rests on records that delete themselves.</div>' },
      ar:{ q:'التسجيل. تذكر بنيتك أن التسجيل التلقائي مفعّل.<br><br>ما مدة الاحتفاظ بتلك السجلات؟',
           why:'<b>سبب السؤال:</b> تضع <b>المادة 19</b> حدا أدنى بستة أشهر للأنظمة عالية المخاطر، وتحكم المادة 12 محتوى تلك السجلات.',
           o:["اثنا عشر شهرا أو أكثر","تسعون يوما","ثلاثون يوما"],
           r:'كان لدى المُجمّع رأي في هذا مسبقا.<div class="evid"><div class="evid-h">▲ تثليث · سياسة الاحتفاظ</div>' +
              '<div class="evid-r"><b>المرصود</b><span class="bad">قاعدة دورة حياة على <code>s3://prod-logs</code> تحذف الكائنات بعد <b>30 يوما</b>.</span></div>' +
              '<div class="evid-r"><b>المطلوب</b><span>المادة 19: ستة أشهر على الأقل، بما يتناسب مع الغرض المقصود.</span></div></div>' +
              '<div class="why">إصلاح هذا رخيص، وتركه مكلف. فما دامت تلك القاعدة قائمة، تستند كل التزامات التسجيل الأخرى إلى سجلات تحذف نفسها.</div>' } },

    { n:"09", tag:"EU AI ACT · ANNEX IV", est:103,
      en:{ q:'Technical documentation. <b>Annex IV</b> lists nine headings that must exist before the system is placed on the market.<br><br>Which best describes what you hold today?',
           why:'<b>Why I\'m asking:</b> your architecture document covers roughly four of the nine. Annex IV is assessed as a set, not a best effort. Unblocks 18 requirements.',
           o:["A complete Annex IV pack, maintained under version control","Partial, spread across engineering documents","Nothing assembled against Annex IV specifically"],
           r:'That matches what I read. I\'ll map what you have against the nine headings and show you the gaps by name.<div class="why">Most teams already hold 60 to 70 percent of Annex IV inside engineering docs. The work is assembly and maintenance, not authoring from scratch.</div>' },
      ar:{ q:'التوثيق التقني. يعدد <b>الملحق الرابع</b> تسعة عناوين يجب توافرها قبل طرح النظام في السوق.<br><br>أي وصف ينطبق على ما لديك اليوم؟',
           why:'<b>سبب السؤال:</b> يغطي مستند بنيتك أربعة من التسعة تقريبا. ويُقيَّم الملحق الرابع كمجموعة، لا كجهد أفضل. ويفتح 18 متطلبا.',
           o:["حزمة كاملة للملحق الرابع، تحت ضبط الإصدارات","جزئي، موزع على مستندات هندسية","لا شيء مجمّع خصيصا وفق الملحق الرابع"],
           r:'هذا يطابق ما قرأته. سأقابل ما لديك بالعناوين التسعة وأعرض الفجوات بالاسم.<div class="why">تملك معظم الفرق أصلا 60 إلى 70 بالمئة من الملحق الرابع داخل مستنداتها الهندسية. والعمل هو التجميع والصيانة، لا التأليف من الصفر.</div>' } },

    { n:"10", tag:"EU AI ACT · ART. 72", est:112,
      find:{ en:[["EU AI ACT · ART. 72","No post-market monitoring plan proportionate to a high-risk system."]],
             ar:[["EU AI ACT · ART. 72","لا خطة مراقبة بعد الطرح تتناسب مع نظام عالي المخاطر."]] },
      en:{ q:'Post-market monitoring. <b>Article 72</b> requires a plan proportionate to the risk that actively collects performance data after deployment.<br><br>Do you have one?',
           why:'<b>Why I\'m asking:</b> this is the obligation that never gets written because it starts after launch. It also carries ISO 42001 Clause 9.1 and NIST MANAGE 4.1.',
           o:["Yes, a documented plan with defined metrics","We monitor uptime and errors, nothing AI-specific","No plan yet"],
           r:'On the register.<div class="why">Uptime monitoring is not post-market monitoring. Article 72 wants drift, complaints, and real-world performance against the intended purpose, fed back into the Article 9 risk system.</div>' },
      ar:{ q:'المراقبة بعد الطرح. تتطلب <b>المادة 72</b> خطة تتناسب مع المخاطر وتجمع بيانات الأداء فعليا بعد النشر.<br><br>هل لديك واحدة؟',
           why:'<b>سبب السؤال:</b> هذا الالتزام لا يُكتب أبدا لأنه يبدأ بعد الإطلاق. ويحمل معه البند 9.1 من آيزو 42001 وMANAGE 4.1 في نيست.',
           o:["نعم، خطة موثقة بمقاييس محددة","نراقب التوافر والأخطاء، دون شيء خاص بالذكاء الاصطناعي","لا خطة حتى الآن"],
           r:'يُدرج في السجل.<div class="why">مراقبة التوافر ليست مراقبة بعد الطرح. تريد المادة 72 الانحراف، والشكاوى، والأداء الواقعي مقابل الغرض المقصود، ثم تغذيتها في نظام مخاطر المادة 9.</div>' } },

    { n:"11", tag:"EU AI ACT · ART. 73", est:121,
      en:{ q:'Serious incidents. <b>Article 73</b> requires reporting to the market surveillance authority, in some cases within <b>15 days</b> of becoming aware.<br><br>Is there a defined path for that today?',
           why:'<b>Why I\'m asking:</b> the clock starts at awareness, not at triage. Without a named owner and a route, the deadline is missed by default. Also maps to ISO 42001 A.10.4.',
           o:["Yes, a named owner and a documented route","It would go through our general incident process","No defined path"],
           r:'Understood. I\'ll treat that as a control to be designed rather than a nonconformity, since nothing has been triggered yet.<div class="why">A general incident process is usually a reasonable base. What it lacks is the AI-specific trigger definition and the regulatory clock.</div>' },
      ar:{ q:'الحوادث الجسيمة. تتطلب <b>المادة 73</b> الإبلاغ إلى سلطة مراقبة السوق، وفي بعض الحالات خلال <b>15 يوما</b> من العلم بالحادث.<br><br>هل يوجد مسار محدد لذلك اليوم؟',
           why:'<b>سبب السؤال:</b> تبدأ المهلة من لحظة العلم، لا من الفرز. وبغياب مالك محدد ومسار واضح، يُفوَّت الموعد تلقائيا. وينطبق أيضا على A.10.4 من آيزو 42001.',
           o:["نعم، مالك محدد ومسار موثق","سيمر عبر عملية الحوادث العامة لدينا","لا يوجد مسار محدد"],
           r:'مفهوم. سأعامل ذلك كضابط يحتاج تصميما لا كعدم مطابقة، لأن شيئا لم يُفعَّل بعد.<div class="why">عملية الحوادث العامة أساس معقول عادة. وما ينقصها هو تعريف المُحفِّز الخاص بالذكاء الاصطناعي والمهلة التنظيمية.</div>' } },

    { n:"12", tag:"EU AI ACT · ART. 43/49", est:130,
      en:{ q:'Conformity. Before placing a high-risk system on the market you need a conformity assessment, an EU declaration, and registration in the <b>EU database</b>.<br><br>Where are you in that?',
           why:'<b>Why I\'m asking:</b> Annex III systems generally allow internal control under Article 43, which is good news. But the declaration and registration are still hard gates. Unblocks 14 requirements.',
           o:["Assessment done, declaration signed, registered","Started, nothing signed yet","Not started"],
           r:'That\'s consistent with the rest of the profile.<div class="why">Internal control means you can self-assess, so this is largely documentation and sequencing. It cannot complete until the Article 9, 10 and 12 gaps above are closed, because the declaration attests to them.</div>' },
      ar:{ q:'المطابقة. قبل طرح نظام عالي المخاطر في السوق تحتاج إلى تقييم مطابقة، وإعلان مطابقة أوروبي، وتسجيل في <b>قاعدة بيانات الاتحاد</b>.<br><br>أين وصلت في ذلك؟',
           why:'<b>سبب السؤال:</b> تتيح أنظمة الملحق الثالث عموما الضبط الداخلي بموجب المادة 43، وهذا خبر جيد. لكن الإعلان والتسجيل يبقيان بوابتين إلزاميتين. ويفتح 14 متطلبا.',
           o:["اكتمل التقييم، ووُقّع الإعلان، وتم التسجيل","بدأنا، ولم يُوقّع شيء بعد","لم نبدأ"],
           r:'هذا متسق مع بقية الملف.<div class="why">الضبط الداخلي يعني أنك تستطيع التقييم ذاتيا، فالمسألة توثيق وترتيب بالدرجة الأولى. ولا يمكن إتمامها قبل إغلاق فجوات المواد 9 و10 و12 أعلاه، لأن الإعلان يشهد عليها.</div>' } },

    { n:"13", tag:"EU AI ACT · ART. 4", est:139,
      find:{ en:[["ISO 42001 · CL. 7.2","Competence not evidenced for operators of the system."]],
             ar:[["ISO 42001 · CL. 7.2","لا دليل على كفاءة مشغّلي النظام."]] },
      en:{ q:'AI literacy. <b>Article 4</b> has applied since February 2025, and it obliges you to ensure a sufficient level of competence among the people who operate the system.<br><br>Have the recruiters using this system been trained on it?',
           why:'<b>Why I\'m asking:</b> Article 4 is already in force, unlike most of the high-risk obligations. ISO 42001 Clause 7.2 asks the same question and wants records.',
           o:["Yes, with attendance records","An informal briefing, no records","No training yet"],
           r:'Noted, with a record gap attached.<div class="why">Clause 7.2 is satisfied by evidence of competence, which usually means attendance, content, and date. This is the cheapest finding on your register to close.</div>' },
      ar:{ q:'الإلمام بالذكاء الاصطناعي. تسري <b>المادة 4</b> منذ فبراير 2025، وتلزمك بضمان مستوى كاف من الكفاءة لدى من يشغّلون النظام.<br><br>هل دُرّب المسؤولون عن التوظيف على هذا النظام؟',
           why:'<b>سبب السؤال:</b> المادة 4 نافذة بالفعل، بخلاف معظم التزامات الأنظمة عالية المخاطر. ويطرح البند 7.2 من آيزو 42001 السؤال نفسه ويطلب سجلات.',
           o:["نعم، مع سجلات حضور","إحاطة غير رسمية، دون سجلات","لا تدريب حتى الآن"],
           r:'سُجل، مع فجوة في السجلات.<div class="why">يُستوفى البند 7.2 بأدلة الكفاءة، وتعني عادة الحضور والمحتوى والتاريخ. وهذه أرخص ملاحظة في سجلك يمكن إغلاقها.</div>' } },

    { n:"14", tag:"ISO 42001 · A.10", est:148,
      find:{ en:[["ISO 42001 · A.10.2","Third-party AI obligations not evidenced in supplier agreements."]],
             ar:[["ISO 42001 · A.10.2","لا دليل على التزامات الذكاء الاصطناعي في اتفاقيات المورّدين."]] },
      en:{ q:'Third parties. Your architecture shows the scoring model is served through an external provider.<br><br>What do your contracts with them say about AI obligations?',
           why:'<b>Why I\'m asking:</b> ISO 42001 <b>A.10.2</b> and <b>A.10.3</b>, plus EU AI Act Article 25, which can make you the provider of record. Unblocks 9 requirements.',
           o:["Contracts include AI-specific obligations and audit rights","Standard DPA only, nothing AI-specific","I'd have to check the contract"],
           r:'On the register.<div class="why">A DPA covers personal data, not model behaviour, evaluation access, or change notification. Under Article 25 a substantial modification, or your branding on the output, can make you the provider carrying the full Chapter III obligations.</div>' },
      ar:{ q:'الأطراف الثالثة. تُظهر بنيتك أن نموذج التقييم يُقدَّم عبر مزوّد خارجي.<br><br>ماذا تنص عقودك معه بشأن التزامات الذكاء الاصطناعي؟',
           why:'<b>سبب السؤال:</b> البندان <b>A.10.2</b> و<b>A.10.3</b> من آيزو 42001، إضافة إلى المادة 25 من القانون الأوروبي التي قد تجعلك المزوّد المسجل. ويفتح 9 متطلبات.',
           o:["العقود تتضمن التزامات خاصة بالذكاء الاصطناعي وحقوق تدقيق","اتفاقية معالجة بيانات فقط، دون بنود خاصة","سأحتاج إلى مراجعة العقد"],
           r:'يُدرج في السجل.<div class="why">تغطي اتفاقية معالجة البيانات البيانات الشخصية، لا سلوك النموذج ولا صلاحية التقييم ولا الإخطار بالتغيير. وبموجب المادة 25، قد يجعلك أي تعديل جوهري، أو وضع علامتك على المخرجات، المزوّد الذي يتحمل كامل التزامات الفصل الثالث.</div>' } },

    { n:"15", tag:"EU AI ACT · ART. 27", est:168,
      find:{ en:[["EU AI ACT · ART. 27","No fundamental rights impact assessment recorded before first use."]],
             ar:[["EU AI ACT · ART. 27","لا تقييم أثر على الحقوق الأساسية مسجل قبل أول استخدام."]] },
      en:{ q:'Last one. <b>Article 27</b> requires a fundamental rights impact assessment for certain deployers of Annex III systems, before first use.<br><br>Has one been completed for this system?',
           why:'<b>Why I\'m asking:</b> it closes the loop between your risk register and the people the system actually affects, and ISO 23894 Clause 6.4.3 asks for the same analysis. Unblocks 11 requirements.',
           o:["Yes, completed and reviewed","In progress","No, and I'm not sure whether we're in scope"],
           r:'That completes what I need from you.<div class="why">Scope under Article 27 turns on who the deployer is and the purpose. On an employment system used on candidates, assume you are in scope until a lawyer tells you otherwise.</div>' },
      ar:{ q:'السؤال الأخير. تتطلب <b>المادة 27</b> تقييم أثر على الحقوق الأساسية لدى بعض ناشري أنظمة الملحق الثالث، قبل أول استخدام.<br><br>هل أُنجز واحد لهذا النظام؟',
           why:'<b>سبب السؤال:</b> يغلق الحلقة بين سجل مخاطرك والأشخاص الذين يؤثر فيهم النظام فعلا، ويطلب البند 6.4.3 من آيزو 23894 التحليل نفسه. ويفتح 11 متطلبا.',
           o:["نعم، أُنجز وروجع","قيد الإنجاز","لا، ولست متأكدا إن كنا ضمن النطاق"],
           r:'بهذا يكتمل ما أحتاجه منك.<div class="why">يتوقف النطاق بموجب المادة 27 على هوية الناشر والغرض. وفي نظام توظيف يُطبق على المرشحين، افترض أنك ضمن النطاق حتى يخبرك محام بغير ذلك.</div>' } }
    ];

    var qi = 0;

    function opts(list){
      return '<div class="opts">' + list.map(function(t, i){
        var parts = t.split("|");
        return '<div class="opt" data-i="' + i + '"><span class="k">' + "ABC".charAt(i) + '</span>' +
               '<span>' + parts[0] + '</span>' +
               (parts[1] ? '<span class="att">' + parts[1] + '</span>' : "") + '</div>';
      }).join("") + '</div>';
    }

    function ask(){
      var q = Q[qi];
      if(!q){ finish(); return; }
      var d = L(q);
      bot('<div class="qh"><span class="qn keep">' + q.n + TX[lang].of + '</span><span class="qt keep">' + q.tag + '</span></div>' +
          d.q + '<div class="why">' + d.why + '</div>' + opts(d.o));
    }

    function answer(ix){
      var q = Q[qi];
      if(!q) return;
      var d = L(q);
      var label = d.o[ix].split("|")[0];
      me(label);
      if(q.est) est = q.est;
      if(q.dis) dis = q.dis;
      upd();
      if(q.probe) document.getElementById("kProbe").textContent = q.probe;
      typing();
      after(function(){
        untype();
        (L(q.find) || []).forEach(function(f){ finding(f[0], f[1]); });
        bot(typeof d.r === "function" ? d.r(label) : d.r, q.flag ? "flag" : "");
        qi++;
        after(ask, 400);
      }, q.flag ? 1250 : 850);
    }

    function finish(){
      var t = TX[lang];
      bot(t.finish +
        '<div class="why">' + t.landed(est, finds) + '</div>' +
        '<div style="margin-top:18px"><a class="btn-p" href="/gap"><span>' + t.viewGap + '</span>' +
        '<svg viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 3.5 11.5 7 8 10.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>');
    var gcta = S.querySelector('a[href="/gap"]');
    if (gcta && typeof window.mount === "function"){
      gcta.addEventListener("click", function(e){ e.preventDefault(); window.mount("gap"); });
    }
    }

    S.addEventListener("click", function(e){
      var o = e.target.closest(".opt");
      if(!o) return;
      var box = o.closest(".opts");
      if(box) box.remove();
      answer(parseInt(o.getAttribute("data-i"), 10) || 0);
    });

    window.chxSend = function(){
      var i = document.getElementById("ci");
      if(!i.value.trim()) return;
      me(i.value); i.value = "";
      typing();
      after(function(){ untype(); bot(TX[lang].noted); }, 600);
    };

    /* switching language restarts the interview in that language */
    function restart(){
      clearTimers();
        S.innerHTML = "";
      qi = 0; est = 0; doc = 0; dis = 0; finds = 0;
      document.getElementById("kProbe").textContent = "1,204";
      document.getElementById("fnCount").textContent = "0";
      document.getElementById("findings").innerHTML =
        '<p class="muted" data-i="findEmpty">' + T[lang].findEmpty + '</p>';
      upd();
      boot();
    }
    window.__chxRestart = restart;

    applyLang();
    upd();
    boot();

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
