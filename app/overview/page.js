"use client";

/* Overview - /overview */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-core";

const MARKUP = `
<div class="ovx">
      <div class="thr" id="thr" data-theme="light" dir="ltr">
      <div class="field"></div>
      <div class="page">
      
        <header class="top">
          <div class="wrap top-in">
            <a class="lock" href="#">
              <img class="brand-img" src="https://www.taharaai.com/logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
              <svg class="brand-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
            </a>
            <nav class="nav">
              <a href="/overview" class="on" data-i="n1">Overview</a>
              <a href="/governance" data-i="n2">Governance</a>
              <a href="/framework" data-i="n3">Frameworks</a>
              <a href="/discovery" data-i="n4">Discovery</a>
              <a href="#" data-i="n5">Adversarial</a>
              <a href="/guardrails" data-i="n6">Guardrails</a>
            </nav>
            <div class="top-r">
              <button class="icb" id="themeBtn" aria-label="Switch theme">
                <svg class="ic-moon" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><svg class="ic-sun" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </button>
              <div class="seg"><button class="on" id="enBtn">EN</button><button id="arBtn">عربي</button></div>
              <a class="cta-sm" href="/governance" data-i="cta">Start assessment</a>
              <a class="signout" href="/" data-i="so">Sign out</a>
            </div>
          </div>
        </header>
      
        
        <section class="hxr" id="hero">
          <div class="hx-wrap">
            <main class="hx-hero">
      <section class="hx-copy">
        <div class="hx-kicker hx-rev" style="--d:.02s" data-t="kicker">Continuous AI assurance</div>
        <h1 class="hx-rev" style="--d:.08s"><span class="hx-l1" data-t="h1a">Trust is not declared.</span><span class="hx-l2"><span data-t="h1b">It is </span><span class="hx-g" data-t="h1g">demonstrated.</span></span></h1>
        <p class="hx-lede hx-rev" style="--d:.16s" data-t="lede"><span class="hx-ll">We map your system against the frameworks that bind it, then <strong>keep watching</strong>. </span><span class="hx-ll">The day a control stops operating, you find out. Not the auditor.</span></p>
        <div class="hx-row hx-rev" style="--d:.24s">
          <a class="hx-primary" href="/governance" data-t="cta1">Start an assessment <span class="hx-a">&rarr;</span></a>
          <a class="hx-textlink" href="#" data-t="cta2">See how it works</a>
        </div>
      </section>

      <div class="hx-stage">
        <div class="hx-composite">
          <div class="hx-plate" aria-hidden="true"></div>

          <!-- main window -->
          <div class="hx-float hx-win" style="--d:.3s">
            <div class="hx-whead">
              <h2 data-t="wt">Assurance posture</h2>
              <button class="hx-wbtn" data-t="wb">Start assessment</button>
            </div>
            <div class="hx-wtabs"><span class="hx-on" data-t="tb1">Controls</span><span data-t="tb2">Findings</span><span data-t="tb3">Evidence</span></div>

            <div class="hx-wgrid">
              <div class="hx-mini">
                <div class="hx-mh"><b data-t="m1">Assessment progress</b><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                <div class="hx-gaugewrap">
                  <svg width="104" height="96" viewBox="0 0 104 96" aria-hidden="true">
                    <defs><linearGradient id="gg" x1="16" y1="78" x2="88" y2="78" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stop-color="var(--green-lit)"/><stop offset="1" stop-color="var(--green)"/>
                    </linearGradient></defs>
                    <path class="hx-garc" d="M16 78 A44 44 0 1 1 88 78"/>
                    <path class="hx-gfill" stroke="url(#gg)" pathLength="100" d="M16 78 A44 44 0 1 1 88 78"/>
                  </svg>
                  <div class="hx-glabel"><div class="hx-p"><span class="hx-count" data-count="61">0</span>%</div><div class="hx-l" data-t="gl">Scored</div></div>
                </div>
              </div>

              <div class="hx-mini">
                <div class="hx-mh"><b data-t="m2">Findings by severity</b><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5m0 3h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>
                <div class="hx-legend">
                  <span class="hx-leg"><i style="background:var(--green)"></i><span data-t="s1">Low</span></span>
                  <span class="hx-leg"><i style="background:var(--blue)"></i><span data-t="s2">Medium</span></span>
                  <span class="hx-leg"><i style="background:var(--amber)"></i><span data-t="s3">High</span></span>
                  <span class="hx-leg"><i style="background:var(--red)"></i><span data-t="s4">Critical</span></span>
                </div>
                <div class="hx-bar">
                  <span class="hx-seg" style="background:linear-gradient(180deg,var(--green-lit),var(--green));--sd:.65s" data-w="47%"></span>
                  <span class="hx-seg" style="background:var(--blue);--sd:.8s" data-w="28%"></span>
                  <span class="hx-seg" style="background:var(--amber);--sd:.95s" data-w="17%"></span>
                  <span class="hx-seg" style="background:var(--red);--sd:1.1s" data-w="8%"></span>
                </div>
                <div class="hx-counts"><span style="width:47%">9</span><span style="width:28%">5</span><span style="width:17%">3</span><span>1</span></div>
              </div>
            </div>

            <div class="hx-trows">
              <div class="hx-trow">
                <div><div class="hx-tn">Risk management system</div><div class="hx-tm">EU AI Act · AIA 9.2</div></div>
                <svg class="hx-ringy" viewBox="0 0 30 30"><circle class="hx-rb" cx="15" cy="15" r="12"/><circle class="hx-rf" cx="15" cy="15" r="12" stroke="var(--green)" style="--rd:.9s" data-off="13.6"/></svg>
                <span class="hx-schip hx-ok" data-t="c_ok">Operating</span>
              </div>
              <div class="hx-trow">
                <div><div class="hx-tn">Management system controls</div><div class="hx-tm">ISO/IEC 42001 · 8.1</div></div>
                <svg class="hx-ringy" viewBox="0 0 30 30"><circle class="hx-rb" cx="15" cy="15" r="12"/><circle class="hx-rf" cx="15" cy="15" r="12" stroke="var(--green)" style="--rd:1.05s" data-off="19.6"/></svg>
                <span class="hx-schip hx-ok" data-t="c_ok2">Operating</span>
              </div>
              <div class="hx-trow">
                <div><div class="hx-tn">AI risk treatment</div><div class="hx-tm">ISO/IEC 23894 · 6.4</div></div>
                <svg class="hx-ringy" viewBox="0 0 30 30"><circle class="hx-rb" cx="15" cy="15" r="12"/><circle class="hx-rf" cx="15" cy="15" r="12" stroke="var(--amber)" style="--rd:1.2s" data-off="31.7"/></svg>
                <span class="hx-schip hx-rev" data-t="c_rev">Needs review</span>
              </div>
            </div>
          </div>

          <!-- workflow overlay -->
          <div class="hx-float hx-flow hx-bob" style="--d:.55s">
            <div class="hx-fhead">
              <div class="hx-crumb" data-t="fc">WORKFLOWS /</div>
              <h3 data-t="ft">Re-verification for AI controls</h3>
              <div class="hx-fmeta">
                <span class="hx-hl" data-t="fm1">Active</span>
                <span data-t="fm2">Owner · Cyber team</span>
                <span data-t="fm3">Runs daily</span>
              </div>
            </div>
            <div class="hx-fbody">
              <svg class="hx-fsvg" aria-hidden="true">
                <path class="hx-fpath" style="--pd:1.15s" d="M 86 34 V 60"/>
                <path class="hx-fpath" style="--pd:1.35s" d="M 120 106 C 120 128 52 118 52 142"/>
                <path class="hx-fpath" style="--pd:1.45s" d="M 120 106 C 120 130 120 130 120 142"/>
                <path class="hx-fpath" style="--pd:1.55s" d="M 120 106 C 120 128 190 118 190 142"/>
                <circle class="hx-fdot" r="2.6" cx="86" cy="47"/>
              </svg>
              <div class="hx-fnode hx-a"><div class="hx-fl" data-t="fn1l">Start</div><div class="hx-fv">AIA 9.2</div></div>
              <div class="hx-fnode hx-b"><div class="hx-fl" data-t="fn2l">Trigger</div><div class="hx-fv" data-t="fn2v">Control readiness changed</div></div>
              <div class="hx-facts">
                <div class="hx-fnode"><div class="hx-fl" data-t="fa1l">Create task</div><div class="hx-fv" data-t="fa1v">Evidence linked</div></div>
                <div class="hx-fnode"><div class="hx-fl" data-t="fa2l">Notify</div><div class="hx-fv" data-t="fa2v">Control owners</div></div>
                <div class="hx-fnode"><div class="hx-fl" data-t="fa3l">Webhook</div><div class="hx-fv">platform/api</div></div>
              </div>
            </div>
          </div>

          <!-- toast -->
          <div class="hx-float hx-toast hx-bob2" style="--d:.75s">
            <span class="hx-ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <div><b data-t="tt">Evidence verified</b><small data-t="ts">AIA 9.2 · just now</small></div>
          </div>
        </div>
      </div>
    </main>
          </div>
        </section>
      
        
        <!-- ================= MOVEMENTS ================= -->
  <section style="padding-bottom:0">
    <div class="mvstage" id="mvstage">
      <div class="mvsticky">
        <div class="wrap">
          <div class="kick rv"><span data-i="kick1">HOW IT WORKS</span></div>
          <h2 class="rv d1" data-i="h21">Four movements. One continuous loop.</h2>

          <div class="looprail" dir="ltr" aria-hidden="true">
            <svg viewBox="0 0 1200 60">
              <path class="base" d="M145 30H1055"/>
              <path class="draw" id="loopdraw" d="M145 30H1055"/>
              <g id="loopnodes">
                <circle class="nd" cx="145" cy="30" r="13"/><text class="ndt" x="145" y="33.5" text-anchor="middle">01</text>
                <circle class="nd" cx="448" cy="30" r="13"/><text class="ndt" x="448" y="33.5" text-anchor="middle">02</text>
                <circle class="nd" cx="752" cy="30" r="13"/><text class="ndt" x="752" y="33.5" text-anchor="middle">03</text>
                <circle class="nd" cx="1055" cy="30" r="13"/><text class="ndt" x="1055" y="33.5" text-anchor="middle">04</text>
              </g>
            </svg>
          </div>

          <div class="mvgrid" id="mvgrid">
            <div class="mv" data-n="0">
              <div class="mvtop">
                <span class="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.1v6.1M5.7 5.9 8 8.2l2.3-2.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.7 9.5v2.4c0 1.05.85 1.9 1.9 1.9h6.8a1.9 1.9 0 0 0 1.9-1.9V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2.7 9.9h2.9l.9 1.4h3l.9-1.4h2.9" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg></span>
              </div>
              <b data-i="m1t">Ingest</b>
              <p data-i="m1p">Upload what you have. The engine extracts only the facts a framework needs, and cites the page.</p>
            </div>
            <div class="mv" data-n="1">
              <div class="mvtop">
                <span class="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.4 8.5a2 2 0 0 1-2 2H7.4l-3 2.7v-2.7h-.8a2 2 0 0 1-2-2V4.6a2 2 0 0 1 2-2h7.8a2 2 0 0 1 2 2v3.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="5.3" cy="6.6" r=".95" fill="currentColor"/><circle cx="8" cy="6.6" r=".95" fill="currentColor"/><circle cx="10.7" cy="6.6" r=".95" fill="currentColor"/></svg></span>
              </div>
              <b data-i="m2t">Interview</b>
              <p data-i="m2p">An auditor-grade chatbot asks what the documents didn't say. It follows up.</p>
            </div>
            <div class="mv" data-n="2">
              <div class="mvtop">
                <span class="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.6" stroke="currentColor" stroke-width="1.5"/><path d="M8 8l3.7-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="1.05" fill="currentColor"/><circle cx="10.5" cy="10.1" r=".95" fill="currentColor"/></svg></span>
              </div>
              <b data-i="m3t">Discover</b>
              <p data-i="m3p">A read-only collector inside your boundary observes what your system actually does.</p>
            </div>
            <div class="mv" data-n="3">
              <div class="mvtop">
                <span class="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.9 13 4.2v3.3c0 3.4-2.15 5.6-5 6.6-2.85-1-5-3.2-5-6.6V4.2L8 1.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.6 7.9 7.3 9.6l3.1-3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </div>
              <b data-i="m4t">Assure</b>
              <p data-i="m4p">Gap assessment, SoA, risk matrix. Then the loop stays open, and drift raises an alarm.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>











  <!-- ================= POSTURE, THE NUMBERS ================= -->
  <section class="posture" id="posture">
    <div class="wrap">
      <div class="kick rv"><span data-i="kick2">THE POSTURE</span></div>
      <h2 class="rv d1" data-i="h22">One posture. Measured continuously.</h2>
      <p class="sub rv d2" data-i="sub2">Live figures from all four surfaces.</p>

      <div class="pwrap" dir="ltr">
        <div class="prow4">
          <div class="pc kpit">
            <span class="kic g"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.6" cy="7.6" r="5" stroke="currentColor" stroke-width="1.6"/><path d="M11.4 11.4 15 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
            <div class="kbody">
              <span class="kv g"><span class="num" data-to="17.1" data-dec="1">0</span><small>K</small></span>
              <span class="kl">Assets Discovered</span>
              <span class="ks up">&#8593; 12% THIS WEEK</span>
            </div>
          </div>
          <div class="pc kpit">
            <span class="kic n"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.9 15 4.6v3.8c0 3.9-2.6 6.5-6 7.7-3.4-1.2-6-3.8-6-7.7V4.6L9 1.9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
            <div class="kbody">
              <span class="kv n"><span class="num" data-to="12847">0</span></span>
              <span class="kl">Prompts Inspected</span>
              <span class="ks">LAST 24 HOURS</span>
            </div>
          </div>
          <div class="pc kpit">
            <span class="kic v"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.2 9S4.7 4.4 9 4.4 15.8 9 15.8 9 13.3 13.6 9 13.6 2.2 9 2.2 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.4 3.4l11.2 11.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
            <div class="kbody">
              <span class="kv n"><span class="num" data-to="1204">0</span></span>
              <span class="kl">Prompts Masked</span>
              <span class="ks">BEFORE THE MODEL</span>
            </div>
          </div>
          <div class="pc kpit">
            <span class="kic r"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.8" stroke="currentColor" stroke-width="1.5"/><path d="M9 5.6v4.2M9 12.4v.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
            <div class="kbody">
              <span class="kv r"><span class="num" data-to="1">0</span></span>
              <span class="kl">Data Leaked</span>
              <span class="ks">VIA RETRIEVAL PATH</span>
            </div>
          </div>
        </div>

        <div class="prow2a">
          <div class="pc pchart">
            <div class="chd">
              <div class="cht"><b>Adversarial probes <svg class="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" stroke-width="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></b></div>
              <div class="seg7"><i class="on">7D</i><i>30D</i><i>90D</i><i>ALL</i></div>
            </div>
            <div class="pvrow">
              <span class="pv"><span class="num" data-to="8412">0</span></span>
              <span class="pvu">per cycle</span>
              <span class="pill-on">ON SCHEDULE</span>
            </div>
            <svg class="csvg" viewBox="0 0 560 190" aria-hidden="true">
              <defs>
                <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="var(--pos)" stop-opacity=".3"/>
                  <stop offset=".55" stop-color="var(--pos)" stop-opacity=".1"/>
                  <stop offset="1" stop-color="var(--pos)" stop-opacity="0"/>
                </linearGradient>
                <filter id="lglow" x="-20%" y="-40%" width="140%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="var(--pos)" flood-opacity=".3"/>
                </filter>
              </defs>
              <g class="grid"><path d="M44 46.4H548M44 76.8H548M44 107.2H548M44 137.6H548"/></g>
              <path class="base" d="M44 168H548"/>
              <path class="vg" d="M548 44V168"/>
              <g class="axl">
                <text x="36" y="49" text-anchor="end">8K</text>
                <text x="36" y="80" text-anchor="end">7K</text>
                <text x="36" y="110" text-anchor="end">6K</text>
                <text x="36" y="141" text-anchor="end">5K</text>
                <text x="44" y="183">Aug 12</text>
                <text x="237" y="183" text-anchor="middle">Aug 14</text>
                <text x="431" y="183" text-anchor="middle">Aug 16</text>
                <text x="548" y="183" text-anchor="end">Now</text>
              </g>
              <path class="parea" fill="url(#pgrad)" d="M44.0 131.5C50.5 129.5 69.9 120.4 82.8 119.4C95.7 118.4 108.6 127.9 121.5 125.4C134.4 122.9 147.4 107.2 160.3 104.2C173.2 101.2 186.2 109.7 199.1 107.2C212.0 104.7 224.9 94.1 237.8 89.0C250.7 83.9 263.7 77.8 276.6 76.8C289.5 75.8 302.5 84.9 315.4 82.9C328.3 80.9 341.3 69.7 354.2 64.6C367.1 59.5 380.0 53.5 392.9 52.5C405.8 51.5 418.8 59.6 431.7 58.6C444.6 57.6 457.6 49.5 470.5 46.4C483.4 43.3 496.3 42.4 509.2 40.3C522.1 38.2 541.5 35.0 548.0 33.9L548 168L44 168Z"/>
              <path class="pline" id="pline" filter="url(#lglow)" d="M44.0 131.5C50.5 129.5 69.9 120.4 82.8 119.4C95.7 118.4 108.6 127.9 121.5 125.4C134.4 122.9 147.4 107.2 160.3 104.2C173.2 101.2 186.2 109.7 199.1 107.2C212.0 104.7 224.9 94.1 237.8 89.0C250.7 83.9 263.7 77.8 276.6 76.8C289.5 75.8 302.5 84.9 315.4 82.9C328.3 80.9 341.3 69.7 354.2 64.6C367.1 59.5 380.0 53.5 392.9 52.5C405.8 51.5 418.8 59.6 431.7 58.6C444.6 57.6 457.6 49.5 470.5 46.4C483.4 43.3 496.3 42.4 509.2 40.3C522.1 38.2 541.5 35.0 548.0 33.9"/>
              <g class="ptag">
                <rect x="492" y="8" rx="9" width="58" height="18"/>
                <text x="521" y="20" text-anchor="middle">8,412</text>
                <path d="M543 26 547.5 31" stroke="var(--pos)" stroke-width="1.5" stroke-linecap="round"/>
              </g>
              <g class="pdot"><circle cx="548" cy="33.9" r="7" fill="var(--pos)" opacity=".18"/><circle cx="548" cy="33.9" r="3.4" fill="var(--pos)"/></g>
            </svg>
          </div>

          <div class="pc pdonut">
            <div class="chd">
              <div class="cht"><b>Security posture <svg class="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" stroke-width="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></b></div>
              <button class="lnk" data-modal="controls">View all controls</button>
            </div>
            <div class="pbody">
              <div class="dwrap">
              <svg class="don" viewBox="0 0 150 150" aria-hidden="true">
                <circle class="dtrack" cx="75" cy="75" r="57"/>
                <circle class="darc" id="darc" cx="75" cy="75" r="57" pathLength="100" transform="rotate(-90 75 75)"/>
                <text class="pd-num" x="75" y="70" text-anchor="middle">61</text>
                <text class="pd-sub" x="75" y="84" text-anchor="middle">/ 187</text>
                <text class="pd-sub" x="75" y="96" text-anchor="middle">CONTROLS PASSING</text>
              </svg>
              <div class="plgs">
                <div class="plg"><span class="dot g"></span><span>PASSING</span><b>61</b></div>
                <div class="plg"><span class="dot a"></span><span>MINOR</span><b>7</b></div>
                <div class="plg"><span class="dot r"></span><span>MAJOR</span><b>3</b></div>
              </div>
            </div>
            <div class="cdbar"><i class="cp" data-w="32.6"></i><i class="cm" data-w="3.7"></i><i class="cj" data-w="1.6"></i></div>
              <div class="cdcap">61 PASSING &middot; 7 MINOR &middot; 3 MAJOR &middot; OF 187 TRACKED</div>
              <div class="astrip a" data-modal="controls">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.7 13.4 4.1v3.4c0 3.4-2.3 5.7-5.4 6.8-3.1-1.1-5.4-3.4-5.4-6.8V4.1L8 1.7Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 5.4v2.8M8 10.5v.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <div><span class="ast">OVERALL POSTURE</span><b class="asb">Needs attention</b></div>
              <span class="chev">&#8250;</span>
            </div>
              </div>
          </div>
        </div>

        <div class="prow2b">
          <div class="pc pcov">
            <div class="chd">
              <div class="cht"><b>Adversarial coverage <svg class="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" stroke-width="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></b><span class="chs">10 attack categories monitored</span></div>
              <button class="lnk" data-modal="cats">View all categories</button>
            </div>
            <div class="htrack">
              <i class="hg" data-w="49"></i><i class="ha" data-w="29"></i><i class="hr" data-w="19"></i>
            </div>
            <div class="cmini">
              <div class="cm"><span class="cmk g">PASSING</span><b>5</b><span class="cms">CATEGORIES</span></div>
              <div class="cm"><span class="cmk a">DEGRADED</span><b>3</b><span class="cms">CATEGORIES</span></div>
              <div class="cm"><span class="cmk r">FAILING</span><b>2</b><span class="cms">CATEGORIES</span></div>
            </div>
            <div class="cchips">
              <i>PROMPT INJECTION</i><i>JAILBREAK</i><i>DATA EXFILTRATION</i><i>PII LEAKAGE</i><i>MODEL ABUSE</i><i class="more">+5</i>
            </div>
          </div>

          <div class="pc pguard">
            <div class="chd">
              <div class="cht"><b>Guardrail activity <svg class="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" stroke-width="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></b><span class="chs">12,847 inspected</span></div>
              <span class="chip-btn">Last 24 hours</span>
            </div>
            <div class="grow2">
              <span class="gic v"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.6 6.5S3.4 3.2 6.5 3.2 11.4 6.5 11.4 6.5 9.6 9.8 6.5 9.8 1.6 6.5 1.6 6.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M2.4 2.4l8.2 8.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></span>
              <span class="gl2">MASKED</span>
              <span class="gtrack"><i class="v" data-w="76"></i></span>
              <b class="gv2">1,204</b>
            </div>
            <div class="grow2">
              <span class="gic a"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="4.9" stroke="currentColor" stroke-width="1.2"/><path d="M3 3l7 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></span>
              <span class="gl2">BLOCKED</span>
              <span class="gtrack"><i class="a" data-w="22"></i></span>
              <b class="gv2">38</b>
            </div>
            <div class="grow2">
              <span class="gic r"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.8 12 11.2H1L6.5 1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M6.5 5.4v2.4M6.5 9.4v.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></span>
              <span class="gl2">LEAKED</span>
              <span class="gtrack"><i class="r" data-w="5"></i></span>
              <b class="gv2">1</b>
            </div>
            <div class="astrip r2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.8" stroke="currentColor" stroke-width="1.3"/><path d="M7.5 4.6v3.4M7.5 10.4v.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <span class="asl">1 data leak detected via retrieval path</span>
              <button class="avd" data-modal="leak">VIEW DETAILS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 01 DISCOVER ================= -->
  <section class="feat" id="f-discover">
    <div class="wrap feat-in">
      <div class="cpy">
        <div class="prob fx" data-i="pb1">PROBLEM: YOU CAN'T GOVERN WHAT YOU CAN'T SEE</div>
        <h3 class="fx" data-i="h31">Find every AI system, approved or not</h3>
        <p class="fx" data-i="p1">A read-only collector runs inside your boundary, under your credentials, and surfaces every AI system in use within a day. Including the ones nobody signed off.</p>
      </div>
      <div class="winbox">
        <div class="win" dir="ltr">
          <div class="pillnav"><span class="on">Discover</span><span>Adversarial</span><span>Govern</span><span>Guardrails</span></div>
          <div class="win-in">
            <aside class="side">
              <div class="shh"><span class="bk">&#8249;</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" stroke-width="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                Discover</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.2"/><circle cx="6" cy="6" r="1.4" fill="currentColor"/></svg>Connect</div>
              <div class="si on"><svg viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>Dashboard</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M1.8 10.4c.6-2 2.2-3 4.2-3s3.6 1 4.2 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Agents</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Inventory</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Activity Feed</div>
            </aside>
            <div class="main">
              <div class="mh"><b>Discovery</b><span>The biggest AI risks we've discovered: who's exposed and what to do about it.</span></div>
              <div class="krow k3">
                <div class="kc"><div class="kl">ASSETS DISCOVERED</div>
                  <div class="kv"><span class="num" data-to="17.1" data-dec="1"></span><small>K</small></div>
                  <div class="kd"><u>&#8593; 2</u> this week</div>
                  <svg class="spk" viewBox="0 0 56 22"><path stroke="var(--blue)" d="M2 18 10 16 18 17 26 13 34 12 42 8 50 6 54 4"/></svg></div>
                <div class="kc"><div class="kl">DISCOVERED APPS</div>
                  <div class="kv"><span class="num" data-to="2"></span></div>
                  <div class="kd"><u>&#8593; 2</u> this week</div></div>
                <div class="kc"><div class="kl">PEOPLE EXPOSED</div>
                  <div class="kv"><span class="num" data-to="2"></span></div>
                  <div class="kd"><u>&#8593; 2</u> this week</div></div>
              </div>
              <div class="krow k3" style="grid-template-columns:1.2fr 1fr">
                <div class="kc r"><div class="kl">CRITICAL EXPOSURES</div>
                  <div class="kv"><span class="num" data-to="3"></span></div>
                  <div class="kd">&#8593; 4 new this week</div>
                  <svg class="spk" viewBox="0 0 56 22"><path stroke="var(--red)" d="M2 18 12 17 22 17 30 15 38 14 46 8 54 4"/></svg></div>
                <div class="kc v"><div class="kl">AI CALLS . 24H</div>
                  <div class="kv"><span class="num" data-to="9"></span></div>
                  <div class="kd">&#8593; 350% vs yesterday</div>
                  <svg class="spk" viewBox="0 0 56 22"><path stroke="var(--violet)" d="M2 14 8 10 14 15 20 8 26 13 32 6 38 12 44 7 50 11 54 6"/></svg></div>
              </div>
              <div class="krow" style="grid-template-columns:1.2fr 1fr">
                <div class="crit">
                  <div class="ck">&#9650; CRITICAL FINDING</div>
                  <b>2 people are using 2 AI apps you haven't approved.</b>
                  <p>Both read mail and files, and neither is in the register. One forwards attachments to a model hosted outside your tenancy, so the data leaves before any policy can see it.</p>
                  <span class="cl">Open the register &#8594;</span>
                </div>
                <div class="pcard">
                  <div class="ph"><h4>Top apps by people reached</h4></div>
                  <div class="lnr"><span class="nm">GPT for Excel W..</span><span class="chip r">reads mail / files</span><span class="mnn">1 user</span></div>
                  <div class="lnr"><span class="nm">Claude for Sheets</span><span class="chip r">reads mail / files</span><span class="mnn">1 user</span></div>
                  <div class="lnr"><span class="nm">Notion AI</span><span class="chip n">reads docs</span><span class="mnn">1 user</span></div>
                  <div class="lnr"><span class="nm">Otter.ai</span><span class="chip n">reads calendar</span><span class="mnn">1 user</span></div>
                  <div class="lnr"><span class="nm">Grammarly</span><span class="chip n">reads drafts</span><span class="mnn">1 user</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 02 ADVERSARIAL ================= -->
  <section class="feat flip" id="f-adv">
    <div class="wrap feat-in">
      <div class="cpy">
        <div class="prob fx" data-i="pb2">PROBLEM: A YEARLY PEN TEST IS ALREADY OUT OF DATE</div>
        <h3 class="fx" data-i="h32">Attack your own system before someone else does</h3>
        <p class="fx" data-i="p2">The OWASP LLM Top 10 runs against staging on a recurring schedule. A regression shows up the next cycle, not next year.</p>
      </div>
      <div class="winbox">
        <div class="win" dir="ltr">
          <div class="pillnav"><span>Discover</span><span class="on">Adversarial</span><span>Govern</span><span>Guardrails</span></div>
          <div class="win-in">
            <aside class="side">
              <div class="shh"><span class="bk">&#8249;</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6.6 1.4 3 7h2.4L5 10.6 9 5H6.6l.6-3.6Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>
                Adversarial</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 2.4h8v3.2H2zM2 8h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Campaigns</div>
              <div class="si on"><svg viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="6.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>Categories</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" stroke-width="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>Probe library</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 2v5M6 9.4v.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Findings</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.2"/><path d="M6 3.6V6l1.8 1.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Schedule</div>
              <div class="si dim"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Runbooks</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Continuous Dashboard</div>
            </aside>
            <div class="main">
              <div class="mh"><b>Adversarial testing</b></div>
              <div class="krow k4">
                <div class="kc r"><div class="kl">FAILING</div><div class="kv"><span class="num" data-to="2"></span></div></div>
                <div class="kc a"><div class="kl">DEGRADED</div><div class="kv"><span class="num" data-to="3"></span></div></div>
                <div class="kc g"><div class="kl">PASSING</div><div class="kv"><span class="num" data-to="5"></span></div></div>
                <div class="kc b"><div class="kl">PROBES . 24H</div><div class="kv"><span class="num" data-to="8412"></span></div></div>
              </div>
              <div class="pcard">
                <div class="cat"><span class="cid">LLM01</span>
                  <span class="cbody"><b>Prompt Injection</b><span>Untrusted input steering the model away from its instructions, directly or through content it retrieves</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>61%</u></span><span class="track"><i class="r" data-w="61"></i></span></span>
                  <span class="chip r">FAILING</span><span class="pn">1,204 probes</span></div>
                <div class="cat"><span class="cid">LLM02</span>
                  <span class="cbody"><b>Sensitive Information Disclosure</b><span>Model reveals PII, credentials, or proprietary data in its output</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>74%</u></span><span class="track"><i class="r" data-w="74"></i></span></span>
                  <span class="chip r">FAILING</span><span class="pn">980 probes</span></div>
                <div class="cat"><span class="cid">LLM03</span>
                  <span class="cbody"><b>Supply Chain</b><span>Compromised base models, datasets, adapters, or plugins</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>88%</u></span><span class="track"><i class="a" data-w="88"></i></span></span>
                  <span class="chip a">DEGRADED</span><span class="pn">142 probes</span></div>
                <div class="cat"><span class="cid">LLM04</span>
                  <span class="cbody"><b>Data &amp; Model Poisoning</b><span>Manipulated training or fine-tuning data introducing backdoors or bias</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>91%</u></span><span class="track"><i class="a" data-w="91"></i></span></span>
                  <span class="chip a">DEGRADED</span><span class="pn">320 probes</span></div>
                <div class="cat"><span class="cid">LLM05</span>
                  <span class="cbody"><b>Improper Output Handling</b><span>Downstream systems trusting model output without validation</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>97%</u></span><span class="track"><i class="g" data-w="97"></i></span></span>
                  <span class="chip g">PASSING</span><span class="pn">610 probes</span></div>
                <div class="cat"><span class="cid">LLM06</span>
                  <span class="cbody"><b>Excessive Agency</b><span>The model granted more permission, autonomy, or functionality than the task needs</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>83%</u></span><span class="track"><i class="a" data-w="83"></i></span></span>
                  <span class="chip a">DEGRADED</span><span class="pn">88 probes</span></div>
                <div class="cat"><span class="cid">LLM07</span>
                  <span class="cbody"><b>System Prompt Leakage</b><span>Instructions, guardrails, or secrets in the system prompt disclosed to a user</span></span>
                  <span class="rate"><span class="rl"><span>PASS RATE</span><u>100%</u></span><span class="track"><i class="g" data-w="100"></i></span></span>
                  <span class="chip g">PASSING</span><span class="pn">440 probes</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 03 GOVERN ================= -->
  <section class="feat" id="f-govern">
    <div class="wrap feat-in">
      <div class="cpy">
        <div class="prob fx" data-i="pb3">PROBLEM: A DOCUMENT IS NOT PROOF</div>
        <h3 class="fx" data-i="h33">Map every system to the law that applies</h3>
        <p class="fx" data-i="p3">Every requirement is checked against your live system, and marked conforming only when a named person confirms it on the record.</p>
      </div>
      <div class="winbox">
        <div class="win" dir="ltr">
          <div class="pillnav"><span>Discover</span><span>Adversarial</span><span class="on">Govern</span><span>Guardrails</span></div>
          <div class="win-in">
            <aside class="side">
              <div class="shh"><span class="bk">&#8249;</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.4 10.4 3.6v3C10.4 8.9 8.6 10.4 6 11 3.4 10.4 1.6 8.9 1.6 6.6v-3L6 1.4Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                Govern</div>
              <div class="si on"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 6.4 5 9l4.6-5.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Conformance</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Frameworks</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 2v5M6 9.4v.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Findings</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" stroke-width="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>Evidence</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2.2 6.4 4.6 8.8 9.8 3.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Sign-off queue</div>
              <div class="si dim"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.2"/><path d="M6 3.6V6l1.8 1.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Audit trail</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" stroke-width="1.2"/><path d="M4 4.4h4M4 6.6h2.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>Statement of Applicability</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>AI Inventory</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 1.6v8.8M1.6 6h8.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Risk Classification</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M1.8 10.4c.6-2 2.2-3 4.2-3s3.6 1 4.2 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Agent Constraints</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 9.6V6.4M6 9.6V2.8M9.6 9.6V5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Compliance Reporting</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Continuous Dashboard</div>
            </aside>
            <div class="main">
              <div class="mh"><b>Governance</b></div>
              <div class="krow k4">
                <div class="kc"><div class="kl">REQUIREMENTS ASSESSED</div>
                  <div class="kv"><span class="num" data-to="61"></span><small>/187</small></div></div>
                <div class="kc r"><div class="kl">MAJOR NONCONFORMITIES</div>
                  <div class="kv"><span class="num" data-to="3"></span></div></div>
                <div class="kc a"><div class="kl">MINOR NONCONFORMITIES</div>
                  <div class="kv"><span class="num" data-to="7"></span></div></div>
                <div class="kc g"><div class="kl">CONFORMING</div>
                  <div class="kv"><span class="num" data-to="34"></span><small>%</small></div></div>
              </div>
              <div class="krow" style="grid-template-columns:1fr 1fr">
                <div class="pcard">
                  <div class="ph"><h4>Conformance by framework</h4><em>OF ASSESSED</em></div>
                  <div class="cbar"><span class="fn">EU AI Act</span><span class="stack"><i class="sg" data-w="34"></i><i class="sa" data-w="12"></i><i class="sr" data-w="8"></i></span><span class="cv">18 / 33 assessed</span></div>
                  <div class="cbar"><span class="fn">ISO/IEC 42001</span><span class="stack"><i class="sg" data-w="20"></i><i class="sa" data-w="8"></i><i class="sr" data-w="4"></i></span><span class="cv">24 / 76 assessed</span></div>
                  <div class="cbar"><span class="fn">ISO/IEC 23894</span><span class="stack"><i class="sg" data-w="16"></i><i class="sa" data-w="7"></i><i class="sr" data-w="4"></i></span><span class="cv">11 / 41 assessed</span></div>
                  <div class="cbar"><span class="fn">NIST AI RMF</span><span class="stack"><i class="sg" data-w="12"></i><i class="sa" data-w="6"></i><i class="sr" data-w="4"></i></span><span class="cv">8 / 37 assessed</span></div>
                  <div class="legend"><span class="lg">Conforming</span><span class="la">Partial</span><span class="lr">Nonconforming</span><span>Not assessed</span></div>
                </div>
                <div class="pcard matrix">
                  <div class="ph"><h4>Risk matrix</h4><em>OVERLAPPING FINDINGS COMPOUND</em></div>
                  <span class="rescan">&#10227; RESCAN</span>
                  <svg viewBox="0 0 300 168" aria-hidden="true">
                    <defs>
                      <radialGradient id="hotr" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stop-color="var(--red)" stop-opacity=".5"/>
                        <stop offset="100%" stop-color="var(--red)" stop-opacity="0"/>
                      </radialGradient>
                      <radialGradient id="hotb" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stop-color="var(--blue)" stop-opacity=".42"/>
                        <stop offset="100%" stop-color="var(--blue)" stop-opacity="0"/>
                      </radialGradient>
                    </defs>
                    <g stroke="var(--rule-soft)" stroke-width="1">
                      <path d="M44 8H292M44 38H292M44 68H292M44 98H292M44 128H292"/>
                      <path d="M44 8V128M93.6 8V128M143.2 8V128M192.8 8V128M242.4 8V128M292 8V128"/>
                    </g>
                    <ellipse class="blob" cx="228" cy="42" rx="86" ry="52" fill="url(#hotr)"/>
                    <ellipse class="blob" cx="150" cy="88" rx="98" ry="52" fill="url(#hotb)"/>
                    <g font-family="JetBrains Mono,monospace" font-size="6.5" fill="var(--ink-3)" letter-spacing=".08em">
                      <text x="38" y="25" text-anchor="end">CATASTROPHIC</text>
                      <text x="38" y="55" text-anchor="end">MAJOR</text>
                      <text x="38" y="85" text-anchor="end">MODERATE</text>
                      <text x="38" y="115" text-anchor="end">MINOR</text>
                      <text x="68" y="140" text-anchor="middle">RARE</text>
                      <text x="118" y="140" text-anchor="middle">UNLIKELY</text>
                      <text x="168" y="140" text-anchor="middle">POSSIBLE</text>
                      <text x="217" y="140" text-anchor="middle">LIKELY</text>
                      <text x="267" y="140" text-anchor="middle">ALMOST CERTAIN</text>
                    </g>
                    <g class="pt">
                      <rect x="50" y="13" rx="7" width="80" height="14" fill="var(--amber-w)" stroke="var(--amber)" stroke-width=".8"/>
                      <text x="90" y="23" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.3" fill="var(--amber)" letter-spacing=".08em">RISK APPETITE</text>
                      <path d="M132 24 176 60" stroke="var(--red)" stroke-width="1" opacity=".55"/>
                      <path d="M236 30 210 52M256 40 226 78" stroke="var(--red)" stroke-width="1" opacity=".6"/>
                      <circle cx="236" cy="30" r="4" fill="var(--surface)" stroke="var(--red)" stroke-width="1.4"/>
                      <circle cx="256" cy="40" r="4" fill="var(--surface)" stroke="var(--red)" stroke-width="1.4"/>
                      <circle cx="210" cy="52" r="4" fill="var(--surface)" stroke="var(--amber)" stroke-width="1.4"/>
                      <circle cx="168" cy="76" r="4" fill="var(--surface)" stroke="var(--ink-3)" stroke-width="1.4"/>
                      <circle cx="150" cy="92" r="4" fill="var(--surface)" stroke="var(--ink-3)" stroke-width="1.4"/>
                      <circle cx="128" cy="84" r="4" fill="var(--surface)" stroke="var(--ink-3)" stroke-width="1.4"/>
                      <circle cx="186" cy="92" r="4" fill="var(--surface)" stroke="var(--ink-3)" stroke-width="1.4"/>
                      <circle cx="226" cy="78" r="4" fill="var(--surface)" stroke="var(--amber)" stroke-width="1.4"/>
                      <circle cx="204" cy="112" r="4" fill="var(--surface)" stroke="var(--violet)" stroke-width="1.4"/>
                    </g>
                  </svg>
                  <div class="mx-cap">The darkest patch is <b>Moderate &#215; Possible</b>, three findings deep. No single one of them would draw the eye alone.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 04 GUARDRAILS ================= -->
  <section class="feat flip" id="f-guardrails">
    <div class="wrap feat-in">
      <div class="cpy">
        <div class="prob fx" data-i="pb4">PROBLEM: THE LEAK HAPPENS BEFORE THE REVIEW</div>
        <h3 class="fx" data-i="h34">Catch the leak before it reaches the model</h3>
        <p class="fx" data-i="p4">Every prompt is inspected before it reaches the model. Masked or blocked, in English and Roman Urdu, and the rare one that gets through is logged.</p>
      </div>
      <div class="winbox">
        <div class="win warn" dir="ltr">
          <div class="pillnav"><span>Discover</span><span>Adversarial</span><span>Govern</span><span class="on">Guardrails</span></div>
          <div class="win-in">
            <aside class="side">
              <div class="shh"><span class="bk">&#8249;</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.4 10.4 3.6v3C10.4 8.9 8.6 10.4 6 11 3.4 10.4 1.6 8.9 1.6 6.6v-3L6 1.4Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                Guardrails</div>
              <div class="si on"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Activity monitor</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" stroke-width="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Detectors</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Event stream</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" stroke-width="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>Policies</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.2"/><circle cx="6" cy="6" r="1.4" fill="currentColor"/></svg>Retrieval inspection</div>
              <div class="si dim"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 9.6V6.4M6 9.6V2.8M9.6 9.6V5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Policy simulation</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" stroke-width="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Prompt Inspection</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><rect x="1.8" y="3" width="8.4" height="6" rx="1.2" stroke="currentColor" stroke-width="1.2"/><path d="M3.6 6h4.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Masking &amp; Redaction</div>
              <div class="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.2"/><path d="M1.8 6h8.4M6 1.8c1.6 1.4 1.6 7 0 8.4M6 1.8c-1.6 1.4-1.6 7 0 8.4" stroke="currentColor" stroke-width="1"/></svg>Bilingual Detection</div>
            </aside>
            <div class="main">
              <div class="mh"><b>Guardrails</b></div>
              <div class="crit">
                <div class="ck">&#9650; 1 LEAK IN THE LAST 24 HOURS</div>
                <b>Personal data reached the model unmasked.</b>
                <p>A candidate's national ID and date of birth passed through in a retrieved document, not the user's prompt, so the input filter never saw it. The retrieval path is not inspected. That is the gap.</p>
                <span class="cl">View event &#8594;</span>
              </div>
              <div class="krow k4">
                <div class="kc"><div class="kl">PROMPTS INSPECTED</div><div class="kv"><span class="num" data-to="12847"></span></div></div>
                <div class="kc g"><div class="kl">MASKED</div><div class="kv"><span class="num" data-to="1204"></span></div></div>
                <div class="kc a"><div class="kl">BLOCKED</div><div class="kv"><span class="num" data-to="38"></span></div></div>
                <div class="kc r"><div class="kl">LEAKED</div><div class="kv"><span class="num" data-to="1"></span></div></div>
              </div>
              <div class="filts"><i class="on">ALL 1,243</i><i>LEAKED 1</i><i>BLOCKED 38</i><i>MASKED 1,204</i></div>
              <div class="pcard">
                <div class="lg"><span class="ts">04:12:07</span>
                  <span class="tx">Summarise this candidate's background for the hiring panel:</span>
                  <span class="tk rr">&#8230;retrieved: CV_8841.pdf</span>
                  <span class="tk rr">NATIONAL_ID</span><span class="tk rr">DOB</span><span class="tk">NAME</span><span class="chip r">LEAKED</span></div>
                <div class="lg"><span class="ts">03:58:41</span>
                  <span class="tx">Check if [PAYMENT_CARD] matches the account on file for [NAME]</span>
                  <span class="tk">PAYMENT_CARD</span><span class="tk">NAME</span><span class="chip a">BLOCKED</span></div>
                <div class="lg"><span class="ts">03:44:19</span>
                  <span class="tx">Score this CV against the role. Candidate: [NAME], [EMAIL], [PHONE]</span>
                  <span class="tk">NAME</span><span class="tk">EMAIL</span><span class="tk">PHONE</span><span class="chip g">MASKED</span></div>
                <div class="lg"><span class="ts">03:31:02</span>
                  <span class="tx">Candidate mentioned [HEALTH_CONDITION] in their cover letter. Should this affect scoring?</span>
                  <span class="tk">HEALTH</span><span class="tk">SPECIAL_CAT</span><span class="chip g">MASKED</span></div>
                <div class="lg"><span class="ts">02:19:55</span>
                  <span class="tx">Rank these 40 applicants. [NAME_1..40], [EMAIL_1..40]</span>
                  <span class="tk">NAME &#215;40</span><span class="tk">EMAIL &#215;40</span><span class="chip g">MASKED</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FOOT ================= -->
  <footer class="pfoot">
    <div class="wrap pfoot-in">
      <span>TAHARA AI &#183; CONTINUOUS ASSURANCE PLATFORM</span>
      <span class="sp">SAFE &#183; ETHICAL &#183; TRANSPARENT</span>
    </div>
  </footer>

  <div class="modal" id="modal" hidden>
    <div class="modal-bg" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <div class="modal-head"><h4 id="mTitle"></h4><button class="mx" data-close aria-label="Close">&#10005;</button></div>
      <div class="modal-body" id="mBody"></div>
    </div>
  </div>

</div>
</div>
      </div>
`;

export default function OverviewPage() {
  useEffect(() => {
    const dispose = run("overview");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
