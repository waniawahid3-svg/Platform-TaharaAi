"use client";

/* ISMS document package dashboard - /isms */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="gpx isx">
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
    <a class="crumb rv" href="/gap" id="isBack">
      <svg viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span data-i="crumb">BACK TO THE GAP ASSESSMENT</span>
    </a>

    <div class="head rv">
      <div>
        <h1 data-i="h1">ISMS document package</h1>
        <div class="meta"><span id="isMeta">&hellip;</span></div>
      </div>
      <div class="actions">
        <a class="btn-g" href="/master" id="isMasterLink"><span data-i="master">Master framework view</span></a>
      </div>
    </div>

    <!-- KPIs -->
    <div class="kband">
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k1l">DOCUMENTS READY</span></div>
        <div class="knr"><span class="kn" id="isKDocs">0<small>/11</small></span></div>
        <div class="ks" id="isKDocsS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k2l">EVIDENCE SOURCE</span></div>
        <div class="knr"><span class="kn" id="isKEvid" style="font-size:18px">&hellip;</span></div>
        <div class="ks" id="isKEvidS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k3l">MASTER FRAMEWORK</span></div>
        <div class="knr"><span class="kn" id="isKMf" style="font-size:18px">&hellip;</span></div>
        <div class="ks" id="isKMfS">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh"><span class="kl" data-i="k4l">AUDITOR CLARIFICATIONS</span></div>
        <div class="knr"><span class="kn" id="isKCl" style="font-size:18px">&hellip;</span></div>
        <div class="ks" id="isKClS">&hellip;</div>
      </div>
    </div>

    <!-- generate -->
    <div class="st rv"><h2 data-i="genT">Generate the package</h2><span data-i="genS">10 WORD DOCUMENTS · 1 POWERPOINT · FROM THIS INTERVIEW AND THE LATEST EVIDENCE</span></div>
    <div class="card evc rv">
      <div class="evb">
        <p class="evp" data-i="genP">Regenerating replaces the previous package. Pull evidence on the gap assessment page first if you want this run to reflect a fresh collector scan.</p>
        <label class="evk"><input type="checkbox" id="isMaster"><span data-i="genMaster">Include the 789-control determination and the auditor's clarifying questions (takes minutes)</span></label>
        <div class="evr"><button class="btn-p" id="isGen" type="button" data-i="gen">Generate documents</button><span class="evm" id="isGenMsg" role="status" aria-live="polite"></span></div>
        <div class="evbar" id="isGenBar" hidden><i></i></div>
      </div>
    </div>

    <!-- documents -->
    <div class="st rv"><h2 data-i="docsT">The 11 documents</h2><span id="isDocsSub">&hellip;</span></div>
    <div class="card rv" id="isDocsCard">
      <div id="isFiles"></div>
    </div>

    <!-- needing attention -->
    <div class="st rv" id="isNeedT" hidden><h2 data-i="needT">Needs a person</h2><span data-i="needS">TAHARA MASTER FRAMEWORK CONTROLS CARRIED INTO DOCUMENT 5 — ANSWER THESE ON THE MASTER VIEW TO REACH THEM</span></div>
    <div class="card rv" id="isNeedCard" hidden>
      <div id="isNeedRows"></div>
    </div>
  </div>

  <footer class="foot">
    <span data-i="ft1">TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
    <span data-i="ft2">SAFE · ETHICAL · TRANSPARENT</span>
  </footer>
</div>
`;

export default function IsmsPage() {
  useEffect(() => {
    const dispose = run("isms");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
