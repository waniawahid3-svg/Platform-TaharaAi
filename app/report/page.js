"use client";

/* Gap report - /report */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="rpx">
  <header class="top">
    <div class="top-in">
      <a class="brand" href="/overview">
        <img class="brand-img" src="https://www.taharaai.com/logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
        <svg class="brand-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
      </a>
      <nav class="tnav">
        <a href="/overview" data-i="n1">Overview</a>
        <a href="/governance" class="on" data-i="n2">Governance</a>
        <a href="/framework" data-i="n3">Frameworks</a>
        <a href="/discovery" data-i="n4">Discovery</a>
        <a href="#" data-i="n5">Adversarial</a>
        <a href="/guardrails" data-i="n6">Guardrails</a>
      </nav>
      <div class="top-r">
        <button class="icb" id="rpTheme" aria-label="Switch theme">
          <svg class="ic-moon" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          <svg class="ic-sun" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        </button>
        <div class="seg">
          <button type="button" data-lang="en" class="on">EN</button>
          <button type="button" data-lang="ar">AR</button>
        </div>
        <a class="so" href="/" data-i="signout">Sign out</a>
      </div>
    </div>
  </header>

  <div class="bar">
    <a class="crumb" href="/gap" id="rpGapLink">
      <svg viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span data-i="crumb">BACK TO THE DASHBOARD</span>
    </a>
    <button class="btn-p" onclick="window.print()">
      <svg viewBox="0 0 14 14" fill="none"><path d="M3.5 5V1.5h7V5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="1.8" y="5" width="10.4" height="5" rx="1.2" stroke="currentColor" stroke-width="1.4"/><path d="M4.2 8.4h5.6v4H4.2v-4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
      <span data-i="print">Print or save as PDF</span>
    </button>
  </div>

  <div class="sheetw">
    <div class="sheet rv in">

      <div class="lh">
        <a class="brand" href="/overview">
          <img class="brand-img" src="https://www.taharaai.com/logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
          <svg class="brand-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
        </a>
        <div class="ref">
          <div><span data-i="refL">REFERENCE</span> · <b class="keep" id="rpRef">—</b></div>
          <div><span data-i="dateL">GENERATED</span> · <b class="keep" id="rpDate">—</b></div>
          <div><span class="conf" data-i="conf">CONFIDENTIAL · INTERNAL</span></div>
        </div>
      </div>

      <div class="rule"></div>

      <h1 data-i="h1">Gap assessment report</h1>
      <div class="sub"><span id="rpSubA">NO REAL ENGAGEMENT YET</span> · <b id="rpSubB">&hellip;</b></div>

      <h2><span class="no">01</span><span data-i="s1">Executive summary</span></h2>
      <p class="body" id="rpP1">Run a real assessment from <a href="/assessment">/assessment</a> first — this report shows its real data, it does not fabricate one.</p>

      <h2><span class="no">02</span><span data-i="s2">At a glance</span></h2>
      <div class="glance">
        <div class="gl"><div class="l" data-i="g1l">READINESS</div><div class="n keep" id="rpG1">0<small>%</small></div><div class="s" id="rpG1s">of this framework's fields evidenced</div></div>
        <div class="gl"><div class="l" data-i="g2l">REQUIREMENTS</div><div class="n keep" id="rpG2">0<small id="rpG2d"> / 0</small></div><div class="s" id="rpG2s">fields established</div></div>
        <div class="gl warn"><div class="l" data-i="g3l">FINDINGS</div><div class="n keep" id="rpG3">0</div><div class="s" id="rpG3s">real, from this engagement's report</div></div>
        <div class="gl"><div class="l" id="rpG4l">FIELDS STILL NEEDED</div><div class="n keep" id="rpG4">0</div><div class="s" id="rpG4s">before the report can go FINAL</div></div>
      </div>

      <h2><span class="no">03</span><span data-i="s3">Framework coverage</span></h2>
      <table>
        <thead><tr>
          <th data-i="t1a">FRAMEWORK</th><th data-i="t1b">SATISFIED</th><th data-i="t1c">COVERAGE</th><th style="width:54px"></th>
        </tr></thead>
        <tbody id="rpCov"></tbody>
      </table>

      <h2><span class="no">04</span><span data-i="s4">Findings register</span></h2>
      <table id="rpFinds">
        <thead><tr>
          <th data-i="t2a">CLAUSE</th><th data-i="t2b">SEVERITY</th><th data-i="t2c">FINDING</th>
          <th class="hidecol">SOURCE</th><th class="hidecol">RAISED</th><th data-i="t2f">STATUS</th>
        </tr></thead>
        <tbody></tbody>
      </table>

      <h2><span class="no">05</span><span data-i="s5">Remediation plan</span></h2>
      <ol class="rem" id="rpRem"></ol>

      <h2><span class="no">06</span><span data-i="s6">Method and evidence</span></h2>
      <p class="body" id="rpP6">&hellip;</p>

      <div class="sign">
        <div class="who">
          <b data-i="sgB">Tahara assurance engine</b>
          <span data-i="sgS">Master framework assessment · interview and discovery triangulation</span>
        </div>
        <div class="stamp keep">
          <span id="rpStamp1">&hellip;</span><br>
          <span class="keep" id="rpStamp2">&hellip;</span><br>
          <span id="rpStamp3">&hellip;</span>
        </div>
      </div>

    </div>
  </div>
</div>
`;

export default function ReportPage() {
  useEffect(() => {
    const dispose = run("report");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
