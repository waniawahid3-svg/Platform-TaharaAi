/* Ported from tahara-overview-redesign-v27.html (approved design file). */
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

  /* ticker loop */
  var tk = document.getElementById('tktrack');
  tk.innerHTML = tk.innerHTML + tk.innerHTML;

  /* hero */
  requestAnimationFrame(function(){ document.getElementById('hero').classList.add('live'); });

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
