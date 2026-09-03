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
    <a class="crumb" href="/gap">
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
          <div><span data-i="refL">REFERENCE</span> · <b class="keep">TAH-GA-2026-0143</b></div>
          <div><span data-i="dateL">GENERATED</span> · <b class="keep" id="rpDate">2026-08-30</b></div>
          <div><span class="conf" data-i="conf">CONFIDENTIAL · INTERNAL</span></div>
        </div>
      </div>

      <div class="rule"></div>

      <h1 data-i="h1">Gap assessment report</h1>
      <div class="sub"><span data-i="subA">MASTER SCOPE · EU AI ACT · ISO/IEC 42001 · ISO/IEC 23894 · NIST AI RMF · 187 REQUIREMENTS</span> · <b data-i="subB">COLLECTOR LIVE</b></div>

      <h2><span class="no">01</span><span data-i="s1">Executive summary</span></h2>
      <p class="body" data-i="p1">The assessed system is a cloud-delivered employment screening service that profiles natural persons, which classifies it as high-risk under Annex III of the EU AI Act with the Article 6(3) derogation unavailable. Of the 187 requirements in the master scope, <b>168 are established and evidenced</b>, a readiness of 90 percent. <b>Eleven findings</b> sit on the register, of which <b>two are major nonconformities</b> that block ISO/IEC 42001 certification until closed: access control that is documented but not operating, and the absence of internal audit records. Both were triangulated against live system state observed by the discovery collector, not self-reported.</p>

      <h2><span class="no">02</span><span data-i="s2">At a glance</span></h2>
      <div class="glance">
        <div class="gl"><div class="l" data-i="g1l">READINESS</div><div class="n keep">90<small>%</small></div><div class="s" data-i="g1s">of the master scope evidenced</div></div>
        <div class="gl"><div class="l" data-i="g2l">REQUIREMENTS</div><div class="n keep">168<small> / 187</small></div><div class="s" data-i="g2s">mapped, overlap counted once</div></div>
        <div class="gl warn"><div class="l" data-i="g3l">FINDINGS</div><div class="n keep">11</div><div class="s" data-i="g3s">2 major nonconformities</div></div>
        <div class="gl"><div class="l" data-i="g4l">DEFERRED</div><div class="n keep">19</div><div class="s" data-i="g4s">cannot change the outcome</div></div>
      </div>

      <h2><span class="no">03</span><span data-i="s3">Framework coverage</span></h2>
      <table>
        <thead><tr>
          <th data-i="t1a">FRAMEWORK</th><th data-i="t1b">SATISFIED</th><th data-i="t1c">COVERAGE</th><th style="width:54px"></th>
        </tr></thead>
        <tbody>
          <tr><td class="keep">EU AI Act</td><td class="num keep">76 / 84</td><td><div class="covbar"><i style="width:90%"></i></div></td><td class="num keep">90%</td></tr>
          <tr><td class="keep">ISO/IEC 42001</td><td class="num keep">56 / 62</td><td><div class="covbar"><i style="width:90%"></i></div></td><td class="num keep">90%</td></tr>
          <tr><td class="keep">ISO/IEC 23894</td><td class="num keep">13 / 18</td><td><div class="covbar"><i style="width:72%"></i></div></td><td class="num keep">72%</td></tr>
          <tr><td class="keep">NIST AI RMF</td><td class="num keep">19 / 23</td><td><div class="covbar"><i style="width:81%"></i></div></td><td class="num keep">81%</td></tr>
        </tbody>
      </table>

      <h2><span class="no">04</span><span data-i="s4">Findings register</span></h2>
      <table id="rpFinds">
        <thead><tr>
          <th data-i="t2a">CLAUSE</th><th data-i="t2b">SEVERITY</th><th data-i="t2c">FINDING</th>
          <th class="hidecol" data-i="t2d">OWNER</th><th class="hidecol" data-i="t2e">DUE</th><th data-i="t2f">STATUS</th>
        </tr></thead>
        <tbody></tbody>
      </table>

      <h2><span class="no">05</span><span data-i="s5">Remediation plan</span></h2>
      <ol class="rem" id="rpRem"></ol>

      <h2><span class="no">06</span><span data-i="s6">Method and evidence</span></h2>
      <p class="body" data-i="p6">Of the 187 requirements, <b>23</b> were established from uploaded documents with citations to source, <b>14</b> were observed directly by the discovery collector against live infrastructure, and <b>131</b> were attested in a structured fifteen-question interview. Nineteen requirements were deferred because no answer to them can change the findings above. Findings tied to system state remain under continuous observation: they close when the collector observes remediation, not when it is reported.</p>

      <div class="sign">
        <div class="who">
          <b data-i="sgB">Tahara assurance engine</b>
          <span data-i="sgS">Master framework assessment · interview and discovery triangulation</span>
        </div>
        <div class="stamp keep">
          <span data-i="stamp1">COLLECTOR · LIVE</span><br>
          <span class="keep">s3://prod-models · s3://prod-logs</span><br>
          <span data-i="stamp2">PROBES RUN · 1,318</span>
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
