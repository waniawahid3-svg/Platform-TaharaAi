"use client";

/* Guardrails - /guardrails */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="grx">

  <div class="arail" aria-label="Live guardrail alerts"><div class="atrack" id="atrack"></div></div>

  <header class="top">
    <div class="top-in">
      <a class="brand" href="/overview">
        <img class="brand-img" src="https://www.taharaai.com/logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
        <svg class="brand-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
      </a>
      <nav class="tnav">
        <a href="/overview" data-i="nOverview">Overview</a>
        <a href="/governance" data-i="nGov">Governance</a>
        <a href="/framework" data-i="nFw">Frameworks</a>
        <a href="#" data-i="nDisc">Discovery</a>
        <a href="#" data-i="nAdv">Adversarial</a>
        <a class="on" href="/guardrails" data-i="nGuard">Guardrails</a>
      </nav>
      <div class="top-r">
        <button class="icb" id="themeTg" aria-label="Switch theme">
          <svg class="ic-moon" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg><svg class="ic-sun" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        </button>
        <div class="seg"><button class="on" data-lang="en">EN</button><button data-lang="ar">عربي</button></div>
        <a class="outl" href="/" data-i="signout">Sign out</a>
      </div>
    </div>
    <span class="progress" id="prog"></span>
  </header>

  <div class="wrap">

    <!-- ================= HERO ================= -->
    <section class="hero">
      <div class="hero-l">
        <h1 data-i="h1">Prompt inspection</h1>
        <p class="lede" data-i="lede">Every prompt is checked before it reaches the model, and every attachment the retrieval layer adds after it.</p>
        <div class="hero-cta">
          <a class="btn-p" href="#rules"><span data-i="ctaRules">Enforcement rules</span><svg viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3.5 7.5 7 11l3.5-3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <a class="btn-g" href="#finding"><i class="rd"></i><span data-i="ctaFind">Open finding</span><span class="bmono keep">GR-07</span></a>
        </div>
      </div>

      <div class="con" id="con">
        <svg class="links" viewBox="0 0 560 436" preserveAspectRatio="none" aria-hidden="true">
          <path class="arc" d="M-40 340 A 340 340 0 0 1 320 -36" />
          <path class="arc" d="M110 430 A 380 380 0 0 1 566 44" />
          <path class="wire" id="w1" d="M96 66 C 84 92, 76 104, 82 116" />
          <path class="wire" id="w2" d="M172 154 C 166 186, 158 210, 150 234" />
          <path class="wire" id="w3" d="M268 236 C 298 216, 322 192, 336 166" />
          <path class="wire" id="w4" d="M198 396 C 254 414, 306 410, 342 404" />
          <path class="wireOn" id="w1e" d="M96 66 C 84 92, 76 104, 82 116" />
          <path class="wireOn" id="w2e" d="M172 154 C 166 186, 158 210, 150 234" />
          <path class="wireOn" id="w3e" d="M268 236 C 298 216, 322 192, 336 166" />
          <path class="wireOn" id="w4e" d="M198 396 C 254 414, 306 410, 342 404" />
          <g class="node"><circle class="halo" cx="82" cy="116" r="5.5"/><circle class="core" cx="82" cy="116" r="2.4"/></g>
          <g class="node"><circle class="halo" cx="150" cy="234" r="5.5"/><circle class="core" cx="150" cy="234" r="2.4"/></g>
          <g class="node"><circle class="halo" cx="336" cy="166" r="5.5"/><circle class="core" cx="336" cy="166" r="2.4"/></g>
          <g class="node"><circle class="halo" cx="342" cy="404" r="5.5"/><circle class="core" cx="342" cy="404" r="2.4"/></g>
        </svg>

        <div class="nc n1" data-d="0">
          <span class="ic" style="background:var(--sky-t);color:var(--acc)"><svg viewBox="0 0 16 16" fill="none"><path d="M8.6 1.6 3.2 9h4L7 14.4 12.8 7h-4l-.2-5.4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
          <span><b data-i="c1a">Prompt received</b><span data-i="c1b">from the application</span></span>
        </div>

        <div class="nc n2" data-d="1">
          <span class="ic" style="background:var(--lilac-t);color:var(--violet)"><svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" stroke-width="1.6"/><path d="m10.6 10.6 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
          <span><b data-i="c2a">Detectors run</b><span data-i="c2b">six active</span></span>
          <span class="tick"><svg viewBox="0 0 12 12" fill="none"><path d="m3 6.2 2 2 4-4.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </div>

        <div class="nmain" data-d="2">
          <div class="h">
            <span class="ic"><svg viewBox="0 0 16 16" fill="none"><rect x="2.4" y="6.6" width="11.2" height="7.4" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M5.2 6.6V4.8a2.8 2.8 0 0 1 5.6 0v1.8" stroke="currentColor" stroke-width="1.6"/></svg></span>
            <span><b data-i="c3a">Enforcement</b><span class="sub" data-i="c3b">masking in place</span></span>
            <span class="lvb"><i></i><span data-i="c3live">LIVE</span></span>
          </div>
          <p class="ptxt keep">Score this CV. Candidate: <span class="tok raw" id="tk1">Aisha R.</span>, <span class="tok raw" id="tk2">a.rahman@…</span><span class="scan" id="scan"></span></p>
          <div class="acts">
            <span class="m"><i></i><b data-i="aMask">MASK</b></span>
            <span class="b"><i></i><b data-i="aBlock">BLOCK</b></span>
            <span class="o"><i></i><b data-i="aObs">OBSERVE</b></span>
          </div>
        </div>

        <div class="npop" data-d="3">
          <div class="ph"><b data-i="pHead">ENFORCEMENT ACTIONS</b></div>
          <div class="row m"><span class="gi"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.6"/><path d="m5.4 8.2 1.9 1.9 3.4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span data-i="pMask">Mask, reversible</span><span class="ct keep">1,204</span></div>
          <div class="row b"><span class="gi"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.6"/><path d="m4 12 8-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><span data-i="pBlock">Block, never sent</span><span class="ct keep">38</span></div>
          <div class="row o"><span class="gi"><svg viewBox="0 0 16 16" fill="none"><path d="M8 2 14.6 13.4H1.4L8 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 6.6v3M8 11.6v.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><span data-i="pObs">Observe, escalated</span><span class="ct keep">1</span></div>
        </div>

        <span class="chip" id="chip"></span>
        <span class="streak" id="streak"></span>

        <div class="nc n5" data-d="4">
          <span class="ic" style="background:var(--mint-t);color:var(--green)"><svg viewBox="0 0 16 16" fill="none"><path d="M8 1.8 13.4 4v4.2c0 3.4-2.3 5.9-5.4 7.2-3.1-1.3-5.4-3.8-5.4-7.2V4L8 1.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
          <span><b data-i="c5a">Reaches the model</b><span data-i="c5b">masked, or not at all</span></span>
        </div>
      </div>
    </section>

    <!-- ================= POSITION + FIGURES ================= -->
    <div class="sh">
      <h2 data-i="secPos">Where this sits</h2>
      <span class="ln"></span>
      <span class="meta" data-i="secPosM">STAGE 06 OF 07</span>
    </div>

    <section class="card" data-rv>
      <div class="stepper">
        <span class="sp done"><i>01</i><span data-i="st1">Ingest</span></span><span class="cn"></span>
        <span class="sp done"><i>02</i><span data-i="st2">Interview</span></span><span class="cn"></span>
        <span class="sp done"><i>03</i><span data-i="st3">Discover</span></span><span class="cn"></span>
        <span class="sp done"><i>04</i><span data-i="st4">Compare</span></span><span class="cn"></span>
        <span class="sp done"><i>05</i><span data-i="st5">Map to law</span></span><span class="cn"></span>
        <span class="sp on"><i>06</i><span data-i="st6">Guardrails</span></span><span class="cn"></span>
        <span class="sp"><i>07</i><span data-i="st7">Report</span></span>
      </div>
      <div class="figs">
        <div class="fg n"><b class="keep" data-count="12847">0</b><span class="tagl" data-i="s1">INSPECTED</span></div>
        <div class="fg g"><b class="keep" data-count="1204">0</b><span class="tagl" data-i="s2">MASKED</span></div>
        <div class="fg a"><b class="keep" data-count="38">0</b><span class="tagl" data-i="s3">BLOCKED</span></div>
        <div class="fg r"><b class="keep" data-count="1">0</b><span class="tagl" data-i="s4t">UNMASKED</span><em data-i="s4">Reached the model unmasked</em></div>
      </div>
    </section>

    <!-- ================= DETECTORS ================= -->
    <div class="sh">
      <h2 data-i="secDet">Detectors</h2>
      <span class="ln"></span>
      <span class="meta" data-i="secDetM">SIX ACTIVE</span>
    </div>

    <section class="card" data-rv id="anCard">
      <div class="an">
        <div class="an-l">
          <div class="an-h">
            <h3 data-i="anH">Detector hits</h3>
            <span class="sp2"></span>
            <span class="ctl" data-i="anCtl">LAST CYCLE</span>
          </div>
          <div class="plot" id="plot">
            <div class="grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            <div id="bands"></div>
            <div class="axis" id="axis"></div>
            <div class="tip" id="tip"></div>
          </div>
        </div>
        <div class="an-r">
          <p class="rk" data-i="anLangH">Coverage by language</p>
          <div id="langs"></div>
        </div>
      </div>
      <div class="legend" id="legend"></div>
    </section>

    <!-- ================= RULES ================= -->
    <div class="sh">
      <h2 data-i="secRules">Enforcement rules</h2>
      <span class="ln"></span>
      <span class="meta keep" id="ruleCount">7 RULES</span>
    </div>

    <section class="card" data-rv id="rules">
      <div class="tools">
        <label class="srch">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.7"/><path d="m13.6 13.6 3.4 3.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          <input type="search" id="ruleSearch" placeholder="Search rules and detectors" data-ph="phSearch" aria-label="Search rules">
        </label>
        <div class="fchips" id="fchips">
          <button class="fc on" data-f="all" data-i="fAll">ALL</button>
          <button class="fc" data-f="mask" data-i="fMask">MASK</button>
          <button class="fc" data-f="block" data-i="fBlock">BLOCK</button>
          <button class="fc" data-f="observe" data-i="fObs">OBSERVE</button>
        </div>
      </div>
      <div class="rh">
        <span data-i="thId">RULE</span>
        <span data-i="thWhat">WHAT IT CATCHES</span>
        <span class="hd" data-i="thDet">DETECTOR</span>
        <span data-i="thAct">ACTION</span>
        <span style="text-align:end" data-i="thHits">24H</span>
      </div>
      <div id="ruleRows"></div>
      <div class="nores" id="noRules" hidden data-i="noRules">No rule matches that search. Clear the search or the filter to see all seven.</div>
    </section>

    <!-- ================= PROMPTS ================= -->
    <div class="sh">
      <h2 data-i="secLog">Recent prompts</h2>
      <span class="ln"></span>
      <span class="meta" data-i="secLogM">MASKED VALUES ONLY</span>
    </div>

    <section class="logs" data-rv>
      <div class="lgc mj">
        <span class="ic observe"><svg viewBox="0 0 16 16" fill="none"><path d="M8 2 14.6 13.4H1.4L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.6v3M8 11.6v.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
        <div class="bd">
          <p class="tx keep">Summarise this candidate's background <mark class="bad">retrieved: CV_8841.pdf</mark></p>
          <p class="mt keep">04:12:07 · ESCALATED TO THE DPO</p>
        </div>
        <span class="st observe" data-i="vObs">OBSERVED</span>
      </div>
      <div class="lgc">
        <span class="ic block"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.5"/><path d="m4 12 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
        <div class="bd">
          <p class="tx keep">Check if <mark>[CARD]</mark> matches the account for <mark>[NAME]</mark></p>
          <p class="mt keep">03:58:41 · TOO SENSITIVE TO MASK</p>
        </div>
        <span class="st block" data-i="vBlk">BLOCKED</span>
      </div>
      <div class="lgc">
        <span class="ic mask"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.5"/><path d="m5.4 8.2 1.9 1.9 3.4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <div class="bd">
          <p class="tx keep">Score this CV. Candidate: <mark>[NAME_1]</mark>, <mark>[EMAIL_1]</mark></p>
          <p class="mt keep">03:44:19 · REVERSIBLE</p>
        </div>
        <span class="st mask" data-i="vMsk">MASKED</span>
      </div>
      <div class="lgc">
        <span class="ic mask"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.2" stroke="currentColor" stroke-width="1.5"/><path d="m5.4 8.2 1.9 1.9 3.4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <div class="bd">
          <p class="tx keep">Rank these 40 applicants: <mark>[NAME_1..40]</mark></p>
          <p class="mt keep">02:19:55 · 40 ENTITIES, SINGLE PASS</p>
        </div>
        <span class="st mask" data-i="vMsk2">MASKED</span>
      </div>
    </section>

    <!-- ================= OPEN FINDING ================= -->
    <div class="sh">
      <h2 data-i="secInc">Open finding</h2>
      <span class="ln"></span>
      <span class="meta keep">GR-07</span>
    </div>

    <section class="card inc" data-rv id="finding">
      <div class="top2">
        <span class="mk"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2.4 17.6 16H2.4L10 2.4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v3.4M10 13.6v.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <div>
          <h3 data-i="escH">The one that got through</h3>
          <p data-i="escP">A national identity number and a date of birth reached the model unmasked. Not through the typed prompt, which passed inspection cleanly, but through a document the retrieval layer attached afterwards. The filter recorded it as <code class="keep">OBSERVED</code> and escalated it. It cannot close it. Only a named reviewer can.</p>
        </div>
      </div>
      <div class="incr">
        <div><p class="k" data-i="er1">RULE</p><p class="val keep">GR-07</p></div>
        <div><p class="k" data-i="er2">PATH</p><p class="val keep">Retrieval, post inspection</p></div>
        <div><p class="k" data-i="er3">OPENED</p><p class="val keep">04:12:31</p></div>
        <div><p class="k" data-i="er4">STATUS</p><p class="val keep">Open with the DPO</p></div>
      </div>
    </section>

    <footer class="foot">
      <span data-i="ft1">TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
      <span data-i="ft2">SAFE · ETHICAL · TRANSPARENT</span>
    </footer>

  </div>
</div>
`;

export default function GuardrailsPage() {
  useEffect(() => {
    const dispose = run("guardrails");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
