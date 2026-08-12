"use client";

import { useEffect } from "react";
import { initFramework } from "./framework-runtime";

export default function FrameworkPage(){
  useEffect(() => {
    const dispose = initFramework();
    return dispose;
  }, []);

  return (
    <div className="fwx">
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
            <a data-i18n="nGov" href="/governance">Governance</a>
            <a className="on" data-i18n="nFw" href="/framework">Frameworks</a>
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
      
        <a className="crumb" href="/governance"><span data-i18n="crumb">← ALL FRAMEWORKS</span></a>
      
        <div className="plate hero" data-rv>
          <div className="seal-w"><div id="fwSeal"></div></div>
          <div className="hero-t">
            <span className="kindchip" id="fwKind">LAW</span>
            <h1 id="fwName"></h1>
            <p className="lede" id="fwDesc"></p>
          </div>
          <div className="hero-m" id="fwMeta"></div>
        </div>
      
        <div className="plate kband" data-rv style={{transitionDelay:".12s"}} id="fwKpis"></div>
      
        <p className="eyebrow" data-rv data-i18n="eyeChain">How a provision becomes a monitored control</p>
        <h2 data-rv data-i18n="h2Chain">Obligation → Control → Probe → Evidence.</h2>
        <p className="lede" data-rv style={{marginTop:"8px"}} data-i18n="ledeChain">
          Every provision in this framework is compiled into a rule the engine can evaluate,
          a probe that observes your live system, and a defined set of evidence that satisfies it.
          Below are the first few, in full.
        </p>
      
        <div className="ckey" data-rv>
          <div className="ck law">
            <div className="s"><i>¶</i>SOURCE</div>
            <h3 data-i18n="ck1t">Obligation</h3>
            <p data-i18n="ck1p">The provision as written. Verbatim, with its citation. We never paraphrase the law.</p>
          </div>
          <span className="cklink"></span>
          <div className="ck">
            <div className="s"><i>{ }</i>COMPILED</div>
            <h3 data-i18n="ck2t">Control</h3>
            <p data-i18n="ck2p">A deterministic rule over your system profile. No model decides whether this applies.</p>
          </div>
          <span className="cklink"></span>
          <div className="ck">
            <div className="s"><i>◉</i>OBSERVED</div>
            <h3 data-i18n="ck3t">Probe</h3>
            <p data-i18n="ck3p">What the collector reads from your live system to test whether the control is operating.</p>
          </div>
          <span className="cklink"></span>
          <div className="ck">
            <div className="s"><i>✓</i>REQUIRED</div>
            <h3 data-i18n="ck4t">Evidence</h3>
            <p data-i18n="ck4p">What satisfies it, and what each possible finding demands you produce.</p>
          </div>
        </div>
      
        <div id="obligations" style={{marginTop:"28px"}}></div>
      
        <div className="note" data-rv>
          <b data-i18n="noteB">This is an extract.</b> <span data-i18n="noteT">Shown here are the first few obligations of</span>
          <span id="fwCount"></span>. <span data-i18n="noteT2">The full control library is compiled, hash-pinned and frozen at build time. Every provision gets the same four-stage treatment, and the build fails if any rule reads a profile field that was never declared.</span>
        </div>
      
        <footer className="foot">
          <span>TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span>
          <span>SAFE · ETHICAL · TRANSPARENT</span>
        </footer>
      </div>
    </div>
  );
}
