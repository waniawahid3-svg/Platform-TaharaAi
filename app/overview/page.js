"use client";

import { useEffect } from "react";
import { initOverview } from "./overview-runtime";

export default function OverviewPage(){
  useEffect(() => {
    const dispose = initOverview();
    return dispose;
  }, []);

  return (
    <div className="ovx">
      <div className="atmo" aria-hidden="true">
        <span className="aur a"></span><span className="aur b"></span>
        <div className="grid"></div>
      </div>
      
      {/* ═══ NAV ═══ */}
      <nav className="nav">
        <div className="nav-in">
          <a className="brand" href="#">
            <img src="https://www.taharaai.com/logo.png" alt="" />
            <svg viewBox="0 0 48 44" fill="none" style={{display:"none"}}><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="brand-t"><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
          </a>
          <div className="links">
            <a className="on" data-i18n="nOverview" href="#">Overview</a>
            <a data-i18n="nGov" href="/governance">Governance</a>
            <a data-i18n="nDisc" href="#">Discovery</a>
            <a data-i18n="nAdv" href="#">Adversarial</a>
            <a data-i18n="nGuard" href="#">Guardrails</a>
          </div>
          <div className="nav-r">
            <button className="theme-tg" id="themeTg" type="button" aria-label="Switch theme" title="Theme">
              <svg className="ic-moon" viewBox="0 0 24 24" fill="none"><path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
              <svg className="ic-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">عربي</button>
            </div>
            <a className="cta-sm" data-i18n="ctaSm" href="#">Start assessment</a>
            <a className="out" data-i18n="signout" href="/">Sign out</a>
          </div>
        </div>
      </nav>
      
      {/* ═══ HERO ═══ */}
      <div className="wrap">
        <header className="hero">
          <div>
            <p className="eyebrow" data-rv style={{transitionDelay:".02s"}} data-i18n="eyeHero">Continuous AI assurance</p>
            <h1 className="display" data-rv style={{transitionDelay:".1s"}} data-i18n="display">Trust is not declared.<br />It is <em>demonstrated.</em></h1>
            <p className="lede" data-rv>
              We map your system against the frameworks that bind it, then keep watching.
              The day a control stops operating, you find out. Not the auditor.
            </p>
            <div className="cta-row" data-rv style={{transitionDelay:".26s"}}>
              <a className="btn pri" data-i18n="cta1" href="#">Start an assessment →</a>
              <a className="btn" data-i18n="cta2" href="#how">See how it works</a>
            </div>
            <div className="fw-chips" data-rv style={{transitionDelay:".32s"}}>
              <span>EU AI Act</span><span>ISO/IEC 42001</span><span>ISO/IEC 23894</span><span>NIST AI RMF</span><span>+ Regional</span>
            </div>
          </div>
          <div className="hero-seal" data-rv style={{transitionDelay:".15s"}}>
            <div id="seal"></div>
          </div>
        </header>
      </div>
      
      {/* ═══ LIVE TAPE ═══ */}
      <section className="tape" aria-label="Live findings">
        <div className="tape-in" id="tape"></div>
      </section>
      
      <div className="wrap">
      
        {/* ═══ HOW IT WORKS ═══ */}
        <section className="sec" id="how">
          <p className="eyebrow" data-rv data-i18n="eyeHow">How it works</p>
          <h2 data-rv data-i18n="h2How">Four movements. One continuous loop.</h2>
          <div className="flow">
            <div className="flow-s" data-rv>
              <p className="k">MOVEMENT 01</p><h3 data-i18n="m1t">Ingest</h3>
              <p data-i18n="m1p">Upload what you have. The engine extracts only the facts a framework needs, and cites the page.</p>
            </div>
            <div className="flow-s" data-rv style={{transitionDelay:".07s"}}>
              <p className="k">MOVEMENT 02</p><h3 data-i18n="m2t">Interview</h3>
              <p data-i18n="m2p">An auditor-grade chatbot asks what the documents didn't say. It follows up.</p>
            </div>
            <div className="flow-s" data-rv style={{transitionDelay:".14s"}}>
              <p className="k">MOVEMENT 03</p><h3 data-i18n="m3t">Discover</h3>
              <p data-i18n="m3p">A read-only collector inside your boundary observes what your system actually does.</p>
            </div>
            <div className="flow-s" data-rv style={{transitionDelay:".21s"}}>
              <p className="k">MOVEMENT 04</p><h3 data-i18n="m4t">Assure</h3>
              <p data-i18n="m4p">Gap assessment, SoA, risk matrix. Then the loop stays open, and drift raises an alarm.</p>
            </div>
          </div>
        </section>
      
        {/* ═══ THE METHOD ═══ */}
        <section className="sec">
          <p className="eyebrow" data-rv data-i18n="eyeMethod">The method</p>
          <h2 data-rv data-i18n="h2Method">We never trust a single source.</h2>
          <p className="sub" data-rv data-i18n="subMethod">A finding is the <em>delta</em> between what you believe, what you wrote down, and what your system is doing.</p>
      
          <div className="find" data-rv>
            <div className="fx">
              <aside className="fx-v">
                <div className="fx-badge">Δ</div>
                <p className="fx-id">FND-0141</p>
                <h3 className="fx-t" data-i18n="fxT">Model bucket access</h3>
                <span className="sev" data-i18n="sev">MAJOR NONCONFORMITY</span>
                <div className="fx-sep"></div>
                <div className="fx-refs">
                  <span>ISO 42001 · A.4.2</span>
                  <span>EU AI ACT · ART. 15</span>
                </div>
                <p className="fx-sum" data-i18n="fxSum">The documented control is not operating. <b>Two findings, one delta.</b></p>
              </aside>
              <div className="fx-e">
                <div className="erow claim">
                  <span className="epill"><svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>CLAIM</span>
                  <p className="estate" data-i18n="stClaim">“Model bucket access is restricted to engineering.”</p>
                  <span className="emeta">CTO · INTERVIEW</span>
                </div>
                <div className="eop eq"><span>=</span></div>
                <div className="erow doc">
                  <span className="epill"><svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>DOCUMENT</span>
                  <p className="estate" data-i18n="stDoc">Access Control Policy v3: least privilege, engineering only.</p>
                  <span className="emeta">REVISED 2024</span>
                </div>
                <div className="eop ne"><i>REALITY DIVERGES</i><span>≠</span></div>
                <div className="erow real">
                  <span className="epill"><svg viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>REALITY</span>
                  <p className="estate" data-i18n="stReal">IAM: <b>14 principals</b>, 3 non-engineering, 1 service account with <code>*</code>.</p>
                  <span className="emeta">COLLECTOR · 14 JUL · 04:12</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ═══ THREE SURFACES ═══ */}
        <section className="sec">
          <p className="eyebrow" data-rv data-i18n="eyeSurf">Three surfaces</p>
          <h2 data-rv data-i18n="h2Surf">One engine. Three ways in.</h2>
          <div className="mods">
            <a className="mod" href="#" data-rv>
              <p className="k">SURFACE 01</p><h3 data-i18n="s1t">Governance</h3>
              <p data-i18n="s1p">Pick a framework. The chatbot maps it, discovery verifies it, the artefacts write themselves.</p>
              <p className="go" data-i18n="s1g">Start an assessment <i>→</i></p>
            </a>
            <a className="mod" href="#" data-rv style={{transitionDelay:".07s"}}>
              <p className="k">SURFACE 02</p><h3 data-i18n="s2t">Adversarial</h3>
              <p data-i18n="s2p">Continuous red-teaming against the OWASP LLM Top 10, on a schedule, not once a year.</p>
              <p className="go" data-i18n="s2g">View posture <i>→</i></p>
            </a>
            <a className="mod" href="#" data-rv style={{transitionDelay:".14s"}}>
              <p className="k">SURFACE 03</p><h3 data-i18n="s3t">PII</h3>
              <p data-i18n="s3p">Every prompt that carried personal data: masked, blocked, or the one you need to know about.</p>
              <p className="go" data-i18n="s3g">View log <i>→</i></p>
            </a>
          </div>
        </section>
      
        {/* ═══ ACCESS ═══ */}
        <section className="sec">
          <p className="eyebrow" data-rv data-i18n="eyeAcc">Access</p>
          <h2 data-rv data-i18n="h2Acc">We never hold your keys.</h2>
          <p className="sub" data-rv data-i18n="subAcc">The collector runs inside your boundary, under your credentials.</p>
      
          <div className="find" data-rv>
            <div className="fx">
              <aside className="fx-v">
                <div className="fx-badge"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="#8FF0D4" strokeWidth="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" stroke="#8FF0D4" strokeWidth="2" strokeLinecap="round"/></svg></div>
                <p className="fx-id">COLLECTOR.ACCESS</p>
                <h3 className="fx-t" data-i18n="accT">Zero custody</h3>
                <span className="sev g">OUTBOUND ONLY</span>
                <div className="fx-sep"></div>
                <div className="fx-refs">
                  <span>NO INBOUND PATH</span>
                  <span>NO PORT</span>
                  <span>KILL SWITCH · YOURS</span>
                </div>
                <p className="fx-sum" data-i18n="accSum">Runs under your credentials, inside your boundary. <b>We never hold your keys.</b></p>
              </aside>
              <div className="fx-e">
                <div className="erow" style={{transitionDelay:".05s"}}><span className="epill pdeny">NEVER</span><p className="estate" data-i18n="d1">Production inference payloads</p></div>
                <div className="erow" style={{transitionDelay:".13s"}}><span className="epill pdeny">NEVER</span><p className="estate" data-i18n="d2">Personal data of any kind</p></div>
                <div className="erow" style={{transitionDelay:".21s"}}><span className="epill pdeny">NEVER</span><p className="estate" data-i18n="d3">Model weights</p></div>
                <div className="erow" style={{transitionDelay:".29s"}}><span className="epill pdeny">NEVER</span><p className="estate" data-i18n="d4">Any write access, anywhere</p></div>
                <div className="eop sep"></div>
                <div className="erow" style={{transitionDelay:".43s"}}><span className="epill pallow">READ-ONLY</span><p className="estate" data-i18n="a1">Config, IAM, registry metadata</p></div>
                <div className="erow" style={{transitionDelay:".51s"}}><span className="epill pallow">READ-ONLY</span><p className="estate" data-i18n="a2">Log <b>completeness</b>, not contents</p></div>
                <div className="erow" style={{transitionDelay:".59s"}}><span className="epill pallow">READ-ONLY</span><p className="estate" data-i18n="a3">Aggregate metrics you already compute</p></div>
              </div>
            </div>
          </div>
        </section>
      
        <footer className="foot">
          <span>TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
          <span>SAFE · ETHICAL · TRANSPARENT</span>
        </footer>
      </div>
    </div>
  );
}
