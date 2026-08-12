"use client";

import { useEffect } from "react";
import { initLogin } from "./login-runtime";

export default function LoginPage(){
  useEffect(()=>{
    const dispose = initLogin();
    return dispose;
  }, []);

  return (
    <div className="lgx">
      
      <div className="scene" aria-hidden="true">
        <span className="aur a"></span>
        <span className="aur b"></span>
        <div className="grid"></div>
        <canvas id="net"></canvas>
        <div className="vig"></div>
      </div>
      
      <div className="layout">
      
        {/* ═══════════ LEFT ═══════════ */}
        <section className="left">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span className="logo">
              <img className="logo-img" src="https://www.taharaai.com/logo.png" alt="Tahara AI" />
              <svg className="logo-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style={{display:"none"}}><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8" stroke="rgba(255,255,255,.28)" strokeWidth="1"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <b className="logo-text">Tahara AI</b>
            </span>
            <div className="lang lang-mob" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">عربي</button>
            </div>
          </div>
      
          <div className="toasts" id="toasts" aria-hidden="true"></div>
      
          <div className="emblem-zone" aria-hidden="true">
            <div className="emblem" id="emblem">
              <span className="ring"></span>
              <span className="ring"></span>
              <span className="ring"></span>
              <div className="shield-core">
                <span className="core-mark" id="coreMark">
                  <img className="logo-img" src="https://www.taharaai.com/logo.png" alt="" />
                  <svg className="logo-fb" viewBox="0 0 48 44" fill="none" aria-hidden="true" style={{display:"none"}}><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8" stroke="rgba(255,255,255,.28)" strokeWidth="1"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
          </div>
      
          <div className="fw" id="wChecks" aria-hidden="true">
            <div className="k"><span className="live"></span><span>policy checks · 24h</span></div>
            <div className="v" id="checksVal">12,482</div>
            <canvas id="spark" width="170" height="26"></canvas>
            <div className="m"><span className="ok">▲ 99.98%</span> enforced</div>
          </div>
          <div className="fw" id="wEvidence" aria-hidden="true">
            <div className="k"><span className="live"></span><span>evidence stream</span></div>
            <div className="m" style={{marginTop:"8px"}}>evidence.pack <span className="ok" id="runId">run:8842</span></div>
            <div className="m">status <span className="ok">SEALED ✓</span></div>
          </div>
          <div className="fw" id="wRisk" aria-hidden="true">
            <div className="k"><span className="live"></span><span>assurance score</span></div>
            <div className="gwrap">
              <canvas id="gauge" width="70" height="46"></canvas>
              <div>
                <div className="gnum" id="gaugeNum">0</div>
                <div className="gsub">surface · low</div>
              </div>
            </div>
          </div>
      
          <div className="brand-foot">
            <div className="frameworks" aria-hidden="true">
              <span className="fl">MAPPED&nbsp;TO</span>
              <span>ISO/IEC&nbsp;42001</span><span className="sep">·</span>
              <span>NIST&nbsp;AI&nbsp;RMF</span><span className="sep">·</span>
              <span>EU&nbsp;AI&nbsp;Act</span><span className="sep">·</span>
              <span>OWASP&nbsp;LLM</span><span className="sep">·</span>
              <span>MITRE&nbsp;ATLAS</span>
            </div>
            <p className="claim" id="claim">Know what your AI did, and govern it.</p>
            <p className="strap">SAFE · ETHICAL · TRANSPARENT</p>
          </div>
        </section>
      
        {/* ═══════════ RIGHT — sign-in box unchanged ═══════════ */}
        <section className="right">
          <div className="right-top">
            <button className="theme-tg" id="themeTg" type="button" aria-label="Switch theme" title="Theme">
              <svg className="ic-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <svg className="ic-moon" viewBox="0 0 24 24" fill="none"><path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            </button>
            <div className="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">عربي</button>
            </div>
          </div>
      
          <div className="right-mid">
            <div className="card-col">
            <section className="card" aria-labelledby="title">
              <div className="card-mark" aria-hidden="true">
                <img className="logo-img" src="https://www.taharaai.com/logo.png" alt="" />
                <svg className="logo-fb" viewBox="0 0 48 44" fill="none" style={{display:"none"}}><path d="M24 24 4 32l20 8 20-8-20-8Z" fill="#8FB4F5" opacity=".9"/><path d="M24 14 4 22l20 8 20-8-20-8Z" fill="#4E7EE6"/><path d="M24 4 4 12l20 8 20-8L24 4Z" fill="#1E4CA8" stroke="rgba(255,255,255,.28)" strokeWidth="1"/><path d="m18.8 12 3.7 3.4 6.8-6.3" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
      
              <p className="eyebrow" aria-hidden="true">TAHARA PLATFORM</p>
              <h1 id="title" data-i18n="title">Log in to Tahara</h1>
              <p className="sub" data-i18n="sub">Welcome back. Enter your details to continue.</p>
      
              <form id="form" noValidate>
                <div className="banner" id="banner" role="alert"></div>
      
                <div className="field">
                  <label htmlFor="email" data-i18n="email">Work email</label>
                  <div className="control">
                    <svg className="fi" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <input type="email" id="email" name="email" autoComplete="email" required autoFocus />
                  </div>
                </div>
      
                <div className="field">
                  <label htmlFor="password" data-i18n="pw">Password</label>
                  <div className="control">
                    <svg className="fi" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                    <input type="password" id="password" name="password" className="pw" autoComplete="current-password" required aria-describedby="banner capsHint" />
                    <button type="button" className="pw-toggle" id="pwToggle" aria-pressed="false" data-i18n="show">Show</button>
                  </div>
                  <p className="caps" id="capsHint" aria-live="polite">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 10v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="18" r=".9" fill="currentColor"/></svg>
                    <span data-i18n="caps">Caps Lock is on</span>
                  </p>
                </div>
      
                <div className="row-split">
                  <label className="check">
                    <input type="checkbox" id="remember" name="remember" />
                    <span data-i18n="keep">Keep me signed in</span>
                  </label>
                  <a href="#" data-i18n="forgot">Forgot password</a>
                </div>
      
                <button type="submit" className="btn" id="submit">
                  <span className="spin" aria-hidden="true"></span>
                  <span id="btnLabel" data-i18n="login">Log in →</span>
                </button>
              </form>
      
              <div className="card-sep" aria-hidden="true"></div>
              <p className="help-line"><span data-i18n="noacc">Don't have access?</span> <a href="mailto:support@taharaai.com" data-i18n="contact">Contact your administrator</a></p>
              <p className="demo-note" data-i18n="demo">Demo interface — nothing is sent.</p>
              <p className="legal-line">
                <a href="#" data-i18n="terms">Terms</a><span className="dsep">·</span><a href="#" data-i18n="privacy">Privacy notice</a><span className="dsep">·</span><span data-i18n="copy">© 2026 Tahara AI</span>
              </p>
            </section>
            </div>
          </div>
        </section>
      </div>
      
      
    </div>
  );
}
