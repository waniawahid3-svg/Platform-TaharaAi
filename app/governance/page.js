"use client";

/* Governance - /governance */

import { useEffect } from "react";
import "../platform.css";
import { run } from "../platform-runtime-core";

const MARKUP = `
<div class="gvx">
      <div class="atmo" aria-hidden="true"><span class="aur a"></span><span class="aur b"></span></div>
      
      <nav class="nav">
        <div class="nav-in">
          <a class="brand" href="/overview">
            <img src="https://www.taharaai.com/logo.png" alt="" />
            <svg viewBox="0 0 48 44" fill="none" style="display:none"><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="brand-t"><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
          </a>
          <div class="links">
            <a data-i18n="nOverview" href="/overview">Overview</a>
            <a class="on" data-i18n="nGov" href="#">Governance</a>
            <a data-i18n="nFw" href="/framework">Frameworks</a>
            <a data-i18n="nDisc" href="/discovery">Discovery</a>
            <a data-i18n="nAdv" href="#">Adversarial</a>
            <a data-i18n="nGuard" href="/guardrails">Guardrails</a>
          </div>
          <div class="nav-r">
            <button class="theme-tg" id="themeTg" type="button" aria-label="Switch theme">
              <svg class="ic-moon" viewBox="0 0 24 24" fill="none"><path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
              <svg class="ic-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
            <div class="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">عربي</button>
            </div>
            <a class="out" data-i18n="signout" href="/">Sign out</a>
          </div>
        </div>
      </nav>
      
      <div class="wrap">
      
        
        <div class="steps" data-rv>
          <button type="button" class="step on" id="s1"><span class="n"><i>01</i></span><span data-i18n="step1">SCOPE PATH</span></button>
          <button type="button" class="step lock" id="s2"><span class="n"><i>02</i></span><span data-i18n="step2">FRAMEWORKS</span></button>
          <button type="button" class="step lock" id="s3"><span class="n"><i>03</i></span><span data-i18n="step3">LAUNCH</span></button>
        </div>
      
        
        <div class="panel on" id="p1">
          <p class="eyebrow" data-i18n="eye1">Step one</p>
          <h1 class="display" data-i18n="h1a">What are you being <em>held to?</em></h1>
          <p class="lede" data-i18n="lede1">
            Most companies are bound by more than one framework and don't know it.
            The master set resolves that in one pass: answer a question once, and it
            satisfies every framework that asks it.
          </p>
      
          <div class="picks">
            <button type="button" class="pick sel" id="dMaster">
              <div class="pk-body">
                <div class="pk-top">
                  <span class="sev g" data-i18n="recChip">RECOMMENDED</span>
                  <span class="pk-check"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.6 4.5L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                </div>
                <h3 data-i18n="mTitle">Master framework</h3>
                <p class="pd" data-i18n="mDesc">We assemble the full set that binds you, plus whatever your region requires. One assessment. One profile. Every framework satisfied from the same answers.</p>
                <div class="fwrow"><span>EU AI ACT</span><span>ISO/IEC 42001</span><span>ISO/IEC 23894</span><span>NIST AI RMF</span><span>+ REGIONAL</span></div>
              </div>
              <p class="pk-meta"><b>~40% FEWER QUESTIONS</b> · SHARED REQUIREMENTS ASKED ONCE</p>
            </button>
            <button type="button" class="pick" id="dSingle">
              <div class="pk-body">
                <div class="pk-top">
                  <span class="sev b" data-i18n="tgtChip">TARGETED</span>
                  <span class="pk-check"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.6 4.5L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                </div>
                <h3 data-i18n="sTitle">Specific framework</h3>
                <p class="pd" data-i18n="sDesc">You already know what you are certifying against, or a regulator has named it. Select one standard and we scope to that alone.</p>
              </div>
              <p class="pk-meta">REGIONAL STANDARDS ONBOARDED ON REQUEST · TURNAROUND: <b>5 WORKING DAYS</b></p>
            </button>
          </div>
      
          <div class="actrow">
            <button class="btn pri" id="contBtn" data-i18n="contCta">Continue →</button>
          </div>
        </div>
      
        
        <div class="panel" id="p2">
          <p class="eyebrow" data-i18n="eye2">Step two</p>
          <h1 class="display" id="scopeTitle" data-i18n="h2m">Scope the <em>master set.</em></h1>
          <p class="lede" id="scopeLede" data-i18n="lede2m">
            Select the regions you operate in and the standards you are held to.
            We resolve the union and remove the overlap. The core set is pre-loaded.
          </p>
      
          <div class="split">
            <div>
              <div class="tabs">
                <button class="tab on" id="tabIntl" data-i18n="tabIntl">International</button>
                <button class="tab" id="tabReg" data-i18n="tabReg">Regional</button>
              </div>
      
              <div id="tIntl">
                <div class="grp-h" data-i18n="gLaw">Binding law</div>
                <div class="fw" data-fw="EU AI ACT" data-q="34" data-grp="intl">
                  <span class="box"></span><span class="flag">🇪🇺</span>
                  <span class="body"><span class="nm">EU AI Act · Regulation (EU) 2024/1689 <a class="peek" href="/framework?fw=eu-ai-act">VIEW CONTROLS →</a></span><span class="ds">113 provisions. Risk-tiered. Binds you if your output is used in the Union.</span></span>
                  <span class="chip law">LAW</span>
                </div>
                <div class="fw" data-fw="COLORADO AI ACT" data-q="14" data-grp="intl">
                  <span class="box"></span><span class="flag">🇺🇸</span>
                  <span class="body"><span class="nm">Colorado AI Act (SB 24-205)</span><span class="ds">Algorithmic discrimination in consequential decisions. Duty of reasonable care.</span></span>
                  <span class="chip law">LAW</span>
                </div>
      
                <div class="grp-h" data-i18n="gCert">Certifiable standards</div>
                <div class="fw" data-fw="ISO/IEC 42001" data-q="38" data-grp="intl">
                  <span class="box"></span><span class="flag">🌐</span>
                  <span class="body"><span class="nm">ISO/IEC 42001:2023 · AI Management System <a class="peek" href="/framework?fw=iso-42001">VIEW CONTROLS →</a></span><span class="ds">Clauses 4–10 + Annex A (38 controls). The certifiable AIMS. SoA required.</span></span>
                  <span class="chip cert">CERTIFIABLE</span>
                </div>
                <div class="fw" data-fw="ISO/IEC 27001" data-q="30" data-grp="intl">
                  <span class="box"></span><span class="flag">🌐</span>
                  <span class="body"><span class="nm">ISO/IEC 27001:2022 · Information Security</span><span class="ds">Often a prerequisite. Shares ~30% of its Annex A with 42001.</span></span>
                  <span class="chip cert">CERTIFIABLE</span>
                </div>
      
                <div class="grp-h" data-i18n="gGuide">Guidance &amp; risk frameworks</div>
                <div class="fw" data-fw="ISO/IEC 23894" data-q="18" data-grp="intl">
                  <span class="box"></span><span class="flag">🌐</span>
                  <span class="body"><span class="nm">ISO/IEC 23894:2023 · AI Risk Management</span><span class="ds">The risk process that ISO 42001 Clause 6.1.2 points at.</span></span>
                  <span class="chip guide">GUIDANCE</span>
                </div>
                <div class="fw" data-fw="NIST AI RMF" data-q="24" data-grp="intl">
                  <span class="box"></span><span class="flag">🇺🇸</span>
                  <span class="body"><span class="nm">NIST AI RMF 1.0 <a class="peek" href="/framework?fw=nist-ai-rmf">VIEW CONTROLS →</a></span><span class="ds">Govern · Map · Measure · Manage. Voluntary, but the de-facto US baseline.</span></span>
                  <span class="chip guide">GUIDANCE</span>
                </div>
                <div class="fw" data-fw="ISO/IEC 42005" data-q="12" data-grp="intl">
                  <span class="box"></span><span class="flag">🌐</span>
                  <span class="body"><span class="nm">ISO/IEC 42005 · AI System Impact Assessment</span><span class="ds">The impact assessment ISO 42001 Clause 6.1.4 requires.</span></span>
                  <span class="chip guide">GUIDANCE</span>
                </div>
                <div class="fw" data-fw="OECD AI PRINCIPLES" data-q="10" data-grp="intl">
                  <span class="box"></span><span class="flag">🌐</span>
                  <span class="body"><span class="nm">OECD AI Principles</span><span class="ds">The ancestor of most national AI strategies. Referenced by Gulf regulators.</span></span>
                  <span class="chip guide">GUIDANCE</span>
                </div>
              </div>
      
              <div id="tReg" style="display:none">
                <div class="grp-h" data-i18n="gGcc">Gulf Cooperation Council</div>
                <div class="fw req" data-fw="UAE · AI ETHICS" data-q="12"><span class="box"></span><span class="flag">🇦🇪</span><span class="body"><span class="nm">UAE · AI Ethics Principles &amp; Guidelines</span><span class="ds">Federal. Plus DIFC DP Regulation Art. 10 and ADGM.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="KSA · SDAIA" data-q="12"><span class="box"></span><span class="flag">🇸🇦</span><span class="body"><span class="nm">Saudi Arabia · SDAIA AI Ethics Principles</span><span class="ds">Plus PDPL and NDMO. SAMA applies additionally in financial services.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="QATAR · NATIONAL AI" data-q="10"><span class="box"></span><span class="flag">🇶🇦</span><span class="body"><span class="nm">Qatar · National AI Strategy &amp; Guidelines</span><span class="ds">Plus Law No. 13 of 2016 on personal data privacy.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="BAHRAIN · PDPL" data-q="9"><span class="box"></span><span class="flag">🇧🇭</span><span class="body"><span class="nm">Bahrain · PDPL &amp; National AI guidance</span><span class="ds">Personal Data Protection Law (2018) plus emerging AI guidance.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="KUWAIT · CITRA" data-q="9"><span class="box"></span><span class="flag">🇰🇼</span><span class="body"><span class="nm">Kuwait · CITRA Data Privacy Regulation</span><span class="ds">Plus the national AI strategy.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="OMAN · PDPL" data-q="9"><span class="box"></span><span class="flag">🇴🇲</span><span class="body"><span class="nm">Oman · Personal Data Protection Law</span><span class="ds">Royal Decree 6/2022, plus the national digital strategy.</span></span><span class="chip req">ON REQUEST</span></div>
      
                <div class="grp-h" data-i18n="gLev">Levant, North Africa &amp; South Asia</div>
                <div class="fw req" data-fw="PAKISTAN · AI POLICY" data-q="11"><span class="box"></span><span class="flag">🇵🇰</span><span class="body"><span class="nm">Pakistan · National AI Policy &amp; PDPB</span><span class="ds">MoITT National AI Policy, plus the PDPB and PECA.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="EGYPT · AI CHARTER" data-q="10"><span class="box"></span><span class="flag">🇪🇬</span><span class="body"><span class="nm">Egypt · National AI Strategy &amp; Charter</span><span class="ds">Plus Law No. 151 of 2020 on personal data protection.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="JORDAN · AI POLICY" data-q="9"><span class="box"></span><span class="flag">🇯🇴</span><span class="body"><span class="nm">Jordan · AI Policy &amp; PDPL</span><span class="ds">National AI policy (2023) plus PDPL (2023).</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="MOROCCO · CNDP" data-q="9"><span class="box"></span><span class="flag">🇲🇦</span><span class="body"><span class="nm">Morocco · Law 09-08 &amp; CNDP guidance</span><span class="ds">Data protection, plus the Digital Morocco 2030 AI track.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="TÜRKİYE · KVKK" data-q="10"><span class="box"></span><span class="flag">🇹🇷</span><span class="body"><span class="nm">Türkiye · National AI Strategy &amp; KVKK</span><span class="ds">Plus the KVKK and draft AI legislation.</span></span><span class="chip req">ON REQUEST</span></div>
      
                <div class="grp-h" data-i18n="gSec">Sector overlays</div>
                <div class="fw req" data-fw="SAMA" data-q="11"><span class="box"></span><span class="flag">🏦</span><span class="body"><span class="nm">SAMA · Saudi Central Bank</span><span class="ds">Cybersecurity and IT governance frameworks. Binds AI in KSA financial services.</span></span><span class="chip req">ON REQUEST</span></div>
                <div class="fw req" data-fw="DOH ABU DHABI" data-q="10"><span class="box"></span><span class="flag">🏥</span><span class="body"><span class="nm">DoH Abu Dhabi · Healthcare AI standards</span><span class="ds">Department of Health policy for AI in clinical settings.</span></span><span class="chip req">ON REQUEST</span></div>
              </div>
            </div>
      
            
            <aside class="rail">
              <div class="plate">
                <div class="plate-h"><h3 style="display:flex;align-items:center"><span class="live"></span><span data-i18n="dashT">SCOPE INTELLIGENCE</span></h3><span class="sev g" id="fwCount">0</span></div>
                <div class="plate-b">
                  <div class="donut-w">
                    <div class="donut">
                      <svg viewBox="0 0 96 96" width="96" height="96">
                        <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stop-color="#2F6FD8"/><stop offset="1" stop-color="#69A5FF"/>
                        </linearGradient></defs>
                        <circle class="trk" cx="48" cy="48" r="42"/>
                        <circle class="val" id="donutVal" cx="48" cy="48" r="42"/>
                      </svg>
                      <div class="dc"><span class="dn" id="donutN">0%</span><span class="dl" data-i18n="dnl">OVERLAP SAVED</span></div>
                    </div>
                    <div class="dstats">
                      <div class="dstat"><p class="k" data-i18n="dq">EST. QUESTIONS</p><p class="v"><span id="qN">0</span> <i id="qRaw"></i></p></div>
                      <div class="dstat"><p class="k" data-i18n="dt">EST. TIME</p><p class="v"><span id="tN">0</span> <i data-i18n="dmin">MIN</i></p></div>
                    </div>
                  </div>
                  <div class="sav">
                    <p class="k"><span data-i18n="dsv">QUESTIONS REMOVED BY OVERLAP</span><b id="savPct">0%</b></p>
                    <div class="savbar"><i id="savBar"></i></div>
                  </div>
                </div>
              </div>
      
              <div class="plate">
                <div class="plate-h"><h3 data-i18n="selT">SELECTED</h3></div>
                <div class="plate-b">
                  <div class="bk" id="basket"><p class="empty" data-i18n="bkEmpty">Nothing selected yet. The master set pre-loads the international core. Add your regions.</p></div>
                </div>
              </div>
      
              <div class="plate">
                <div class="plate-b" style="padding:14px 18px">
                  <div class="reqwrap" id="reqWrap"><div class="reqin">
                    <p data-i18n="reqP">Regional frameworks are onboarded per request. We build the control library and map it into the master set. Leave a work email.</p>
                    <input type="email" id="reqEm" placeholder="you@company.com" dir="ltr" />
                    <button class="btn pri" id="reqBtn" data-i18n="reqCta">Request onboarding</button>
                  </div></div>
                  <div class="verwrap" id="verWrap"><div class="reqin">
                    <p data-i18n="verP">A specific-framework assessment is issued to a named organisation. Verify a work email to continue.</p>
                    <input type="email" id="verEm" placeholder="you@company.com" dir="ltr" />
                    <button class="btn pri" id="verBtn" data-i18n="verCta">Verify email</button>
                  </div></div>
                  <button class="btn pri cta-out" id="goBtn" style="width:100%;justify-content:center" aria-disabled="true" data-i18n="beginCta">Begin assessment →</button>
                  <p class="gohelp" id="goHelp" style="display:none" data-i18n="goHelp">Verify a work email above to begin.</p>
                </div>
              </div>
              <button class="back" id="back1" data-i18n="back1">← Change path</button>
            </aside>
          </div>
        </div>
      
        
        <div class="panel" id="pReach">
          <div class="plate center-plate wiz" id="reachPlate">
            <div class="medal"><span class="halo hb"></span><span class="halo hr"></span><span class="rip"></span><span class="rip r2"></span><span class="disc"><svg class="ic-wait" viewBox="0 0 24 24" fill="none"><rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="m4.6 7.4 7.4 5.4 7.4-5.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="ic-check" viewBox="0 0 24 24" fill="none"><path d="m5.4 12.6 4.4 4.4L18.8 6.8" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
            <div id="rfForm">
              <h1 class="display" style="font-size:26px" data-i18n="reachT">A specific framework, scoped with you.</h1>
              <p class="lede wiz-lede" style="font-size:13.5px" data-i18n="reachP">Regional and named standards are onboarded per organisation. Leave a work email and our team scopes it with you.</p>
              <div class="reachrow"><input type="email" id="reachEm" placeholder="you@company.com" dir="ltr"><button class="btn pri" id="reachBtn" data-i18n="reachCta">Request scoping →</button></div>
              <div class="wiz-actions"><button class="btn" id="reachBack" data-i18n="reachBack">← Change path</button></div>
            </div>
            <div id="rfDone" style="display:none">
              <h1 class="display" style="font-size:26px" data-i18n="reachDT">We will get back to you.</h1>
              <p class="lede wiz-lede" style="font-size:13.5px"><span data-i18n="reachDP1">Your request is with the team. Expect a reply at</span> <b id="reachEmOut" class="emchip"></b> <span data-i18n="reachDP2">within five working days.</span></p>
              <div class="wiz-actions">
                <button class="btn" id="reachBack2" data-i18n="reachBack2">← Back to start</button>
                <button class="btn pri" id="reachMaster" data-i18n="reachMaster">Use the master framework →</button>
              </div>
            </div>
          </div>
        </div>
      
        
        <div class="panel" id="pSent">
          <div class="plate center-plate wiz">
            <div class="medal"><span class="halo hb"></span><span class="halo hr"></span><span class="rip"></span><span class="rip r2"></span><span class="disc"><svg viewBox="0 0 24 24" fill="none"><path d="M6 4.5h12l2.5 8.5v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-5L6 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.5 13h4.6l1.7 2.6h4.4l1.7-2.6h4.6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span></div>
            <h1 class="display" style="font-size:26px" data-i18n="sentT">Request received.</h1>
            <p class="lede wiz-lede" style="font-size:13.5px"><span data-i18n="sentP1">We are building the control library for</span> <b id="sentFw" class="fwchip"></b> <span data-i18n="sentP2">and mapping it into the master set.</span></p>
            <p class="wiz-fine"><span data-i18n="sentP3">We will email</span> <b id="sentEm" class="emchip"></b> <span data-i18n="sentP4">when it is live. Typical turnaround: five working days.</span></p>
            <div class="wiz-actions">
              <button class="btn" id="backFw" data-i18n="backFw">← Back to frameworks</button>
              <button class="btn pri" id="contIntl" data-i18n="contIntl">Continue with current set →</button>
            </div>
          </div>
        </div>
      
        
        <div class="panel" id="pVerify">
          <div class="plate center-plate wiz pend" id="verPlate">
            <div class="medal"><span class="halo hb"></span><span class="halo hr"></span><span class="rip"></span><span class="rip r2"></span><span class="disc"><svg class="ic-wait" viewBox="0 0 24 24" fill="none"><rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="m4.6 7.4 7.4 5.4 7.4-5.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><svg class="ic-check" viewBox="0 0 24 24" fill="none"><path d="m5.4 12.6 4.4 4.4L18.8 6.8" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
            <h1 class="display" style="font-size:26px" id="verHeadline" data-i18n="verHeadPending">Verifying your email.</h1>
            <p class="lede wiz-lede" style="font-size:13.5px" id="verSub" data-i18n="verSubPending">We sent a confirmation link to <b id="verEmOut" class="emchip"></b>. This assessment starts once it is verified.</p>
            <p class="wiz-fine" id="verFine" data-i18n="verFinePending">Usually a few seconds in this demo. In production, this waits for the actual click.</p>
            <div class="wiz-actions">
              <button class="btn" id="verBack" data-i18n="verBack">← Back to frameworks</button>
              <button class="btn pri" id="verCont" style="display:none" data-i18n="verContCta">Continue to assessment →</button>
            </div>
          </div>
        </div>
      
        
        <div class="panel" id="p3">
          <div class="plate center-plate wiz">
            <div class="medal"><span class="halo hb"></span><span class="halo hr"></span><span class="rip"></span><span class="rip r2"></span><span class="disc"><svg viewBox="0 0 24 24" fill="none"><path d="M20.2 12.7a2.9 2.9 0 0 1-2.9 2.9h-6l-4.4 3.9v-3.9H5.7a2.9 2.9 0 0 1-2.9-2.9V6.9A2.9 2.9 0 0 1 5.7 4h11.6a2.9 2.9 0 0 1 2.9 2.9v5.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="9.9" r="1.15" fill="currentColor"/><circle cx="12" cy="9.9" r="1.15" fill="currentColor"/><circle cx="16" cy="9.9" r="1.15" fill="currentColor"/></svg></span></div>
            <p class="eyebrow" style="justify-content:center" id="launchEye" data-i18n="launchEye">Master framework · scoped</p>
            <h1 class="display" style="font-size:30px" data-i18n="launchT">Ready when you are.</h1>
            <p class="lede wiz-lede" data-i18n="launchP">
              Upload what you have. Answer what we ask. The auditor does the rest,
              and it will notice when your answers don't match your system.
            </p>
            <div class="scopechips" id="scopeChips"></div>
            <div class="launch-stats">
              <div><p class="v" id="lsFw">0</p><p class="k" data-i18n="lsFw">FRAMEWORKS</p></div>
              <div><p class="v" id="lsQ">0</p><p class="k" data-i18n="lsQ">QUESTIONS</p></div>
              <div><p class="v" id="lsT">0</p><p class="k" data-i18n="lsT">MINUTES</p></div>
            </div>
            <div class="wiz-actions">
              <button class="btn" id="back2" data-i18n="back2">← Adjust scope</button>
              <a class="btn pri cta-out" href="#" data-i18n="startCta">Start the interview →</a>
            </div>
          </div>
        </div>
      
        <footer class="foot">
          <span>TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
          <span>SAFE · ETHICAL · TRANSPARENT</span>
        </footer>
      </div>
    </div>
`;

export default function GovernancePage() {
  useEffect(() => {
    const dispose = run("governance");
    return () => { if (typeof dispose === "function") dispose(); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
