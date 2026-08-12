/* Overview page behaviour, ported 1:1 from the approved design file.
   Called from app/overview/page.js; returns a dispose fn. */
export function initOverview(){
  const _ios = [];
  function trackIO(io){ _ios.push(io); return io; }
  
  let navHandler = null;

  /* logo fallback wiring (replaces inline onerror) */
  document.querySelectorAll(".ovx img").forEach(function(img){
    img.addEventListener("error", function(){
      img.style.display = "none";
      const fb = img.nextElementSibling;
      if (fb && fb.tagName === "svg") fb.style.display = "block";
    });
    if (img.complete && img.naturalWidth === 0){
      img.style.display = "none";
      const fb = img.nextElementSibling;
      if (fb && fb.tagName === "svg") fb.style.display = "block";
    }
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
  var io = trackIO(new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.18}));
  document.querySelectorAll("[data-rv]").forEach(function(el){ io.observe(el); });

  var nav = document.querySelector(".nav");
  navHandler = function(){ nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", navHandler, {passive:true});
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

  return function dispose(){
    _ios.forEach(function(io){ io.disconnect(); });
    if (navHandler) window.removeEventListener("scroll", navHandler);
  };
}
