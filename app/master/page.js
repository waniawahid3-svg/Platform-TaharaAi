"use client";

/* Master framework assessment - /master */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="gpx mfx">
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
        <button class="icb" id="gpTheme" aria-label="Switch theme">
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

  <div class="wrap">
    <a class="crumb rv" href="/gap" id="mxBack">
      <svg viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span data-i="crumb">BACK TO THE GAP ASSESSMENT</span>
    </a>

    <div class="head rv">
      <div>
        <h1 data-i="h1">Master framework assessment</h1>
        <div class="meta"><span id="mxMeta">&hellip;</span></div>
      </div>
      <div class="actions">
        <a class="btn-g" href="/report" id="mxReportLink"><span data-i="report">Applicability report</span></a>
        <a class="btn-p" href="/gap" id="mxDocsLink"><span data-i="docs">Evidence and documents</span></a>
      </div>
    </div>

    <div class="mxnote rv" id="mxNote" hidden></div>

    <!-- master KPIs -->
    <div class="kband">
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k1l">APPLICABILITY DETERMINED</span></div>
        <div class="knr"><span class="kn"><span id="mxAppl">0</span><small>%</small></span></div>
        <div class="minibar"><i id="mxApplBar"></i></div>
        <div class="ks" id="mxApplS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k2l">COLLECTOR EVIDENCE</span></div>
        <div class="knr"><span class="kn"><span id="mxEvid">0</span><small>%</small></span></div>
        <div class="minibar"><i id="mxEvidBar"></i></div>
        <div class="ks" id="mxEvidS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k3l">COMPLIANCE (HUMAN-ACCEPTED)</span></div>
        <div class="knr"><span class="kn"><span id="mxComp">0</span><small>%</small></span></div>
        <div class="minibar"><i id="mxCompBar"></i></div>
        <div class="ks" id="mxCompS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k4l">CONTROLS ASSESSED</span></div>
        <div class="knr"><span class="kn" id="mxTotal">0</span></div>
        <div class="ks" id="mxTotalS">&hellip;</div>
      </div>
    </div>

    <!-- per framework -->
    <div class="st rv"><h2 data-i="fwT">Each framework</h2><span data-i="fwS">SAME SYSTEM PROFILE · SEPARATE PERCENTAGES</span></div>
    <div class="cov" id="mxFw"></div>

    <!-- register -->
    <div class="st rv"><h2 data-i="regT">Every control</h2><span id="mxRegSub">&hellip;</span></div>
    <div class="reg rv">
      <div class="reg-h">
        <span class="t" data-i="regH">VERDICT · CONTROL · EVIDENCE · MAPPING · FRAMEWORK</span>
        <div class="filters" id="mxFwFilter"></div>
      </div>
      <div class="reg-h mxbar">
        <div class="filters" id="mxStFilter"></div>
        <input class="mxq" id="mxSearch" type="search" data-i-ph="search" placeholder="Search controls" autocomplete="off">
      </div>
      <div id="mxRows"></div>
      <div class="reg-f"><button class="flt" id="mxMore" type="button" hidden></button><span id="mxRegF" data-i="regF">EVIDENCE STATUS IS WHAT HAS BEEN OBSERVED, NOT WHETHER THE CONTROL IS MET.</span></div>
    </div>
  </div>

  <footer class="foot">
    <span data-i="ft1">TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
    <span data-i="ft2">SAFE · ETHICAL · TRANSPARENT</span>
  </footer>
</div>
`;

export default function MasterPage() {
  useEffect(() => {
    const dispose = run("master");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
