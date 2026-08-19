/* Ported from the approved combined design file: framework redesign v5 (fwr). */
export function initFramework(){
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

  show(window.__fwSel||'eu-ai-act'); window.__fwSel=null;

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
