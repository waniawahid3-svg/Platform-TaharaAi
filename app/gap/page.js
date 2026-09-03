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
        <a class="btn-p" href="/report">
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
          <div class="ks" data-i="k1s">Share of the 187 master-scope requirements that are established and evidenced today.</div>
        </div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki"><svg viewBox="0 0 24 24" fill="none"><path d="M5 6.5h14M5 12h14M5 17.5h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="m16.4 16.6 1.7 1.7 3-3.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="kl" data-i="k2l">REQUIREMENTS MAPPED</span>
        </div>
        <div class="kn"><span id="gpMapped">0</span><small class="keep"> / 187</small></div>
        <div class="minibar"><i id="gpMapBar"></i></div>
        <div class="ks" data-i="k2s">23 from documents, 14 observed by discovery, the rest attested in the interview.</div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki red"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4 3.5 19h17L12 4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 10v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1" fill="currentColor"/></svg></span>
          <span class="kl" data-i="k3l">FINDINGS ON THE REGISTER</span>
        </div>
        <div class="knr"><span class="kn" id="gpFinds">0</span><span class="chip red" data-i="k3c">2 MAJOR NONCONFORMITIES</span></div>
        <div class="ks" data-i="k3s">Both majors block ISO/IEC 42001 certification until closed.</div>
      </div>
      <div class="kc rv">
        <div class="kh">
          <span class="ki green"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4.2l2.8 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <span class="kl" data-i="k4l">REMAINING QUESTIONS</span>
        </div>
        <div class="knr"><span class="kn" id="gpLeft">0</span><span class="chip green" data-i="k4c">CANNOT CHANGE THE OUTCOME</span></div>
        <div class="ks" data-i="k4s">Deferred: none can alter the findings already established.</div>
      </div>
    </div>

    <!-- coverage -->
    <div class="st rv"><h2 data-i="covT">Framework coverage</h2><span data-i="covS">OVERLAP COUNTED ONCE ACROSS THE MASTER SET</span></div>
    <div class="cov">
      <div class="cc rv">
        <div class="ch"><span class="fn keep">EU AI Act</span><span class="fc keep">76 / 84</span></div>
        <div class="fp"><span data-n="90">0</span><i>%</i></div>
        <div class="bar"><i data-w="90"></i></div>
        <div class="cs" data-i="ccS">REQUIREMENTS SATISFIED</div>
      </div>
      <div class="cc rv">
        <div class="ch"><span class="fn keep">ISO/IEC 42001</span><span class="fc keep">56 / 62</span></div>
        <div class="fp"><span data-n="90">0</span><i>%</i></div>
        <div class="bar"><i data-w="90"></i></div>
        <div class="cs" data-i="ccS">REQUIREMENTS SATISFIED</div>
      </div>
      <div class="cc rv">
        <div class="ch"><span class="fn keep">ISO/IEC 23894</span><span class="fc keep">13 / 18</span></div>
        <div class="fp"><span data-n="72">0</span><i>%</i></div>
        <div class="bar"><i data-w="72"></i></div>
        <div class="cs" data-i="ccS">REQUIREMENTS SATISFIED</div>
      </div>
      <div class="cc rv">
        <div class="ch"><span class="fn keep">NIST AI RMF</span><span class="fc keep">19 / 23</span></div>
        <div class="fp"><span data-n="81">0</span><i>%</i></div>
        <div class="bar"><i data-w="81"></i></div>
        <div class="cs" data-i="ccS">REQUIREMENTS SATISFIED</div>
      </div>
    </div>

    <!-- register + rail -->
    <div class="st rv"><h2 data-i="regT">Findings register</h2><span data-i="regS">11 FINDINGS · TRIANGULATED AGAINST LIVE SYSTEM STATE</span></div>
    <div class="main">
      <div class="reg rv">
        <div class="reg-h">
          <span class="t" data-i="regH">SEVERITY · FINDING · OWNER · DUE · STATUS</span>
          <div class="filters" id="gpFilters">
            <button class="flt on" data-f="all"><span data-i="fAll">ALL</span> · 11</button>
            <button class="flt" data-f="maj"><span data-i="fMaj">MAJOR</span> · 2</button>
            <button class="flt" data-f="min"><span data-i="fMin">MINOR</span> · 7</button>
            <button class="flt" data-f="obs"><span data-i="fObs">OBSERVATION</span> · 1</button>
            <button class="flt" data-f="det"><span data-i="fDet">DETERMINATION</span> · 1</button>
          </div>
        </div>
        <div id="gpRows"></div>
        <div class="reg-f" data-i="regF">MAJORS STAY OPEN UNTIL THE COLLECTOR OBSERVES THEM RESOLVED, NOT UNTIL SOMEONE REPORTS THEM DONE.</div>
      </div>

      <aside class="rail">
        <div class="card rv">
          <div class="sh" data-i="remT">REMEDIATION PRIORITIES</div>
          <div class="rem" id="gpRem"></div>
        </div>
        <div class="card rv">
          <div class="sh" data-i="provT">EVIDENCE PROVENANCE</div>
          <div class="prov">
            <div class="pbar">
              <i class="p1" data-w="12.3"></i><i class="p2" data-w="7.5"></i><i class="p3" data-w="70"></i><i class="p4" data-w="10.2"></i>
            </div>
            <div class="pleg">
              <div class="pl"><i style="background:var(--acc)"></i><span data-i="pv1">From documents</span><span class="v keep">23</span></div>
              <div class="pl"><i style="background:var(--green)"></i><span data-i="pv2">Observed by discovery</span><span class="v keep">14</span></div>
              <div class="pl"><i style="background:var(--violet)"></i><span data-i="pv3">Attested in interview</span><span class="v keep">131</span></div>
              <div class="pl"><i style="background:var(--line)"></i><span data-i="pv4">Not yet asked</span><span class="v keep">19</span></div>
            </div>
          </div>
        </div>
        <div class="card rv">
          <div class="sh" data-i="colT">COLLECTOR</div>
          <div class="kv"><span class="k" data-i="c1">Status</span><span class="v live"><i></i><span data-i="cLive">LIVE</span></span></div>
          <div class="kv"><span class="k" data-i="c2">Watching</span><span class="v keep">s3://prod-models · s3://prod-logs</span></div>
          <div class="kv"><span class="k" data-i="c3">Probes run</span><span class="v keep">1,318</span></div>
          <div class="kv"><span class="k" data-i="c4">Next sweep</span><span class="v keep">00:41</span></div>
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
