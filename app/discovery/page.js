"use client";

/* Discovery - /discovery */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-ext";

const MARKUP = `
<div class="dvx" id="dvx" data-theme="light">

<header class="top">
  <div class="top-in">
    <a class="brand" href="/overview"><img class="brand-img" src="https://www.taharaai.com/logo.png" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" /><svg class="brand-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span></a>
    <nav class="tnav">
      <a href="/overview" data-lk="nOverview">Overview</a><a href="/governance" data-lk="nGov">Governance</a>
      <a href="/framework" data-lk="nFw">Frameworks</a><a class="on" href="/discovery" data-lk="nDisc">Discovery</a>
      <a href="#" data-lk="nAdv">Adversarial</a><a href="/guardrails" data-lk="nGuard">Guardrails</a>
    </nav>
    <div class="top-r">
      <button class="icb" id="themeTg" aria-label="Switch theme">
        <svg class="ic-moon" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg><svg class="ic-sun" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
      </button>
      <div class="seg"><button class="on" data-lang="en">EN</button><button data-lang="ar">عربي</button></div>
      <a class="outl" href="#">Sign out</a>
    </div>
  </div>
  <span class="progress" id="prog"></span>
</header>

<div class="shell">

  <section class="dh2" data-rv>
    <h1 data-i18n="h1">What can actually be discovered, <em>visualized live.</em></h1>
    <p class="dh2-lede" data-i18n="lede">Six wrapped tools. Four evidence layers. One relationship graph. <b>Read-only, inside your own boundary.</b></p>
    <a class="dh2-btn" href="#rel-graph" data-i18n="heroBtn">View the live graph &rarr;</a>

    <div class="hub" aria-hidden="true">
      <svg class="hub-wires" viewBox="0 0 1040 320" preserveAspectRatio="none">
        <path id="hw1" d="M300,84 C380,84 420,140 470,152"/>
        <path id="hw2" d="M300,236 C380,236 420,180 470,168"/>
        <path id="hw3" d="M740,84 C660,84 620,140 570,152"/>
        <path id="hw4" d="M740,236 C660,236 620,180 570,168"/>
        <circle class="hdot" r="3.5"><animateMotion dur="2.6s" begin="0s" repeatCount="indefinite"><mpath href="#hw1"/></animateMotion></circle>
        <circle class="hdot" r="3.5"><animateMotion dur="2.6s" begin=".65s" repeatCount="indefinite"><mpath href="#hw2"/></animateMotion></circle>
        <circle class="hdot" r="3.5"><animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite"><mpath href="#hw3"/></animateMotion></circle>
        <circle class="hdot" r="3.5"><animateMotion dur="2.6s" begin="1.95s" repeatCount="indefinite"><mpath href="#hw4"/></animateMotion></circle>
      </svg>

      <div class="hub-card hc1" style="--hd:.1s">
        <span class="hc-ic" style="background:var(--acc-w);color:var(--acc)"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9.5h17M9 3.5v17" stroke="currentColor" stroke-width="1.6"/></svg></span>
        <div><p class="hc-t" data-i18n="l1">Infrastructure and config</p><p class="hc-s">CHECKOV &middot; KICS</p></div>
      </div>
      <div class="hub-card hc2" style="--hd:.2s">
        <span class="hc-ic" style="background:var(--green-w);color:var(--green)"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 20 7v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V7l8-3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m9 12 2.2 2.2L15.5 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <div><p class="hc-t" data-i18n="l2">Live runtime posture</p><p class="hc-s">PROWLER &middot; KUBESCAPE</p></div>
      </div>

      <div class="hub-center" style="--hd:0s">
        <span class="hub-mk"><svg viewBox="0 0 28 28" fill="none"><path d="M14 4 24 9.4 14 14.8 4 9.4 14 4Z" fill="#2F6BD6"/><path d="M14 12.6 24 18l-10 5.4L4 18l10-5.4Z" fill="#7FA8EC"/></svg></span>
        <p class="hub-t" data-i18n="dscHub">Discovery</p>
      </div>

      <div class="hub-card hc3" style="--hd:.3s">
        <span class="hc-ic" style="background:var(--amber-w);color:var(--amber)"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v3.2M12 17.8V21M21 12h-3.2M6.2 12H3M18.4 5.6l-2.3 2.3M8 15.8l-2.3 2.3M18.4 18.4l-2.3-2.3M8 8.2 5.7 5.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <div><p class="hc-t" data-i18n="l3">AI and model inventory</p><p class="hc-s">AI-BOM &middot; MLFLOW</p></div>
      </div>
      <div class="hub-card hc4" style="--hd:.4s">
        <span class="hc-ic" style="background:var(--sky-w);color:var(--sky)"><svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="7" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M7.9 8.6 10.6 15.8M16.1 8.6 13.4 15.8M8.4 7h7.2" stroke="currentColor" stroke-width="1.6"/></svg></span>
        <div><p class="hc-t" data-i18n="l4">Relationships and identity</p><p class="hc-s">OPENCSPM</p></div>
      </div>
    </div>

    <div class="dh2-stats">
      <span class="statpill" style="--hd:.15s"><em data-i18n="kTools">Tools wrapped</em><b class="kn" data-to="6">0</b></span>
      <span class="statpill" style="--hd:.25s"><em data-i18n="kLayers">Evidence layers</em><b class="kn" data-to="4">0</b></span>
      <span class="statpill" style="--hd:.35s"><em data-i18n="kFind">Findings, last cycle</em><b class="kn" data-to="281">0</b></span>
      <span class="statpill" style="--hd:.45s"><em data-i18n="kProbes">Probes per cycle</em><b class="kn" data-to="8412">0</b></span>
    </div>
  </section>

  <section class="tele" data-rv>
    <div class="tele-h">
      <div><h2 data-i18n="dashT">Discovery telemetry</h2><p class="tele-sub" data-i18n="dashSub">Six wrapped tools across four evidence layers, running on a 24 hour cadence.</p></div>
      <span class="tag live"><i></i>LIVE</span>
    </div>

    <div class="tele-split">
      <div class="tpane">
        <p class="tpane-h" data-i18n="covT">Coverage by evidence layer</p>
        <div class="donut-wrap">
          <svg class="don2" viewBox="0 0 140 140"></svg>
          <div class="dleg2">
            <div class="r"><i style="background:var(--acc)"></i><span data-i18n="l1">Infrastructure and config</span><b>2</b></div>
            <div class="r"><i style="background:var(--green)"></i><span data-i18n="l2">Live runtime posture</span><b>2</b></div>
            <div class="r"><i style="background:var(--amber)"></i><span data-i18n="l3">AI and model inventory</span><b>2</b></div>
            <div class="r"><i style="background:var(--sky)"></i><span data-i18n="l4">Relationships and identity</span><b>1</b></div>
          </div>
        </div>
      </div>

      <div class="tpane">
        <p class="tpane-h" data-i18n="scanT">Scan activity, last 24 hours</p>
        <div class="chartwrap">
          <svg class="spark" viewBox="0 0 540 140" preserveAspectRatio="none">
            <defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="var(--acc)" stop-opacity=".22"/><stop offset="1" stop-color="var(--acc)" stop-opacity="0"/>
            </linearGradient></defs>
            <g class="glines"></g>
            <path class="fill"></path>
            <path class="line"></path>
            <circle class="now" r="4.5" fill="var(--acc)"/>
          </svg>
          <div class="axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span data-i18n="nowLbl">NOW</span></div>
        </div>
      </div>
    </div>

    <div class="dbars">
      <div class="dbars-h">
        <p class="tpane-h" data-i18n="findT">Findings surfaced per tool, last cycle</p>
        <span class="tag" data-i18n="cadTag">24H CADENCE</span>
      </div>
      <div class="bchart">
        <div class="bcol"><span class="bv">142</span><span class="bbar" style="--h:100%;--c:var(--acc)"></span><span class="bl">Checkov</span></div>
        <div class="bcol"><span class="bv">38</span><span class="bbar" style="--h:27%;--c:var(--acc);--d:.08s"></span><span class="bl">KICS</span></div>
        <div class="bcol"><span class="bv">61</span><span class="bbar" style="--h:43%;--c:var(--green);--d:.16s"></span><span class="bl">Prowler</span></div>
        <div class="bcol"><span class="bv">27</span><span class="bbar" style="--h:19%;--c:var(--green);--d:.24s"></span><span class="bl">Kubescape</span></div>
        <div class="bcol"><span class="bv">9</span><span class="bbar" style="--h:7%;--c:var(--amber);--d:.32s"></span><span class="bl">ai-bom</span></div>
        <div class="bcol"><span class="bv">4</span><span class="bbar" style="--h:4%;--c:var(--sky);--d:.4s"></span><span class="bl">OpenCSPM</span></div>
      </div>
    </div>
  </section>

  <section class="relcard" id="rel-graph" data-rv>
    <div class="rel-h">
      <div>
        <h2 data-i18n="relT">Relationships and identity, live graph</h2>
        <p class="rel-sub" data-i18n="relSub">Who can reach what, and through how many hops. Resolved as a graph query, not a flat table.</p>
      </div>
      <span class="tag">OPENCSPM</span>
    </div>

    <div class="rel-stage">
      <svg class="rel2" viewBox="0 0 1150 380" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="cardsh" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#062451" flood-opacity="0.09"/>
          </filter>
        </defs>

        <text class="colh" x="105" y="26" text-anchor="middle" data-i18n="colIdent">SERVICE ACCOUNT</text>
        <text class="colh" x="345" y="26" text-anchor="middle" data-i18n="colRoles">IAM ROLES</text>
        <text class="colh" x="585" y="26" text-anchor="middle" data-i18n="colRes">RESOURCES</text>
        <text class="colh" x="815" y="26" text-anchor="middle" data-i18n="colPipe">CI / CD</text>
        <text class="colh" x="985" y="26" text-anchor="middle" data-i18n="colTgt">TARGET</text>

        <path class="ed" style="--wd:.1s" d="M199,195 C226,195 212,110 240,110"/>
        <path class="ed" style="--wd:.2s" d="M439,110 C466,110 452,64 480,64"/>
        <path class="ed" style="--wd:.3s" d="M439,110 C466,110 452,195 480,195"/>
        <path class="ed" style="--wd:.3s" d="M439,280 C466,280 452,326 480,326"/>

        <path id="w1" class="fp" style="--wd:.15s" d="M199,195 C226,195 212,280 240,280"/>
        <path id="w2" class="fp" style="--wd:.35s" d="M439,280 C466,280 452,195 480,195"/>
        <path id="w3" class="fp" style="--wd:.55s" d="M679,195 L715,195"/>
        <path id="w4" class="fp" style="--wd:.7s" d="M909,195 L935,195"/>

        <circle class="fdot" r="3.5"><animateMotion dur="2.2s" begin="0s" repeatCount="indefinite"><mpath href="#w1"/></animateMotion></circle>
        <circle class="fdot" r="3.5"><animateMotion dur="2.2s" begin=".55s" repeatCount="indefinite"><mpath href="#w2"/></animateMotion></circle>
        <circle class="fdot" r="3.5"><animateMotion dur="1.4s" begin="1.1s" repeatCount="indefinite"><mpath href="#w3"/></animateMotion></circle>
        <circle class="fdot" r="3.5"><animateMotion dur="1.4s" begin="1.65s" repeatCount="indefinite"><mpath href="#w4"/></animateMotion></circle>

        <g class="hop"><circle cx="219" cy="245" r="10"/><text x="219" y="248.5" text-anchor="middle">1</text></g>
        <g class="hop"><circle cx="459" cy="245" r="10"/><text x="459" y="248.5" text-anchor="middle">2</text></g>
        <g class="hop"><circle cx="697" cy="174" r="10"/><text x="697" y="177.5" text-anchor="middle">3</text></g>

        <!-- SERVICE ACCOUNT -->
        <g class="nd" style="--d:.05s">
          <rect class="crd" x="20" y="169" width="180" height="52" rx="14"/>
          <rect x="35" y="182" width="27" height="27" rx="9" fill="var(--sky-w)"/>
          <g stroke="var(--sky)" stroke-width="1.7" fill="none" stroke-linecap="round">
            <circle cx="48.5" cy="192" r="3.7"/><path d="M41 204c1.7-4 4.5-5.4 7.5-5.4s5.8 1.4 7.5 5.4"/>
          </g>
          <text class="nn" x="72" y="191">svc-account-91</text>
          <text class="ns" x="72" y="206">NO OWNER TAG</text>
        </g>

        <!-- ROLES -->
        <g class="nd" style="--d:.16s">
          <rect class="crd" x="240" y="84" width="180" height="52" rx="14"/>
          <rect x="255" y="97" width="27" height="27" rx="9" fill="var(--acc-w)"/>
          <path d="M268.5 93.5 277 97v5.3c0 4.7-3.3 7.9-8.5 9.4-5.2-1.5-8.5-4.7-8.5-9.4V97l8.5-3.5Z" stroke="var(--acc)" stroke-width="1.7" fill="none" stroke-linejoin="round"/>
          <text class="nn" x="292" y="106">deploy-role</text>
          <text class="ns" x="292" y="121">IAM ROLE</text>
        </g>
        <g class="nd" style="--d:.16s">
          <rect class="crd onp" x="240" y="254" width="180" height="52" rx="14"/>
          <rect x="255" y="267" width="27" height="27" rx="9" fill="var(--acc-w)"/>
          <path d="M268.5 263.5 277 267v5.3c0 4.7-3.3 7.9-8.5 9.4-5.2-1.5-8.5-4.7-8.5-9.4V267l8.5-3.5Z" stroke="var(--acc)" stroke-width="1.7" fill="none" stroke-linejoin="round"/>
          <text class="nn" x="292" y="276">data-read-role</text>
          <text class="ns" x="292" y="291">IAM ROLE</text>
        </g>

        <!-- RESOURCES -->
        <g class="nd" style="--d:.3s">
          <rect class="crd" x="480" y="38" width="180" height="52" rx="14"/>
          <rect x="495" y="51" width="27" height="27" rx="9" fill="var(--green-w)"/>
          <g stroke="var(--green)" stroke-width="1.7" fill="none">
            <ellipse cx="508.5" cy="58" rx="7" ry="3"/>
            <path d="M501.5 58v10.5c0 1.7 3.1 3 7 3s7-1.3 7-3V58M501.5 63.3c0 1.7 3.1 3 7 3s7-1.3 7-3"/>
          </g>
          <text class="nn" x="532" y="60">inference-api</text>
          <text class="ns" x="532" y="75">CLEAN</text>
        </g>
        <g class="nd" style="--d:.3s">
          <rect class="crd onp flg" x="480" y="169" width="180" height="52" rx="14"/>
          <rect x="495" y="182" width="27" height="27" rx="9" fill="var(--amber-w)"/>
          <g stroke="var(--amber)" stroke-width="1.7" fill="none">
            <ellipse cx="508.5" cy="189" rx="7" ry="3"/>
            <path d="M501.5 189v10.5c0 1.7 3.1 3 7 3s7-1.3 7-3V189M501.5 194.3c0 1.7 3.1 3 7 3s7-1.3 7-3"/>
          </g>
          <text class="nn" x="532" y="191">model-bucket</text>
          <text class="ns amber" x="532" y="206">FLAGGED ACCESS</text>
        </g>
        <g class="nd" style="--d:.3s">
          <rect class="crd" x="480" y="300" width="180" height="52" rx="14"/>
          <rect x="495" y="313" width="27" height="27" rx="9" fill="var(--green-w)"/>
          <g stroke="var(--green)" stroke-width="1.7" fill="none">
            <ellipse cx="508.5" cy="320" rx="7" ry="3"/>
            <path d="M501.5 320v10.5c0 1.7 3.1 3 7 3s7-1.3 7-3V320M501.5 325.3c0 1.7 3.1 3 7 3s7-1.3 7-3"/>
          </g>
          <text class="nn" x="532" y="322">log-store</text>
          <text class="ns" x="532" y="337">CLEAN</text>
        </g>

        <!-- CI/CD -->
        <g class="nd" style="--d:.44s">
          <rect class="crd onp" x="715" y="169" width="180" height="52" rx="14"/>
          <rect x="730" y="182" width="27" height="27" rx="9" fill="var(--violet-w)"/>
          <g stroke="var(--violet)" stroke-width="1.7" fill="none" stroke-linecap="round">
            <circle cx="738.5" cy="189.5" r="2.9"/><circle cx="738.5" cy="203.5" r="2.9"/><circle cx="750.5" cy="196.5" r="2.9"/>
            <path d="M738.5 192.4v8.2M741 191c3.7 1 6.1 2.5 6.3 4.3"/>
          </g>
          <text class="nn" x="765" y="191">ci-pipeline-7</text>
          <text class="ns" x="765" y="206">DEPLOYS TO PROD</text>
        </g>

        <!-- TARGET -->
        <g class="nd" style="--d:.58s">
          <rect class="crd onp rch" x="935" y="169" width="182" height="52" rx="14"/>
          <rect x="950" y="182" width="27" height="27" rx="9" fill="var(--red-w)"/>
          <g stroke="var(--red)" stroke-width="1.7" fill="none" stroke-linecap="round">
            <rect x="957" y="186.5" width="14" height="8" rx="1.9"/><rect x="957" y="198.5" width="14" height="8" rx="1.9"/>
            <path d="M960.3 190.5h.01M960.3 202.5h.01" stroke-width="2.2"/>
          </g>
          <text class="nn" x="987" y="191">prod cluster</text>
          <text class="ns red" x="987" y="206">REACHED</text>
        </g>
      </svg>
    </div>

    <p class="rel-scrollhint" data-i18n="relScroll">SCROLL THE DIAGRAM SIDEWAYS TO FOLLOW THE PATH</p>

    <div class="rel-foot">
      <div class="rlegend">
        <span><i style="background:var(--sky)"></i><em data-i18n="rl4">Service account</em></span>
        <span><i style="background:var(--acc)"></i><em data-i18n="rl1">Identity or role</em></span>
        <span><i style="background:var(--green)"></i><em data-i18n="rl2">Resource, clean</em></span>
        <span><i style="background:var(--amber)"></i><em data-i18n="rl3">Resource, flagged access</em></span>
        <span><i style="background:var(--red)"></i><em data-i18n="rl5">Reached</em></span>
      </div>
      <p class="finding-line"><i></i><b>FND-0141</b><span data-i18n="fLine">Unowned service account reaches production, three hops past the policy boundary.</span></p>
    </div>
  </section>

  <div class="catgrid" data-rv>
    <div class="cat" style="--hd:.05s">
      <div class="cat-h"><span class="hc-ic" style="background:var(--acc-w);color:var(--acc)"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9.5h17M9 3.5v17" stroke="currentColor" stroke-width="1.6"/></svg></span><h3 data-i18n="c1T">Infrastructure and config</h3></div>
      <div class="cat-chips"><span>CHECKOV &middot; APACHE 2.0</span><span>KICS &middot; APACHE 2.0</span></div>
      <div class="kv"><span class="k" data-i18n="c1k1">Policies checked</span><span class="v">1,000+</span></div>
      <div class="kv"><span class="k" data-i18n="c1k2">Formats covered</span><span class="v">Terraform, CFN, K8s, ARM, Docker</span></div>
      <div class="kv"><span class="k" data-i18n="c1k3">Frameworks mapped</span><span class="v">CIS, NIST 800-53, HIPAA, SOC 2</span></div>
    </div>
    <div class="cat" style="--hd:.15s">
      <div class="cat-h"><span class="hc-ic" style="background:var(--green-w);color:var(--green)"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 20 7v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V7l8-3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m9 12 2.2 2.2L15.5 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3 data-i18n="c2T">Live runtime posture</h3></div>
      <div class="cat-chips"><span>PROWLER &middot; APACHE 2.0</span><span>KUBESCAPE &middot; CNCF</span></div>
      <div class="kv"><span class="k" data-i18n="c2k1">Scope</span><span class="v">AWS, Azure, GCP + K8s</span></div>
      <div class="kv"><span class="k" data-i18n="c2k2">Detects</span><span class="v" data-i18n="c2v2">Drift from declared IaC</span></div>
      <div class="kv"><span class="k" data-i18n="c2k3">Cadence</span><span class="v" data-i18n="c2v3">Continuous, in-cluster</span></div>
    </div>
    <div class="cat" style="--hd:.25s">
      <div class="cat-h"><span class="hc-ic" style="background:var(--amber-w);color:var(--amber)"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v3.2M12 17.8V21M21 12h-3.2M6.2 12H3M18.4 5.6l-2.3 2.3M8 15.8l-2.3 2.3M18.4 18.4l-2.3-2.3M8 8.2 5.7 5.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><h3 data-i18n="c3T">AI and model inventory</h3></div>
      <div class="cat-chips"><span>AI-BOM &middot; OPEN SOURCE</span><span>MLFLOW &middot; APACHE 2.0</span></div>
      <div class="kv"><span class="k" data-i18n="c3k1">Finds</span><span class="v" data-i18n="c3v1">LLM calls, agents, MCP servers</span></div>
      <div class="kv"><span class="k" data-i18n="c3k2">Output</span><span class="v">CycloneDX SBOM, SARIF</span></div>
      <div class="kv"><span class="k" data-i18n="c3k3">Built for</span><span class="v" data-i18n="c3v3">EU AI Act Art. 53 inventory</span></div>
    </div>
    <div class="cat" style="--hd:.35s">
      <div class="cat-h"><span class="hc-ic" style="background:var(--sky-w);color:var(--sky)"><svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="7" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M7.9 8.6 10.6 15.8M16.1 8.6 13.4 15.8M8.4 7h7.2" stroke="currentColor" stroke-width="1.6"/></svg></span><h3 data-i18n="c4T">Relationships and identity</h3></div>
      <div class="cat-chips"><span>OPENCSPM &middot; OPEN SOURCE</span></div>
      <div class="kv"><span class="k" data-i18n="c4k1">Model</span><span class="v" data-i18n="c4v1">Graph, not a flat table</span></div>
      <div class="kv"><span class="k" data-i18n="c4k2">Answers</span><span class="v" data-i18n="c4v2">Who can reach what, and how</span></div>
      <div class="kv"><span class="k" data-i18n="c4k3">Feeds</span><span class="v" data-i18n="c4v3">The triangulation engine directly</span></div>
    </div>
  </div>

  <div class="corr" data-rv>
    <h2 data-i18n="corrT">Correlation: no single signal proves a system exists</h2>
    <div class="chain">
      <span class="chip" style="transition-delay:.05s" data-i18n="ch1">API traffic</span><span class="plus">+</span>
      <span class="chip" style="transition-delay:.18s" data-i18n="ch2">Service account, no owner</span><span class="plus">+</span>
      <span class="chip" style="transition-delay:.31s" data-i18n="ch3">CI/CD deploy</span><span class="arrow">&rarr;</span>
      <span class="chip out" style="transition-delay:.46s" data-i18n="ch4">1 strong finding</span>
    </div>
    <div class="boundary"><span>
      <b data-i18n="bLbl">Scope boundary:</b> <span data-i18n="bBody">mainstream cloud (AWS, Azure, GCP) and Kubernetes are fully supported today.
      Fully private, non-cloud infrastructure is a later-phase expansion, not part of the current build.
      Every tool call goes through our own wrapper, a result always lands as</span> <code>OBSERVED</code><span data-i18n="bBody2">, never stronger. Only a named person can confirm it.</span>
    </span></div>
  </div>
</div>

<footer class="pfoot"><div class="pfoot-in"><span>TAHARA AI &middot; CONTINUOUS ASSURANCE PLATFORM</span><span>SAFE &middot; ETHICAL &middot; TRANSPARENT</span></div></footer>

<div style="position:fixed;left:14px;bottom:14px;z-index:99;display:flex;gap:6px;background:#0B1830;padding:8px;border-radius:10px" id="devsw">
  <button onclick="document.getElementById('dvx').setAttribute('data-theme', document.getElementById('dvx').getAttribute('data-theme')==='dark'?'light':'dark')" style="font:11px monospace;color:#9DB4E0;background:#152645;border:1px solid #24406e;border-radius:6px;padding:5px 9px;cursor:pointer">toggle theme (dev)</button>
</div>

</div>
`;

export default function DiscoveryPage() {
  useEffect(() => {
    const dispose = run("discovery");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
