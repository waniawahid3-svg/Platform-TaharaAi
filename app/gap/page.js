"use client";

/* Gap assessment - /gap */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="gpx">
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
    <a class="crumb rv" href="/assessment">
      <svg viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span data-i="crumb">BACK TO THE INTERVIEW</span>
    </a>

    <div class="head rv">
      <div>
        <h1 data-i="h1">Gap assessment</h1>
        <div class="meta"><span data-i="metaA">MASTER SCOPE · 187 REQUIREMENTS · GENERATED TODAY</span> · <b data-i="metaB">COLLECTOR LIVE</b></div>
      </div>
      <div class="actions">
        <a class="btn-g" href="/assessment">
          <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 7A4.5 4.5 0 1 1 7 2.5M7 .8v3.4L9.2 2 7 .8Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span data-i="rerun">Re-run interview</span>
        </a>
        <a class="btn-g" href="/master" id="gpMasterLink"><span data-i="master">Master framework view</span></a>
        <a class="btn-p" href="/report" id="gpReportLink">
          <svg viewBox="0 0 14 14" fill="none"><path d="M7 9.5V2M4.2 6.7 7 9.5l2.8-2.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 11.8h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          <span data-i="export">Export report</span>
        </a>
      </div>
    </div>

    <!-- KPI band -->
    <div class="kband">
      <div class="kc ring rv">
        <div class="kh">
          <span class="ki"><svg viewBox="0 0 24 24" fill="none"><path d="M4.5 13.5a7.5 7.5 0 1 1 15 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="m12 13.5 3.6-3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="13.5" r="1.3" fill="currentColor"/></svg></span>
          <span class="kl" data-i="k1l">READINESS</span>
        </div>
        <div class="ringrow">
          <div class="ringw">
            <svg viewBox="0 0 86 86">
              <defs><linearGradient id="gpxGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#2F6BD6"/><stop offset="1" stop-color="#12876A"/>
              </linearGradient></defs>
              <circle class="rb" cx="43" cy="43" r="38"/>
              <circle class="rf" id="gpRing" cx="43" cy="43" r="38"/>
            </svg>
            <span class="rp"><span id="gpPct">0</span><i>%</i></span>
          </div>
          <div class="ks" id="gpK1s">Share of this framework's fields established and evidenced today, from a real engagement.</div>
        </div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki"><svg viewBox="0 0 24 24" fill="none"><path d="M5 6.5h14M5 12h14M5 17.5h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="m16.4 16.6 1.7 1.7 3-3.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="kl" data-i="k2l">REQUIREMENTS MAPPED</span>
        </div>
        <div class="kn"><span id="gpMapped">0</span><small class="keep" id="gpMappedDenom"> / 0</small></div>
        <div class="minibar"><i id="gpMapBar"></i></div>
        <div class="ks" id="gpK2s">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki red"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4 3.5 19h17L12 4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 10v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1" fill="currentColor"/></svg></span>
          <span class="kl" data-i="k3l">FINDINGS ON THE REGISTER</span>
        </div>
        <div class="knr"><span class="kn" id="gpFinds">0</span><span class="chip red" id="gpK3c">&hellip;</span></div>
        <div class="ks" id="gpK3s">&hellip;</div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki green"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4.2l2.8 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="kl" id="gpK4l">FIELDS STILL NEEDED</span>
        </div>
        <div class="knr"><span class="kn" id="gpLeft">0</span><span class="chip green" id="gpK4c">&hellip;</span></div>
        <div class="ks" id="gpK4s">&hellip;</div>
      </div>
    </div>

    <!-- coverage -->
    <div class="st rv"><h2 data-i="covT">Framework coverage</h2><span id="gpCovSub">REAL, FROM THE LATEST COMPLETED ENGAGEMENT</span></div>
    <div class="cov" id="gpCov"></div>

    <!-- evidence + documents -->
    <div class="st rv"><h2 data-i="evT">Evidence and documents</h2><span id="gpEvSub" data-i="evS">LIVE HOST EVIDENCE · ISMS DOCUMENT PACKAGE</span></div>
    <div class="evx rv" id="gpEv">
      <div class="card evc">
        <div class="sh" data-i="evPullH">1 · LIVE EVIDENCE</div>
        <div class="evb">
          <p class="evp" data-i="evPullP">Scan the host with AIGRC-Collector. Facts it observes are added to this engagement; everything else it finds appears on the findings register.</p>
          <div class="evr"><button class="btn-g" id="gpPull" type="button" data-i="evPull">Pull evidence</button><span class="evm" id="gpPullMsg" role="status" aria-live="polite"></span></div>
        </div>
      </div>
      <div class="card evc">
        <div class="sh" data-i="evGenH">2 · ISMS DOCUMENTS</div>
        <div class="evb">
          <p class="evp" data-i="evGenP">Generate the 11-document ISMS package (10 Word, 1 PowerPoint) from this interview and the latest evidence.</p>
          <label class="evk"><input type="checkbox" id="gpMaster"><span data-i="evMaster">Include the 789-control determination (takes minutes)</span></label>
          <div class="evr"><button class="btn-p" id="gpGen" type="button" data-i="evGen">Generate documents</button><span class="evm" id="gpGenMsg" role="status" aria-live="polite"></span></div>
          <div class="evbar" id="gpGenBar" hidden><i></i></div>
          <div id="gpFiles"></div>
        </div>
      </div>
    </div>

    <!-- register + rail -->
    <div class="st rv"><h2 data-i="regT">Findings register</h2><span id="gpRegSub">&hellip;</span></div>
    <div class="main">
      <div class="reg rv">
        <div class="reg-h">
          <span class="t" id="gpRegH">SEVERITY · FINDING · CONTROL · SOURCE · STATUS</span>
          <div class="filters" id="gpFilters">
            <button class="flt on" data-f="all"><span data-i="fAll">ALL</span> · <span id="gpCntAll">0</span></button>
            <button class="flt" data-f="critical"><span>CRITICAL</span> · <span id="gpCntCritical">0</span></button>
            <button class="flt" data-f="major"><span data-i="fMaj">MAJOR</span> · <span id="gpCntMajor">0</span></button>
            <button class="flt" data-f="minor"><span data-i="fMin">MINOR</span> · <span id="gpCntMinor">0</span></button>
          </div>
        </div>
        <div id="gpRows"></div>
        <div class="reg-f" id="gpRegF">Findings tied to system state stay open until re-observed resolved, not until someone reports them done.</div>
      </div>

      <aside class="rail">
        <div class="card rv">
          <div class="sh" id="gpRemT">OPEN FINDINGS, BY SEVERITY</div>
          <div class="rem" id="gpRem"></div>
        </div>
        <div class="card rv">
          <div class="sh" data-i="provT">EVIDENCE PROVENANCE</div>
          <div class="prov">
            <div class="pbar" id="gpProvBar">
              <i class="p1" data-w="0"></i><i class="p2" data-w="0"></i><i class="p3" data-w="0"></i><i class="p4" data-w="0"></i>
            </div>
            <div class="pleg">
              <div class="pl"><i style="background:var(--acc)"></i><span data-i="pv1">From documents</span><span class="v keep" id="gpProv1">0</span></div>
              <div class="pl"><i style="background:var(--green)"></i><span data-i="pv2">Observed by discovery</span><span class="v keep" id="gpProv2">0</span></div>
              <div class="pl"><i style="background:var(--violet)"></i><span data-i="pv3">Attested in interview</span><span class="v keep" id="gpProv3">0</span></div>
              <div class="pl"><i style="background:var(--line)"></i><span data-i="pv4">Not yet asked</span><span class="v keep" id="gpProv4">0</span></div>
            </div>
          </div>
        </div>
        <div class="card rv">
          <div class="sh" data-i="colT">COLLECTOR</div>
          <div class="kv"><span class="k" data-i="c1">Status</span><span class="v" id="gpColStatus"><i></i><span>&hellip;</span></span></div>
          <div class="kv"><span class="k" data-i="c2">Watching</span><span class="v keep" id="gpColWatch">&hellip;</span></div>
          <div class="kv"><span class="k">Framework</span><span class="v keep" id="gpColFramework">&hellip;</span></div>
          <div class="kv"><span class="k">Report status</span><span class="v keep" id="gpColReportStatus">&hellip;</span></div>
        </div>
      </aside>
    </div>
  </div>

  <footer class="foot">
    <span data-i="ft1">TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
    <span data-i="ft2">SAFE · ETHICAL · TRANSPARENT</span>
  </footer>
</div>
`;

export default function GapPage() {
  useEffect(() => {
    const dispose = run("gap");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
