/* Ported from the approved combined design file: hero (hxr), v29 posture data, detail modals. */
export function initOverview(){
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
