"use client";

import { useEffect } from "react";
import { initGovernance } from "./governance-runtime";

export default function GovernancePage(){
  useEffect(() => {
    const dispose = initGovernance();
    return dispose;
  }, []);

  return (
    <div className="gvx">
      <div className="atmo" aria-hidden="true"><span className="aur a"></span><span className="aur b"></span><div className="grid"></div></div>
      
      <nav className="nav">
        <div className="nav-in">
          <a className="brand" href="/overview">
            <img src="https://www.taharaai.com/logo.png" alt="" />
            <svg viewBox="0 0 48 44" fill="none" style={{display:"none"}}><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="brand-t"><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
          </a>
          <div className="links">
            <a data-i18n="nOverview" href="/overview">Overview</a>
            <a className="on" data-i18n="nGov" href="#">Governance</a>
            <a data-i18n="nFw" href="/framework">Frameworks</a>
            <a data-i18n="nDisc" href="#">Discovery</a>
            <a data-i18n="nAdv" href="#">Adversarial</a>
            <a data-i18n="nGuard" href="#">Guardrails</a>
          </div>
          <div className="nav-r">
            <button className="theme-tg" id="themeTg" type="button" aria-label="Switch theme">
              <svg className="ic-moon" viewBox="0 0 24 24" fill="none"><path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              <svg className="ic-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">عربي</button>
            </div>
            <a className="out" data-i18n="signout" href="/">Sign out</a>
          </div>
        </div>
      </nav>
      
      <div className="wrap">
      
        {/* stepper */}
        <div className="steps" data-rv>
          <button type="button" className="step on" id="s1"><span className="n"><i>01</i></span><span data-i18n="step1">SCOPE PATH</span></button>
          <button type="button" className="step lock" id="s2"><span className="n"><i>02</i></span><span data-i18n="step2">FRAMEWORKS</span></button>
          <button type="button" className="step lock" id="s3"><span className="n"><i>03</i></span><span data-i18n="step3">LAUNCH</span></button>
        </div>
      
        {/* ═══ STEP 1 ═══ */}
        <div className="panel on" id="p1">
          <p className="eyebrow" data-i18n="eye1">Step one</p>
          <h1 className="display" data-i18n="h1a">What are you being <em>held to?</em></h1>
          <p className="lede" data-i18n="lede1">
            Most companies are bound by more than one framework and don't know it.
            The master set resolves that in one pass: answer a question once, and it
            satisfies every framework that asks it.
          </p>
      
          <div className="picks">
            <button type="button" className="pick sel" id="dMaster">
              <div className="pk-body">
                <div className="pk-top">
                  <span className="sev g" data-i18n="recChip">RECOMMENDED</span>
                  <span className="pk-check"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.6 4.5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </div>
                <h3 data-i18n="mTitle">Master framework</h3>
                <p className="pd" data-i18n="mDesc">We assemble the full set that binds you, plus whatever your region requires. One assessment. One profile. Every framework satisfied from the same answers.</p>
                <div className="fwrow"><span>EU AI ACT</span><span>ISO/IEC 42001</span><span>ISO/IEC 23894</span><span>NIST AI RMF</span><span>+ REGIONAL</span></div>
              </div>
              <p className="pk-meta"><b>~40% FEWER QUESTIONS</b> · SHARED REQUIREMENTS ASKED ONCE</p>
            </button>
            <button type="button" className="pick" id="dSingle">
              <div className="pk-body">
                <div className="pk-top">
                  <span className="sev b" data-i18n="tgtChip">TARGETED</span>
                  <span className="pk-check"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.6 4.5L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </div>
                <h3 data-i18n="sTitle">Specific framework</h3>
                <p className="pd" data-i18n="sDesc">You already know what you are certifying against, or a regulator has named it. Select one standard and we scope to that alone.</p>
              </div>
              <p className="pk-meta">REGIONAL STANDARDS ONBOARDED ON REQUEST · TURNAROUND: <b>5 WORKING DAYS</b></p>
            </button>
          </div>
      
          <div className="actrow">
            <button className="btn pri" id="contBtn" data-i18n="contCta">Continue →</button>
          </div>
        </div>
      
        {/* ═══ STEP 2 ═══ */}
        <div className="panel" id="p2">
          <p className="eyebrow" data-i18n="eye2">Step two</p>
          <h1 className="display" id="scopeTitle" data-i18n="h2m">Scope the <em>master set.</em></h1>
          <p className="lede" id="scopeLede" data-i18n="lede2m">
            Select the regions you operate in and the standards you are held to.
            We resolve the union and remove the overlap. The core set is pre-loaded.
          </p>
      
          <div className="split">
            <div>
              <div className="tabs">
                <button className="tab on" id="tabIntl" data-i18n="tabIntl">International</button>
                <button className="tab" id="tabReg" data-i18n="tabReg">Regional</button>
              </div>
      
              <div id="tIntl">
                <div className="grp-h" data-i18n="gLaw">Binding law</div>
                <div className="fw" data-fw="EU AI ACT" data-q="34" data-grp="intl">
                  <span className="box"></span><span className="flag">🇪🇺</span>
                  <span className="body"><span className="nm">EU AI Act · Regulation (EU) 2024/1689 <a className="peek" href="/framework?fw=eu-ai-act">VIEW CONTROLS →</a></span><span className="ds">113 provisions. Risk-tiered. Binds you if your output is used in the Union.</span></span>
                  <span className="chip law">LAW</span>
                </div>
                <div className="fw" data-fw="COLORADO AI ACT" data-q="14" data-grp="intl">
                  <span className="box"></span><span className="flag">🇺🇸</span>
                  <span className="body"><span className="nm">Colorado AI Act (SB 24-205)</span><span className="ds">Algorithmic discrimination in consequential decisions. Duty of reasonable care.</span></span>
                  <span className="chip law">LAW</span>
                </div>
      
                <div className="grp-h" data-i18n="gCert">Certifiable standards</div>
                <div className="fw" data-fw="ISO/IEC 42001" data-q="38" data-grp="intl">
                  <span className="box"></span><span className="flag">🌐</span>
                  <span className="body"><span className="nm">ISO/IEC 42001:2023 · AI Management System <a className="peek" href="/framework?fw=iso-42001">VIEW CONTROLS →</a></span><span className="ds">Clauses 4–10 + Annex A (38 controls). The certifiable AIMS. SoA required.</span></span>
                  <span className="chip cert">CERTIFIABLE</span>
                </div>
                <div className="fw" data-fw="ISO/IEC 27001" data-q="30" data-grp="intl">
                  <span className="box"></span><span className="flag">🌐</span>
                  <span className="body"><span className="nm">ISO/IEC 27001:2022 · Information Security</span><span className="ds">Often a prerequisite. Shares ~30% of its Annex A with 42001.</span></span>
                  <span className="chip cert">CERTIFIABLE</span>
                </div>
      
                <div className="grp-h" data-i18n="gGuide">Guidance &amp; risk frameworks</div>
                <div className="fw" data-fw="ISO/IEC 23894" data-q="18" data-grp="intl">
                  <span className="box"></span><span className="flag">🌐</span>
                  <span className="body"><span className="nm">ISO/IEC 23894:2023 · AI Risk Management</span><span className="ds">The risk process that ISO 42001 Clause 6.1.2 points at.</span></span>
                  <span className="chip guide">GUIDANCE</span>
                </div>
                <div className="fw" data-fw="NIST AI RMF" data-q="24" data-grp="intl">
                  <span className="box"></span><span className="flag">🇺🇸</span>
                  <span className="body"><span className="nm">NIST AI RMF 1.0 <a className="peek" href="/framework?fw=nist-ai-rmf">VIEW CONTROLS →</a></span><span className="ds">Govern · Map · Measure · Manage. Voluntary, but the de-facto US baseline.</span></span>
                  <span className="chip guide">GUIDANCE</span>
                </div>
                <div className="fw" data-fw="ISO/IEC 42005" data-q="12" data-grp="intl">
                  <span className="box"></span><span className="flag">🌐</span>
                  <span className="body"><span className="nm">ISO/IEC 42005 · AI System Impact Assessment</span><span className="ds">The impact assessment ISO 42001 Clause 6.1.4 requires.</span></span>
                  <span className="chip guide">GUIDANCE</span>
                </div>
                <div className="fw" data-fw="OECD AI PRINCIPLES" data-q="10" data-grp="intl">
                  <span className="box"></span><span className="flag">🌐</span>
                  <span className="body"><span className="nm">OECD AI Principles</span><span className="ds">The ancestor of most national AI strategies. Referenced by Gulf regulators.</span></span>
                  <span className="chip guide">GUIDANCE</span>
                </div>
              </div>
      
              <div id="tReg" style={{display:"none"}}>
                <div className="grp-h" data-i18n="gGcc">Gulf Cooperation Council</div>
                <div className="fw req" data-fw="UAE · AI ETHICS" data-q="12"><span className="box"></span><span className="flag">🇦🇪</span><span className="body"><span className="nm">UAE · AI Ethics Principles &amp; Guidelines</span><span className="ds">Federal. Plus DIFC DP Regulation Art. 10 and ADGM.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="KSA · SDAIA" data-q="12"><span className="box"></span><span className="flag">🇸🇦</span><span className="body"><span className="nm">Saudi Arabia · SDAIA AI Ethics Principles</span><span className="ds">Plus PDPL and NDMO. SAMA applies additionally in financial services.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="QATAR · NATIONAL AI" data-q="10"><span className="box"></span><span className="flag">🇶🇦</span><span className="body"><span className="nm">Qatar · National AI Strategy &amp; Guidelines</span><span className="ds">Plus Law No. 13 of 2016 on personal data privacy.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="BAHRAIN · PDPL" data-q="9"><span className="box"></span><span className="flag">🇧🇭</span><span className="body"><span className="nm">Bahrain · PDPL &amp; National AI guidance</span><span className="ds">Personal Data Protection Law (2018) plus emerging AI guidance.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="KUWAIT · CITRA" data-q="9"><span className="box"></span><span className="flag">🇰🇼</span><span className="body"><span className="nm">Kuwait · CITRA Data Privacy Regulation</span><span className="ds">Plus the national AI strategy.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="OMAN · PDPL" data-q="9"><span className="box"></span><span className="flag">🇴🇲</span><span className="body"><span className="nm">Oman · Personal Data Protection Law</span><span className="ds">Royal Decree 6/2022, plus the national digital strategy.</span></span><span className="chip req">ON REQUEST</span></div>
      
                <div className="grp-h" data-i18n="gLev">Levant, North Africa &amp; South Asia</div>
                <div className="fw req" data-fw="PAKISTAN · AI POLICY" data-q="11"><span className="box"></span><span className="flag">🇵🇰</span><span className="body"><span className="nm">Pakistan · National AI Policy &amp; PDPB</span><span className="ds">MoITT National AI Policy, plus the PDPB and PECA.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="EGYPT · AI CHARTER" data-q="10"><span className="box"></span><span className="flag">🇪🇬</span><span className="body"><span className="nm">Egypt · National AI Strategy &amp; Charter</span><span className="ds">Plus Law No. 151 of 2020 on personal data protection.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="JORDAN · AI POLICY" data-q="9"><span className="box"></span><span className="flag">🇯🇴</span><span className="body"><span className="nm">Jordan · AI Policy &amp; PDPL</span><span className="ds">National AI policy (2023) plus PDPL (2023).</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="MOROCCO · CNDP" data-q="9"><span className="box"></span><span className="flag">🇲🇦</span><span className="body"><span className="nm">Morocco · Law 09-08 &amp; CNDP guidance</span><span className="ds">Data protection, plus the Digital Morocco 2030 AI track.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="TÜRKİYE · KVKK" data-q="10"><span className="box"></span><span className="flag">🇹🇷</span><span className="body"><span className="nm">Türkiye · National AI Strategy &amp; KVKK</span><span className="ds">Plus the KVKK and draft AI legislation.</span></span><span className="chip req">ON REQUEST</span></div>
      
                <div className="grp-h" data-i18n="gSec">Sector overlays</div>
                <div className="fw req" data-fw="SAMA" data-q="11"><span className="box"></span><span className="flag">🏦</span><span className="body"><span className="nm">SAMA · Saudi Central Bank</span><span className="ds">Cybersecurity and IT governance frameworks. Binds AI in KSA financial services.</span></span><span className="chip req">ON REQUEST</span></div>
                <div className="fw req" data-fw="DOH ABU DHABI" data-q="10"><span className="box"></span><span className="flag">🏥</span><span className="body"><span className="nm">DoH Abu Dhabi · Healthcare AI standards</span><span className="ds">Department of Health policy for AI in clinical settings.</span></span><span className="chip req">ON REQUEST</span></div>
              </div>
            </div>
      
            {/* ═══ THE SCOPING DASHBOARD ═══ */}
            <aside className="rail">
              <div className="plate">
                <div className="plate-h"><h3 style={{display:"flex",alignItems:"center"}}><span className="live"></span><span data-i18n="dashT">SCOPE INTELLIGENCE</span></h3><span className="sev g" id="fwCount">0</span></div>
                <div className="plate-b">
                  <div className="donut-w">
                    <div className="donut">
                      <svg viewBox="0 0 96 96" width="96" height="96">
                        <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#2F6FD8"/><stop offset="1" stopColor="#1F7A5C"/>
                        </linearGradient></defs>
                        <circle className="trk" cx="48" cy="48" r="42"/>
                        <circle className="val" id="donutVal" cx="48" cy="48" r="42"/>
                      </svg>
                      <div className="dc"><span className="dn" id="donutN">0%</span><span className="dl" data-i18n="dnl">OVERLAP SAVED</span></div>
                    </div>
                    <div className="dstats">
                      <div className="dstat"><p className="k" data-i18n="dq">EST. QUESTIONS</p><p className="v"><span id="qN">0</span> <i id="qRaw"></i></p></div>
                      <div className="dstat"><p className="k" data-i18n="dt">EST. TIME</p><p className="v"><span id="tN">0</span> <i data-i18n="dmin">MIN</i></p></div>
                    </div>
                  </div>
                  <div className="sav">
                    <p className="k"><span data-i18n="dsv">QUESTIONS REMOVED BY OVERLAP</span><b id="savPct">0%</b></p>
                    <div className="savbar"><i id="savBar"></i></div>
                  </div>
                </div>
              </div>
      
              <div className="plate">
                <div className="plate-h"><h3 data-i18n="selT">SELECTED</h3></div>
                <div className="plate-b">
                  <div className="bk" id="basket"><p className="empty" data-i18n="bkEmpty">Nothing selected yet. The master set pre-loads the international core. Add your regions.</p></div>
                </div>
              </div>
      
              <div className="plate">
                <div className="plate-b" style={{padding:"14px 18px"}}>
                  <div className="reqwrap" id="reqWrap"><div className="reqin">
                    <p data-i18n="reqP">Regional frameworks are onboarded per request. We build the control library and map it into the master set. Leave a work email.</p>
                    <input type="email" id="reqEm" placeholder="you@company.com" dir="ltr" />
                    <button className="btn pri" id="reqBtn" data-i18n="reqCta">Request onboarding</button>
                  </div></div>
                  <button className="btn pri cta-out" id="goBtn" style={{width:"100%",justifyContent:"center"}} aria-disabled="true" data-i18n="beginCta">Begin assessment →</button>
                </div>
              </div>
              <button className="back" id="back1" data-i18n="back1">← Change path</button>
            </aside>
          </div>
        </div>
      
        {/* ═══ SENT ═══ */}
        <div className="panel" id="pSent">
          <div className="plate center-plate">
            <div className="seal-w"><div id="sealSent"></div></div>
            <h1 className="display" style={{fontSize:"26px"}} data-i18n="sentT">Request received.</h1>
            <p className="lede" style={{margin:"0 auto 8px",fontSize:"13.5px"}}><span data-i18n="sentP1">We are building the control library for</span> <b id="sentFw" style={{color:"var(--acc)"}}></b> <span data-i18n="sentP2">and mapping it into the master set.</span></p>
            <p style={{fontSize:"12px",color:"var(--ink-40)",marginBottom:"28px"}}><span data-i18n="sentP3">We will email</span> <b id="sentEm" style={{fontFamily:"var(--font-mono)",color:"var(--ink-70)"}}></b> <span data-i18n="sentP4">when it is live. Typical turnaround: five working days.</span></p>
            <div style={{display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
              <button className="btn" id="backFw" data-i18n="backFw">← Back to frameworks</button>
              <button className="btn pri" id="contIntl" data-i18n="contIntl">Continue with current set →</button>
            </div>
          </div>
        </div>
      
        {/* ═══ STEP 3 ═══ */}
        <div className="panel" id="p3">
          <div className="plate center-plate">
            <div className="seal-w"><div id="sealGo"></div></div>
            <p className="eyebrow" style={{justifyContent:"center"}} id="launchEye" data-i18n="launchEye">Master framework · scoped</p>
            <h1 className="display" style={{fontSize:"30px"}} data-i18n="launchT">Ready when you are.</h1>
            <p className="lede" style={{margin:"0 auto"}} data-i18n="launchP">
              Upload what you have. Answer what we ask. The auditor does the rest,
              and it will notice when your answers don't match your system.
            </p>
            <div className="launch-stats">
              <div><p className="v" id="lsFw">0</p><p className="k" data-i18n="lsFw">FRAMEWORKS</p></div>
              <div><p className="v" id="lsQ">0</p><p className="k" data-i18n="lsQ">QUESTIONS</p></div>
              <div><p className="v" id="lsT">0</p><p className="k" data-i18n="lsT">MINUTES</p></div>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
              <button className="btn" id="back2" data-i18n="back2">← Adjust scope</button>
              <a className="btn pri cta-out" href="#" data-i18n="startCta">Start the interview →</a>
            </div>
          </div>
        </div>
      
        <footer className="foot">
          <span>TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
          <span>SAFE · ETHICAL · TRANSPARENT</span>
        </footer>
      </div>
    </div>
  );
}
