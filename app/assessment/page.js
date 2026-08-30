"use client";

/* Assessment - /assessment */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="chx">
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
        <button class="icb" id="themeTg" aria-label="Switch theme">
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

  <div class="shell">
    <div class="cwrap">
      <div class="chat">
        <div class="runh">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M20.2 12.7a2.9 2.9 0 0 1-2.9 2.9h-6l-4.4 3.9v-3.9H5.7a2.9 2.9 0 0 1-2.9-2.9V6.9A2.9 2.9 0 0 1 5.7 4h11.6a2.9 2.9 0 0 1 2.9 2.9v5.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="9.9" r="1.15" fill="currentColor"/><circle cx="12" cy="9.9" r="1.15" fill="currentColor"/><circle cx="16" cy="9.9" r="1.15" fill="currentColor"/></svg></span>
          <span><b data-i="runT">Master framework assessment</b><span data-i="runS">EU AI ACT · ISO/IEC 42001 · ISO/IEC 23894 · NIST AI RMF</span></span>
          <span class="live"><i></i><span data-i="runLive">IN PROGRESS</span></span>
        </div>
        <div class="stream" id="stream"></div>
        <div class="compose">
          <input class="ci" id="ci" data-ph="ph" placeholder="Type your answer, or pick an option above" onkeydown="if(event.key==='Enter')chxSend()">
          <button class="sendb" id="sendB" aria-label="Send" onclick="chxSend()">
            <svg viewBox="0 0 24 24" fill="none"><path d="M4.5 12h13M12.5 6.5 18.5 12l-6 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>

    <aside class="side">
      <div class="card">
        <div class="sh"><span data-i="sProfile">PROFILE</span></div>
        <div class="pb">
          <div class="prog-t"><span class="p"><span id="pct">0</span>%</span><span class="l" data-i="sMapped">MAPPED</span></div>
          <div class="bar"><div class="bar-f" id="pbar"></div></div>
        </div>
        <div class="kv"><span class="k" data-i="kEst">Established</span><span class="v" id="kEst">0</span></div>
        <div class="kv"><span class="k" data-i="kDoc">From documents</span><span class="v" id="kDoc">0</span></div>
        <div class="kv"><span class="k" data-i="kDis">From discovery</span><span class="v hl" id="kDis">0</span></div>
        <div class="kv"><span class="k" data-i="kNeed">Still needed</span><span class="v" id="kNeed">187</span></div>
      </div>

      <div class="card">
        <div class="sh"><span data-i="sFw">FRAMEWORKS</span></div>
        <div class="kv"><span class="k keep">EU AI Act</span><span class="v" id="fEU">—</span></div>
        <div class="kv"><span class="k keep">ISO/IEC 42001</span><span class="v" id="fISO">—</span></div>
        <div class="kv"><span class="k keep">ISO/IEC 23894</span><span class="v" id="f238">—</span></div>
        <div class="kv"><span class="k keep">NIST AI RMF</span><span class="v" id="fNIST">—</span></div>
      </div>

      <div class="card">
        <div class="sh"><span data-i="sFind">FINDINGS</span><span class="cnt" id="fnCount">0</span></div>
        <div id="findings"><p class="muted" data-i="findEmpty">Findings appear here as the engine detects deltas between what you say, what you wrote, and what your system is doing.</p></div>
      </div>

      <div class="card">
        <div class="sh"><span data-i="sDisc">DISCOVERY</span></div>
        <div class="kv"><span class="k" data-i="kColl">Collector</span><span class="v gd" data-i="kLive">● LIVE</span></div>
        <div class="kv"><span class="k" data-i="kObs">Last observed</span><span class="v keep">04:12</span></div>
        <div class="kv"><span class="k" data-i="kProbeL">Probes run</span><span class="v keep" id="kProbe">1,204</span></div>
      </div>
    </aside>
  </div>

  <footer class="foot">
    <span data-i="ft1">TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
    <span data-i="ft2">SAFE · ETHICAL · TRANSPARENT</span>
  </footer>
</div>
`;

export default function AssessmentPage() {
  useEffect(() => {
    const dispose = run("assessment");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
