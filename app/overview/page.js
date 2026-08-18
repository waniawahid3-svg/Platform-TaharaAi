"use client";

import { initOverview } from "./overview-runtime";
import { useEffect } from "react";
import Link from "next/link";
export default function OverviewPage(){
  useEffect(() => {
    const dispose = initOverview();
    return dispose;
  }, []);

  return (
    <div className="ovx">
      <div className="thr" id="thr" data-theme="light" dir="ltr">
      <div className="field"></div>
      <div className="page">
      
        <header className="top">
          <div className="wrap top-in">
            <a className="lock" href="#">
              <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 4 24 9.4 14 14.8 4 9.4 14 4Z" fill="#2F6BD6"/>
                <path d="M14 12.6 24 18l-10 5.4L4 18l10-5.4Z" fill="#7FA8EC"/>
              </svg>
              <span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span>
            </a>
            <nav className="nav">
              <Link href="/overview" className="on" data-i="n1">Overview</Link>
              <Link href="/governance" data-i="n2">Governance</Link>
              <Link href="/framework" data-i="n3">Frameworks</Link>
              <a href="#" data-i="n4" onClick={(e)=>e.preventDefault()}>Discovery</a>
              <a href="#" data-i="n5" onClick={(e)=>e.preventDefault()}>Adversarial</a>
              <a href="#" data-i="n6" onClick={(e)=>e.preventDefault()}>Guardrails</a>
            </nav>
            <div className="top-r">
              <button className="icb" id="themeBtn" aria-label="Switch theme">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </button>
              <div className="seg"><button className="on" id="enBtn">EN</button><button id="arBtn">عربي</button></div>
              <Link className="cta-sm" href="/governance" data-i="cta">Start assessment</Link>
              <Link className="signout" href="/" data-i="so">Sign out</Link>
            </div>
          </div>
        </header>
      
        {/* ================= HERO ================= */}
        <section className="hero" id="hero" style={{paddingTop:"74px"}}>
          <div className="wrap hero-in">
            <div className="hero-copy">
              <div className="kick"><span data-i="kick0">CONTINUOUS AI ASSURANCE</span></div>
              <h1><span data-i="h1a">Trust is not declared.</span><br /><span data-i="h1b">It is</span> <em data-i="h1c">demonstrated.</em></h1>
              <p className="lede" data-i="lede">We map your system against the frameworks that bind it, then keep watching. The day a control stops operating, you find out. Not the auditor.</p>
              <div className="acts">
              <Link className="bl" href="/governance"><span data-i="cta1">Start an assessment</span><span>&#8594;</span></Link>
                <a className="bl g" href="#mvstage" data-i="cta2">See how it works</a>
              </div>
              <div className="fchips">
                <span className="fc">EU AI Act</span><span className="fc">ISO/IEC 42001</span><span className="fc">ISO/IEC 23894</span>
                <span className="fc">NIST AI RMF</span><span className="fc">+ Regional</span>
              </div>
            </div>
            <div className="ringbox" dir="ltr" aria-hidden="true">
              <svg className="ring" viewBox="0 0 420 420" aria-hidden="true">
                <defs>
                  <path id="orbA" d="M210 60a150 150 0 1 1-.01 0"/>
                </defs>
                <g className="orb1">
                  <g>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(0 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(15 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(30 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(45 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(60 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(75 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(90 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(105 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(120 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(135 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(150 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(165 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(180 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(195 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(210 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(225 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(240 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(255 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(270 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(285 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(300 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(315 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(330 210 210)"/>
                    <rect className="tkr" x="207.8" y="24" width="4.4" height="11" rx="1.4" transform="rotate(345 210 210)"/>
                  </g>
                  <text textAnchor="middle"><textPath href="#orbA" startOffset="12.5%">ISO 42001</textPath></text>
                  <text textAnchor="middle"><textPath href="#orbA" startOffset="37.5%">NIST AI RMF</textPath></text>
                  <text textAnchor="middle"><textPath href="#orbA" startOffset="62.5%">EU AI ACT</textPath></text>
                  <text textAnchor="middle"><textPath href="#orbA" startOffset="87.5%">ISO 23894</textPath></text>
                  <text className="sepdot" textAnchor="middle"><textPath href="#orbA" startOffset="25%">&#183;</textPath></text>
                  <text className="sepdot" textAnchor="middle"><textPath href="#orbA" startOffset="50%">&#183;</textPath></text>
                  <text className="sepdot" textAnchor="middle"><textPath href="#orbA" startOffset="75%">&#183;</textPath></text>
                  <circle cx="210" cy="60" r="2" fill="var(--green)"/>
                </g>
                <g className="orbi"><circle cx="210" cy="38" r="4.5" fill="var(--green)"/></g>
                <circle className="halo" cx="210" cy="210" r="118"/>
                <circle className="halob" cx="210" cy="210" r="90"/>
                <circle className="glow" cx="210" cy="210" r="79"/>
                <circle cx="210" cy="210" r="76" fill="#0B2141"/>
                <circle cx="210" cy="210" r="76" fill="none" stroke="var(--green-2)" strokeWidth="2.4"/>
                <circle cx="210" cy="210" r="58" fill="none" stroke="#1E4478" strokeWidth="1.2"/>
                <g transform="translate(210 206)">
                  <path d="M0 -26 26 -12 0 2 -26 -12Z" fill="#2F6BD6"/>
                  <path d="M0 -12 26 2 0 16 -26 2Z" fill="#5F8FE4"/>
                  <path d="M0 2 26 16 0 30 -26 16Z" fill="#9DBCF2"/>
                  <path d="M-9 -14l7 7 12 -13" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
          </div>
      
          {/* live signals ticker */}
          <div className="ticker">
            <div className="tk-track" id="tktrack">
              <span className="tk"><span className="d w"></span><b>GAP ASSESSMENT</b>record found, 12 Jul</span>
              <span className="tk"><span className="d w"></span><b>DISCOVERY</b>IAM drift: 3 non-eng principals on model bucket</span>
              <span className="tk"><span className="d"></span><b>EU AI ACT &#183; ART. 15</b>accuracy 0.94, above declared floor</span>
              <span className="tk"><span className="d b"></span><b>ISO 42001 &#183; 9.2</b>internal audit: 0 records in 8 months</span>
              <span className="tk"><span className="d w"></span><b>EU AI ACT &#183; ART. 12</b>log sequence gap: 3 days</span>
              <span className="tk"><span className="d"></span><b>ISO 42001 &#183; A.6.2.4</b>model registry: 4 versions approved</span>
            </div>
          </div>
        </section>
      
        {/* ================= MOVEMENTS ================= */}
        <section style={{paddingBottom:"0"}}>
          <div className="mvstage" id="mvstage">
            <div className="mvsticky">
              <div className="wrap">
                <div className="kick rv"><span data-i="kick1">HOW IT WORKS</span></div>
                <h2 className="rv d1" data-i="h21">Four movements. One continuous loop.</h2>
      
                <div className="looprail" dir="ltr" aria-hidden="true">
                  <svg viewBox="0 0 1200 60">
                    <path className="base" d="M145 30H1055"/>
                    <path className="draw" id="loopdraw" d="M145 30H1055"/>
                    <g id="loopnodes">
                      <circle className="nd" cx="145" cy="30" r="13"/><text className="ndt" x="145" y="33.5" textAnchor="middle">01</text>
                      <circle className="nd" cx="448" cy="30" r="13"/><text className="ndt" x="448" y="33.5" textAnchor="middle">02</text>
                      <circle className="nd" cx="752" cy="30" r="13"/><text className="ndt" x="752" y="33.5" textAnchor="middle">03</text>
                      <circle className="nd" cx="1055" cy="30" r="13"/><text className="ndt" x="1055" y="33.5" textAnchor="middle">04</text>
                    </g>
                  </svg>
                </div>
      
                <div className="mvgrid" id="mvgrid">
                  <div className="mv" data-n="0">
                    <div className="mvtop">
                      <span className="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.1v6.1M5.7 5.9 8 8.2l2.3-2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.7 9.5v2.4c0 1.05.85 1.9 1.9 1.9h6.8a1.9 1.9 0 0 0 1.9-1.9V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M2.7 9.9h2.9l.9 1.4h3l.9-1.4h2.9" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg></span>
                    </div>
                    <b data-i="m1t">Ingest</b>
                    <p data-i="m1p">Upload what you have. The engine extracts only the facts a framework needs, and cites the page.</p>
                  </div>
                  <div className="mv" data-n="1">
                    <div className="mvtop">
                      <span className="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.4 8.5a2 2 0 0 1-2 2H7.4l-3 2.7v-2.7h-.8a2 2 0 0 1-2-2V4.6a2 2 0 0 1 2-2h7.8a2 2 0 0 1 2 2v3.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="5.3" cy="6.6" r=".95" fill="currentColor"/><circle cx="8" cy="6.6" r=".95" fill="currentColor"/><circle cx="10.7" cy="6.6" r=".95" fill="currentColor"/></svg></span>
                    </div>
                    <b data-i="m2t">Interview</b>
                    <p data-i="m2p">An auditor-grade chatbot asks what the documents didn't say. It follows up.</p>
                  </div>
                  <div className="mv" data-n="2">
                    <div className="mvtop">
                      <span className="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8l3.7-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="8" r="1.05" fill="currentColor"/><circle cx="10.5" cy="10.1" r=".95" fill="currentColor"/></svg></span>
                    </div>
                    <b data-i="m3t">Discover</b>
                    <p data-i="m3p">A read-only collector inside your boundary observes what your system actually does.</p>
                  </div>
                  <div className="mv" data-n="3">
                    <div className="mvtop">
                      <span className="mvic"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.9 13 4.2v3.3c0 3.4-2.15 5.6-5 6.6-2.85-1-5-3.2-5-6.6V4.2L8 1.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5.6 7.9 7.3 9.6l3.1-3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    </div>
                    <b data-i="m4t">Assure</b>
                    <p data-i="m4p">Gap assessment, SoA, risk matrix. Then the loop stays open, and drift raises an alarm.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      
      
      
      
      
      
      
      
      
      
        {/* ================= POSTURE, THE NUMBERS ================= */}
        <section className="posture" id="posture">
          <div className="wrap">
            <div className="kick rv"><span data-i="kick2">THE POSTURE</span></div>
            <h2 className="rv d1" data-i="h22">One posture. Measured continuously.</h2>
            <p className="sub rv d2" data-i="sub2">Live figures from all four surfaces.</p>
      
            <div className="pwrap" dir="ltr">
              <div className="prow4">
                <div className="pc kpit">
                  <span className="kic g"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.6" cy="7.6" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M11.4 11.4 15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
                  <div className="kbody">
                    <span className="kv g"><span className="num" data-to="17.1" data-dec="1">0</span><small>K</small></span>
                    <span className="kl">Assets Discovered</span>
                    <span className="ks up">&#8593; 12% THIS WEEK</span>
                  </div>
                </div>
                <div className="pc kpit">
                  <span className="kic n"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.9 15 4.6v3.8c0 3.9-2.6 6.5-6 7.7-3.4-1.2-6-3.8-6-7.7V4.6L9 1.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg></span>
                  <div className="kbody">
                    <span className="kv n"><span className="num" data-to="12847">0</span></span>
                    <span className="kl">Prompts Inspected</span>
                    <span className="ks">LAST 24 HOURS</span>
                  </div>
                </div>
                <div className="pc kpit">
                  <span className="kic v"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.2 9S4.7 4.4 9 4.4 15.8 9 15.8 9 13.3 13.6 9 13.6 2.2 9 2.2 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3.4 3.4l11.2 11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  <div className="kbody">
                    <span className="kv n"><span className="num" data-to="1204">0</span></span>
                    <span className="kl">Prompts Masked</span>
                    <span className="ks">BEFORE THE MODEL</span>
                  </div>
                </div>
                <div className="pc kpit">
                  <span className="kic r"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.8" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.6v4.2M9 12.4v.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
                  <div className="kbody">
                    <span className="kv r"><span className="num" data-to="1">0</span></span>
                    <span className="kl">Data Leaked</span>
                    <span className="ks">VIA RETRIEVAL PATH</span>
                  </div>
                </div>
              </div>
      
              <div className="prow2a">
                <div className="pc pchart">
                  <div className="chd">
                    <div className="cht"><b>Adversarial probes <svg className="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" strokeWidth="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></b></div>
                    <div className="seg7"><i className="on">7D</i><i>30D</i><i>90D</i><i>ALL</i></div>
                  </div>
                  <div className="pvrow">
                    <span className="pv"><span className="num" data-to="8412">0</span></span>
                    <span className="pvu">per cycle</span>
                    <span className="pill-on">ON SCHEDULE</span>
                  </div>
                  <svg className="csvg" viewBox="0 0 560 190" aria-hidden="true">
                    <defs>
                      <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="var(--green)" stopOpacity=".3"/>
                        <stop offset=".55" stopColor="var(--green)" stopOpacity=".1"/>
                        <stop offset="1" stopColor="var(--green)" stopOpacity="0"/>
                      </linearGradient>
                      <filter id="lglow" x="-20%" y="-40%" width="140%" height="200%">
                        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="var(--green)" flood-opacity=".3"/>
                      </filter>
                    </defs>
                    <g className="grid"><path d="M44 46.4H548M44 76.8H548M44 107.2H548M44 137.6H548"/></g>
                    <path className="base" d="M44 168H548"/>
                    <path className="vg" d="M548 44V168"/>
                    <g className="axl">
                      <text x="36" y="49" textAnchor="end">8K</text>
                      <text x="36" y="80" textAnchor="end">7K</text>
                      <text x="36" y="110" textAnchor="end">6K</text>
                      <text x="36" y="141" textAnchor="end">5K</text>
                      <text x="44" y="183">Aug 12</text>
                      <text x="237" y="183" textAnchor="middle">Aug 14</text>
                      <text x="431" y="183" textAnchor="middle">Aug 16</text>
                      <text x="548" y="183" textAnchor="end">Now</text>
                    </g>
                    <path className="parea" fill="url(#pgrad)" d="M44.0 131.5C50.5 129.5 69.9 120.4 82.8 119.4C95.7 118.4 108.6 127.9 121.5 125.4C134.4 122.9 147.4 107.2 160.3 104.2C173.2 101.2 186.2 109.7 199.1 107.2C212.0 104.7 224.9 94.1 237.8 89.0C250.7 83.9 263.7 77.8 276.6 76.8C289.5 75.8 302.5 84.9 315.4 82.9C328.3 80.9 341.3 69.7 354.2 64.6C367.1 59.5 380.0 53.5 392.9 52.5C405.8 51.5 418.8 59.6 431.7 58.6C444.6 57.6 457.6 49.5 470.5 46.4C483.4 43.3 496.3 42.4 509.2 40.3C522.1 38.2 541.5 35.0 548.0 33.9L548 168L44 168Z"/>
                    <path className="pline" id="pline" filter="url(#lglow)" d="M44.0 131.5C50.5 129.5 69.9 120.4 82.8 119.4C95.7 118.4 108.6 127.9 121.5 125.4C134.4 122.9 147.4 107.2 160.3 104.2C173.2 101.2 186.2 109.7 199.1 107.2C212.0 104.7 224.9 94.1 237.8 89.0C250.7 83.9 263.7 77.8 276.6 76.8C289.5 75.8 302.5 84.9 315.4 82.9C328.3 80.9 341.3 69.7 354.2 64.6C367.1 59.5 380.0 53.5 392.9 52.5C405.8 51.5 418.8 59.6 431.7 58.6C444.6 57.6 457.6 49.5 470.5 46.4C483.4 43.3 496.3 42.4 509.2 40.3C522.1 38.2 541.5 35.0 548.0 33.9"/>
                    <g className="ptag">
                      <rect x="492" y="8" rx="9" width="58" height="18"/>
                      <text x="521" y="20" textAnchor="middle">8,412</text>
                      <path d="M543 26 547.5 31" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round"/>
                    </g>
                    <g className="pdot"><circle cx="548" cy="33.9" r="7" fill="var(--green)" opacity=".18"/><circle cx="548" cy="33.9" r="3.4" fill="var(--green)"/></g>
                  </svg>
                </div>
      
                <div className="pc pdonut">
                  <div className="chd">
                    <div className="cht"><b>Security posture <svg className="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" strokeWidth="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></b></div>
                    <span className="chip-btn">View all controls</span>
                  </div>
                  <div className="dwrap">
                    <svg className="don" viewBox="0 0 150 150" aria-hidden="true">
                      <circle className="dtrack" cx="75" cy="75" r="57"/>
                      <circle className="darc" id="darc" cx="75" cy="75" r="57" pathLength="100" transform="rotate(-90 75 75)"/>
                      <text className="pd-num" x="75" y="70" textAnchor="middle">61</text>
                      <text className="pd-sub" x="75" y="84" textAnchor="middle">/ 187</text>
                      <text className="pd-sub" x="75" y="96" textAnchor="middle">CONTROLS PASSING</text>
                    </svg>
                    <div className="plgs">
                      <div className="plg"><span className="dot g"></span><span>PASSING</span><b>61</b></div>
                      <div className="plg"><span className="dot a"></span><span>MINOR</span><b>7</b></div>
                      <div className="plg"><span className="dot r"></span><span>MAJOR</span><b>3</b></div>
                    </div>
                  </div>
                  <div className="astrip a">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.7 13.4 4.1v3.4c0 3.4-2.3 5.7-5.4 6.8-3.1-1.1-5.4-3.4-5.4-6.8V4.1L8 1.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 5.4v2.8M8 10.5v.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    <div><span className="ast">OVERALL POSTURE</span><b className="asb">Needs attention</b></div>
                    <span className="chev">&#8250;</span>
                  </div>
                </div>
              </div>
      
              <div className="prow2b">
                <div className="pc pcov">
                  <div className="chd">
                    <div className="cht"><b>Adversarial coverage <svg className="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" strokeWidth="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></b><span className="chs">10 attack categories monitored</span></div>
                    <span className="chip-btn">View all categories</span>
                  </div>
                  <div className="htrack">
                    <i className="hg" data-w="49"></i><i className="ha" data-w="29"></i><i className="hr" data-w="19"></i>
                  </div>
                  <div className="cmini">
                    <div className="cm"><span className="cmk g">PASSING</span><b>5</b><span className="cms">CATEGORIES</span></div>
                    <div className="cm"><span className="cmk a">DEGRADED</span><b>3</b><span className="cms">CATEGORIES</span></div>
                    <div className="cm"><span className="cmk r">FAILING</span><b>2</b><span className="cms">CATEGORIES</span></div>
                  </div>
                  <div className="cchips">
                    <i>PROMPT INJECTION</i><i>JAILBREAK</i><i>DATA EXFILTRATION</i><i>PII LEAKAGE</i><i>MODEL ABUSE</i><i className="more">+5</i>
                  </div>
                </div>
      
                <div className="pc pguard">
                  <div className="chd">
                    <div className="cht"><b>Guardrail activity <svg className="inf" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.7" stroke="currentColor" strokeWidth="1.1"/><path d="M6 5.4v2.6M6 3.6v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></b><span className="chs">12,847 inspected</span></div>
                    <span className="chip-btn">Last 24 hours</span>
                  </div>
                  <div className="grow2">
                    <span className="gic v"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.6 6.5S3.4 3.2 6.5 3.2 11.4 6.5 11.4 6.5 9.6 9.8 6.5 9.8 1.6 6.5 1.6 6.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M2.4 2.4l8.2 8.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></span>
                    <span className="gl2">MASKED</span>
                    <span className="gtrack"><i className="v" data-w="76"></i></span>
                    <b className="gv2">1,204</b>
                  </div>
                  <div className="grow2">
                    <span className="gic a"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="4.9" stroke="currentColor" strokeWidth="1.2"/><path d="M3 3l7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></span>
                    <span className="gl2">BLOCKED</span>
                    <span className="gtrack"><i className="a" data-w="22"></i></span>
                    <b className="gv2">38</b>
                  </div>
                  <div className="grow2">
                    <span className="gic r"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.8 12 11.2H1L6.5 1.8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6.5 5.4v2.4M6.5 9.4v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg></span>
                    <span className="gl2">LEAKED</span>
                    <span className="gtrack"><i className="r" data-w="5"></i></span>
                    <b className="gv2">1</b>
                  </div>
                  <div className="astrip r2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.8" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 4.6v3.4M7.5 10.4v.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    <span className="asl">1 data leak detected via retrieval path</span>
                    <b className="avd">VIEW DETAILS</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= 01 DISCOVER ================= */}
        <section className="feat" id="f-discover">
          <div className="wrap feat-in">
            <div className="cpy">
              <div className="prob fx" data-i="pb1">PROBLEM: YOU CAN'T GOVERN WHAT YOU CAN'T SEE</div>
              <h3 className="fx" data-i="h31">Find every AI system, approved or not</h3>
              <p className="fx" data-i="p1">A read-only collector runs inside your boundary, under your credentials, and surfaces every AI system in use within a day. Including the ones nobody signed off.</p>
            </div>
            <div className="winbox">
              <div className="win" dir="ltr">
                <div className="pillnav"><span className="on">Discover</span><span>Adversarial</span><span>Govern</span><span>Guardrails</span></div>
                <div className="win-in">
                  <aside className="side">
                    <div className="shh"><span className="bk">&#8249;</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" strokeWidth="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      Discover</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="1.4" fill="currentColor"/></svg>Connect</div>
                    <div className="si on"><svg viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="6.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="1.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="6.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>Dashboard</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.2"/><path d="M1.8 10.4c.6-2 2.2-3 4.2-3s3.6 1 4.2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Agents</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Inventory</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Activity Feed</div>
                  </aside>
                  <div className="main">
                    <div className="mh"><b>Discovery</b><span>The biggest AI risks we've discovered: who's exposed and what to do about it.</span></div>
                    <div className="krow k3">
                      <div className="kc"><div className="kl">ASSETS DISCOVERED</div>
                        <div className="kv"><span className="num" data-to="17.1" data-dec="1"></span><small>K</small></div>
                        <div className="kd"><u>&#8593; 2</u> this week</div>
                        <svg className="spk" viewBox="0 0 56 22"><path stroke="var(--blue)" d="M2 18 10 16 18 17 26 13 34 12 42 8 50 6 54 4"/></svg></div>
                      <div className="kc"><div className="kl">DISCOVERED APPS</div>
                        <div className="kv"><span className="num" data-to="2"></span></div>
                        <div className="kd"><u>&#8593; 2</u> this week</div></div>
                      <div className="kc"><div className="kl">PEOPLE EXPOSED</div>
                        <div className="kv"><span className="num" data-to="2"></span></div>
                        <div className="kd"><u>&#8593; 2</u> this week</div></div>
                    </div>
                    <div className="krow k3" style={{gridTemplateColumns:"1.2fr 1fr"}}>
                      <div className="kc r"><div className="kl">CRITICAL EXPOSURES</div>
                        <div className="kv"><span className="num" data-to="3"></span></div>
                        <div className="kd">&#8593; 4 new this week</div>
                        <svg className="spk" viewBox="0 0 56 22"><path stroke="var(--red)" d="M2 18 12 17 22 17 30 15 38 14 46 8 54 4"/></svg></div>
                      <div className="kc v"><div className="kl">AI CALLS . 24H</div>
                        <div className="kv"><span className="num" data-to="9"></span></div>
                        <div className="kd">&#8593; 350% vs yesterday</div>
                        <svg className="spk" viewBox="0 0 56 22"><path stroke="var(--violet)" d="M2 14 8 10 14 15 20 8 26 13 32 6 38 12 44 7 50 11 54 6"/></svg></div>
                    </div>
                    <div className="krow" style={{gridTemplateColumns:"1.2fr 1fr"}}>
                      <div className="crit">
                        <div className="ck">&#9650; CRITICAL FINDING</div>
                        <b>2 people are using 2 AI apps you haven't approved.</b>
                        <p>Both read mail and files, and neither is in the register. One forwards attachments to a model hosted outside your tenancy, so the data leaves before any policy can see it.</p>
                        <span className="cl">Open the register &#8594;</span>
                      </div>
                      <div className="pcard">
                        <div className="ph"><h4>Top apps by people reached</h4></div>
                        <div className="lnr"><span className="nm">GPT for Excel W..</span><span className="chip r">reads mail / files</span><span className="mnn">1 user</span></div>
                        <div className="lnr"><span className="nm">Claude for Sheets</span><span className="chip r">reads mail / files</span><span className="mnn">1 user</span></div>
                        <div className="lnr"><span className="nm">Notion AI</span><span className="chip n">reads docs</span><span className="mnn">1 user</span></div>
                        <div className="lnr"><span className="nm">Otter.ai</span><span className="chip n">reads calendar</span><span className="mnn">1 user</span></div>
                        <div className="lnr"><span className="nm">Grammarly</span><span className="chip n">reads drafts</span><span className="mnn">1 user</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= 02 ADVERSARIAL ================= */}
        <section className="feat flip" id="f-adv">
          <div className="wrap feat-in">
            <div className="cpy">
              <div className="prob fx" data-i="pb2">PROBLEM: A YEARLY PEN TEST IS ALREADY OUT OF DATE</div>
              <h3 className="fx" data-i="h32">Attack your own system before someone else does</h3>
              <p className="fx" data-i="p2">The OWASP LLM Top 10 runs against staging on a recurring schedule. A regression shows up the next cycle, not next year.</p>
            </div>
            <div className="winbox">
              <div className="win" dir="ltr">
                <div className="pillnav"><span>Discover</span><span className="on">Adversarial</span><span>Govern</span><span>Guardrails</span></div>
                <div className="win-in">
                  <aside className="side">
                    <div className="shh"><span className="bk">&#8249;</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6.6 1.4 3 7h2.4L5 10.6 9 5H6.6l.6-3.6Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>
                      Adversarial</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 2.4h8v3.2H2zM2 8h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Campaigns</div>
                    <div className="si on"><svg viewBox="0 0 12 12" fill="none"><rect x="1.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="6.5" y="1.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="1.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="6.5" y="6.5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>Categories</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>Probe library</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 2v5M6 9.4v.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Findings</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.2"/><path d="M6 3.6V6l1.8 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Schedule</div>
                    <div className="si dim"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Runbooks</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Continuous Dashboard</div>
                  </aside>
                  <div className="main">
                    <div className="mh"><b>Adversarial testing</b></div>
                    <div className="krow k4">
                      <div className="kc r"><div className="kl">FAILING</div><div className="kv"><span className="num" data-to="2"></span></div></div>
                      <div className="kc a"><div className="kl">DEGRADED</div><div className="kv"><span className="num" data-to="3"></span></div></div>
                      <div className="kc g"><div className="kl">PASSING</div><div className="kv"><span className="num" data-to="5"></span></div></div>
                      <div className="kc b"><div className="kl">PROBES . 24H</div><div className="kv"><span className="num" data-to="8412"></span></div></div>
                    </div>
                    <div className="pcard">
                      <div className="cat"><span className="cid">LLM01</span>
                        <span className="cbody"><b>Prompt Injection</b><span>Untrusted input steering the model away from its instructions, directly or through content it retrieves</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>61%</u></span><span className="track"><i className="r" data-w="61"></i></span></span>
                        <span className="chip r">FAILING</span><span className="pn">1,204 probes</span></div>
                      <div className="cat"><span className="cid">LLM02</span>
                        <span className="cbody"><b>Sensitive Information Disclosure</b><span>Model reveals PII, credentials, or proprietary data in its output</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>74%</u></span><span className="track"><i className="r" data-w="74"></i></span></span>
                        <span className="chip r">FAILING</span><span className="pn">980 probes</span></div>
                      <div className="cat"><span className="cid">LLM03</span>
                        <span className="cbody"><b>Supply Chain</b><span>Compromised base models, datasets, adapters, or plugins</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>88%</u></span><span className="track"><i className="a" data-w="88"></i></span></span>
                        <span className="chip a">DEGRADED</span><span className="pn">142 probes</span></div>
                      <div className="cat"><span className="cid">LLM04</span>
                        <span className="cbody"><b>Data &amp; Model Poisoning</b><span>Manipulated training or fine-tuning data introducing backdoors or bias</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>91%</u></span><span className="track"><i className="a" data-w="91"></i></span></span>
                        <span className="chip a">DEGRADED</span><span className="pn">320 probes</span></div>
                      <div className="cat"><span className="cid">LLM05</span>
                        <span className="cbody"><b>Improper Output Handling</b><span>Downstream systems trusting model output without validation</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>97%</u></span><span className="track"><i className="g" data-w="97"></i></span></span>
                        <span className="chip g">PASSING</span><span className="pn">610 probes</span></div>
                      <div className="cat"><span className="cid">LLM06</span>
                        <span className="cbody"><b>Excessive Agency</b><span>The model granted more permission, autonomy, or functionality than the task needs</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>83%</u></span><span className="track"><i className="a" data-w="83"></i></span></span>
                        <span className="chip a">DEGRADED</span><span className="pn">88 probes</span></div>
                      <div className="cat"><span className="cid">LLM07</span>
                        <span className="cbody"><b>System Prompt Leakage</b><span>Instructions, guardrails, or secrets in the system prompt disclosed to a user</span></span>
                        <span className="rate"><span className="rl"><span>PASS RATE</span><u>100%</u></span><span className="track"><i className="g" data-w="100"></i></span></span>
                        <span className="chip g">PASSING</span><span className="pn">440 probes</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= METHOD, FND-0141 ================= */}
        <section className="feat" id="f-method">
          <div className="wrap feat-in">
            <div className="cpy">
              <div className="prob fx" data-i="pbm">PROBLEM: NO SINGLE SOURCE CAN BE TRUSTED</div>
              <h3 className="fx" data-i="h3m">We never trust a single source.</h3>
              <p className="fx" data-i="pm">A finding is the delta between what you believe, what you wrote down, and what your system is doing.</p>
            </div>
            <div className="winbox">
              <div className="win warn" dir="ltr">
                <div className="pillnav"><span>Discover</span><span>Adversarial</span><span className="on">Govern</span><span>Guardrails</span></div>
                <div className="wh"><span className="t">FINDINGS . FND-0141</span><span className="st">TWO FINDINGS, ONE DELTA</span></div>
                <div className="wbody">
                  <div className="cols">
                    <div className="idpanel pcard">
                      <div className="badge">&#916;</div>
                      <div className="fid">FND-0141</div>
                      <b>Model bucket access</b>
                      <span className="sev">MAJOR NONCONFORMITY</span>
                      <div className="cps"><span className="cp">ISO 42001 &#183; A.4.2</span><span className="cp">EU AI ACT &#183; ART. 15</span></div>
                      <div className="cap">The documented control is not operating. <b>Two findings, one delta.</b></div>
                    </div>
                    <div className="delta">
                      <div className="drow"><span className="k">CLAIM</span>
                        <span className="tx">"Model bucket access is restricted to engineering."</span>
                        <span className="src">CTO &#183; INTERVIEW</span></div>
                      <div className="dsep">=</div>
                      <div className="drow doc"><span className="k">DOCUMENT</span>
                        <span className="tx">Access Control Policy v3: least privilege, engineering only.</span>
                        <span className="src">REVISED 2024</span></div>
                      <div className="dsep div">REALITY DIVERGES &#8800;</div>
                      <div className="drow real"><span className="k">REALITY</span>
                        <span className="tx">IAM: <b>14 principals</b>, 3 non-engineering, 1 service account with *.</span>
                        <span className="src">COLLECTOR &#183; 14 JUL &#183; 04:12</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= 03 GOVERN ================= */}
        <section className="feat flip" id="f-govern">
          <div className="wrap feat-in">
            <div className="cpy">
              <div className="prob fx" data-i="pb3">PROBLEM: A DOCUMENT IS NOT PROOF</div>
              <h3 className="fx" data-i="h33">Map every system to the law that applies</h3>
              <p className="fx" data-i="p3">Every requirement is checked against your live system, and marked conforming only when a named person confirms it on the record.</p>
            </div>
            <div className="winbox">
              <div className="win" dir="ltr">
                <div className="pillnav"><span>Discover</span><span>Adversarial</span><span className="on">Govern</span><span>Guardrails</span></div>
                <div className="win-in">
                  <aside className="side">
                    <div className="shh"><span className="bk">&#8249;</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.4 10.4 3.6v3C10.4 8.9 8.6 10.4 6 11 3.4 10.4 1.6 8.9 1.6 6.6v-3L6 1.4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                      Govern</div>
                    <div className="si on"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 6.4 5 9l4.6-5.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>Conformance</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Frameworks</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 2v5M6 9.4v.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Findings</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>Evidence</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2.2 6.4 4.6 8.8 9.8 3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Sign-off queue</div>
                    <div className="si dim"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.2"/><path d="M6 3.6V6l1.8 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Audit trail</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4.4h4M4 6.6h2.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>Statement of Applicability</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>AI Inventory</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M6 1.6v8.8M1.6 6h8.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Risk Classification</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.2"/><path d="M1.8 10.4c.6-2 2.2-3 4.2-3s3.6 1 4.2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Agent Constraints</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 9.6V6.4M6 9.6V2.8M9.6 9.6V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Compliance Reporting</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Continuous Dashboard</div>
                  </aside>
                  <div className="main">
                    <div className="mh"><b>Governance</b></div>
                    <div className="krow k4">
                      <div className="kc"><div className="kl">REQUIREMENTS ASSESSED</div>
                        <div className="kv"><span className="num" data-to="61"></span><small>/187</small></div></div>
                      <div className="kc r"><div className="kl">MAJOR NONCONFORMITIES</div>
                        <div className="kv"><span className="num" data-to="3"></span></div></div>
                      <div className="kc a"><div className="kl">MINOR NONCONFORMITIES</div>
                        <div className="kv"><span className="num" data-to="7"></span></div></div>
                      <div className="kc g"><div className="kl">CONFORMING</div>
                        <div className="kv"><span className="num" data-to="34"></span><small>%</small></div></div>
                    </div>
                    <div className="krow" style={{gridTemplateColumns:"1fr 1fr"}}>
                      <div className="pcard">
                        <div className="ph"><h4>Conformance by framework</h4><em>OF ASSESSED</em></div>
                        <div className="cbar"><span className="fn">EU AI Act</span><span className="stack"><i className="sg" data-w="34"></i><i className="sa" data-w="12"></i><i className="sr" data-w="8"></i></span><span className="cv">18 / 33 assessed</span></div>
                        <div className="cbar"><span className="fn">ISO/IEC 42001</span><span className="stack"><i className="sg" data-w="20"></i><i className="sa" data-w="8"></i><i className="sr" data-w="4"></i></span><span className="cv">24 / 76 assessed</span></div>
                        <div className="cbar"><span className="fn">ISO/IEC 23894</span><span className="stack"><i className="sg" data-w="16"></i><i className="sa" data-w="7"></i><i className="sr" data-w="4"></i></span><span className="cv">11 / 41 assessed</span></div>
                        <div className="cbar"><span className="fn">NIST AI RMF</span><span className="stack"><i className="sg" data-w="12"></i><i className="sa" data-w="6"></i><i className="sr" data-w="4"></i></span><span className="cv">8 / 37 assessed</span></div>
                        <div className="legend"><span className="lg">Conforming</span><span className="la">Partial</span><span className="lr">Nonconforming</span><span>Not assessed</span></div>
                      </div>
                      <div className="pcard matrix">
                        <div className="ph"><h4>Risk matrix</h4><em>OVERLAPPING FINDINGS COMPOUND</em></div>
                        <span className="rescan">&#10227; RESCAN</span>
                        <svg viewBox="0 0 300 168" aria-hidden="true">
                          <defs>
                            <radialGradient id="hotr" cx="50%" cy="50%" r="55%">
                              <stop offset="0%" stopColor="var(--red)" stopOpacity=".5"/>
                              <stop offset="100%" stopColor="var(--red)" stopOpacity="0"/>
                            </radialGradient>
                            <radialGradient id="hotb" cx="50%" cy="50%" r="55%">
                              <stop offset="0%" stopColor="var(--blue)" stopOpacity=".42"/>
                              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0"/>
                            </radialGradient>
                          </defs>
                          <g stroke="var(--rule-soft)" strokeWidth="1">
                            <path d="M44 8H292M44 38H292M44 68H292M44 98H292M44 128H292"/>
                            <path d="M44 8V128M93.6 8V128M143.2 8V128M192.8 8V128M242.4 8V128M292 8V128"/>
                          </g>
                          <ellipse className="blob" cx="228" cy="42" rx="86" ry="52" fill="url(#hotr)"/>
                          <ellipse className="blob" cx="150" cy="88" rx="98" ry="52" fill="url(#hotb)"/>
                          <g font-family="JetBrains Mono,monospace" font-size="6.5" fill="var(--ink-3)" letter-spacing=".08em">
                            <text x="38" y="25" textAnchor="end">CATASTROPHIC</text>
                            <text x="38" y="55" textAnchor="end">MAJOR</text>
                            <text x="38" y="85" textAnchor="end">MODERATE</text>
                            <text x="38" y="115" textAnchor="end">MINOR</text>
                            <text x="68" y="140" textAnchor="middle">RARE</text>
                            <text x="118" y="140" textAnchor="middle">UNLIKELY</text>
                            <text x="168" y="140" textAnchor="middle">POSSIBLE</text>
                            <text x="217" y="140" textAnchor="middle">LIKELY</text>
                            <text x="267" y="140" textAnchor="middle">ALMOST CERTAIN</text>
                          </g>
                          <g className="pt">
                            <rect x="50" y="13" rx="7" width="80" height="14" fill="var(--amber-w)" stroke="var(--amber)" strokeWidth=".8"/>
                            <text x="90" y="23" textAnchor="middle" font-family="JetBrains Mono,monospace" font-size="6.3" fill="var(--amber)" letter-spacing=".08em">RISK APPETITE</text>
                            <path d="M132 24 176 60" stroke="var(--red)" strokeWidth="1" opacity=".55"/>
                            <path d="M236 30 210 52M256 40 226 78" stroke="var(--red)" strokeWidth="1" opacity=".6"/>
                            <circle cx="236" cy="30" r="4" fill="var(--surface)" stroke="var(--red)" strokeWidth="1.4"/>
                            <circle cx="256" cy="40" r="4" fill="var(--surface)" stroke="var(--red)" strokeWidth="1.4"/>
                            <circle cx="210" cy="52" r="4" fill="var(--surface)" stroke="var(--amber)" strokeWidth="1.4"/>
                            <circle cx="168" cy="76" r="4" fill="var(--surface)" stroke="var(--ink-3)" strokeWidth="1.4"/>
                            <circle cx="150" cy="92" r="4" fill="var(--surface)" stroke="var(--ink-3)" strokeWidth="1.4"/>
                            <circle cx="128" cy="84" r="4" fill="var(--surface)" stroke="var(--ink-3)" strokeWidth="1.4"/>
                            <circle cx="186" cy="92" r="4" fill="var(--surface)" stroke="var(--ink-3)" strokeWidth="1.4"/>
                            <circle cx="226" cy="78" r="4" fill="var(--surface)" stroke="var(--amber)" strokeWidth="1.4"/>
                            <circle cx="204" cy="112" r="4" fill="var(--surface)" stroke="var(--violet)" strokeWidth="1.4"/>
                          </g>
                        </svg>
                        <div className="mx-cap">The darkest patch is <b>Moderate &#215; Possible</b>, three findings deep. No single one of them would draw the eye alone.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= 04 GUARDRAILS ================= */}
        <section className="feat" id="f-guardrails">
          <div className="wrap feat-in">
            <div className="cpy">
              <div className="prob fx" data-i="pb4">PROBLEM: THE LEAK HAPPENS BEFORE THE REVIEW</div>
              <h3 className="fx" data-i="h34">Catch the leak before it reaches the model</h3>
              <p className="fx" data-i="p4">Every prompt is inspected before it reaches the model. Masked or blocked, in English and Roman Urdu, and the rare one that gets through is logged.</p>
            </div>
            <div className="winbox">
              <div className="win warn" dir="ltr">
                <div className="pillnav"><span>Discover</span><span>Adversarial</span><span>Govern</span><span className="on">Guardrails</span></div>
                <div className="win-in">
                  <aside className="side">
                    <div className="shh"><span className="bk">&#8249;</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.4 10.4 3.6v3C10.4 8.9 8.6 10.4 6 11 3.4 10.4 1.6 8.9 1.6 6.6v-3L6 1.4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                      Guardrails</div>
                    <div className="si on"><svg viewBox="0 0 12 12" fill="none"><path d="M1.8 6h2l1.4-3 1.6 6 1.4-3h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>Activity monitor</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" strokeWidth="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Detectors</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><path d="M2 3.4h8M2 6h8M2 8.6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Event stream</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><rect x="2" y="1.6" width="8" height="8.8" rx="1.4" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4.4h4M4 6.6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>Policies</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="6" r="1.4" fill="currentColor"/></svg>Retrieval inspection</div>
                    <div className="si dim"><svg viewBox="0 0 12 12" fill="none"><path d="M2.4 9.6V6.4M6 9.6V2.8M9.6 9.6V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Policy simulation</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="5.4" cy="5.4" r="3.6" stroke="currentColor" strokeWidth="1.3"/><path d="M8.2 8.2 10.6 10.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Prompt Inspection</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><rect x="1.8" y="3" width="8.4" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><path d="M3.6 6h4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>Masking &amp; Redaction</div>
                    <div className="si"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.2"/><path d="M1.8 6h8.4M6 1.8c1.6 1.4 1.6 7 0 8.4M6 1.8c-1.6 1.4-1.6 7 0 8.4" stroke="currentColor" strokeWidth="1"/></svg>Bilingual Detection</div>
                  </aside>
                  <div className="main">
                    <div className="mh"><b>Guardrails</b></div>
                    <div className="crit">
                      <div className="ck">&#9650; 1 LEAK IN THE LAST 24 HOURS</div>
                      <b>Personal data reached the model unmasked.</b>
                      <p>A candidate's national ID and date of birth passed through in a retrieved document, not the user's prompt, so the input filter never saw it. The retrieval path is not inspected. That is the gap.</p>
                      <span className="cl">View event &#8594;</span>
                    </div>
                    <div className="krow k4">
                      <div className="kc"><div className="kl">PROMPTS INSPECTED</div><div className="kv"><span className="num" data-to="12847"></span></div></div>
                      <div className="kc g"><div className="kl">MASKED</div><div className="kv"><span className="num" data-to="1204"></span></div></div>
                      <div className="kc a"><div className="kl">BLOCKED</div><div className="kv"><span className="num" data-to="38"></span></div></div>
                      <div className="kc r"><div className="kl">LEAKED</div><div className="kv"><span className="num" data-to="1"></span></div></div>
                    </div>
                    <div className="filts"><i className="on">ALL 1,243</i><i>LEAKED 1</i><i>BLOCKED 38</i><i>MASKED 1,204</i></div>
                    <div className="pcard">
                      <div className="lg"><span className="ts">04:12:07</span>
                        <span className="tx">Summarise this candidate's background for the hiring panel:</span>
                        <span className="tk rr">&#8230;retrieved: CV_8841.pdf</span>
                        <span className="tk rr">NATIONAL_ID</span><span className="tk rr">DOB</span><span className="tk">NAME</span><span className="chip r">LEAKED</span></div>
                      <div className="lg"><span className="ts">03:58:41</span>
                        <span className="tx">Check if [PAYMENT_CARD] matches the account on file for [NAME]</span>
                        <span className="tk">PAYMENT_CARD</span><span className="tk">NAME</span><span className="chip a">BLOCKED</span></div>
                      <div className="lg"><span className="ts">03:44:19</span>
                        <span className="tx">Score this CV against the role. Candidate: [NAME], [EMAIL], [PHONE]</span>
                        <span className="tk">NAME</span><span className="tk">EMAIL</span><span className="tk">PHONE</span><span className="chip g">MASKED</span></div>
                      <div className="lg"><span className="ts">03:31:02</span>
                        <span className="tx">Candidate mentioned [HEALTH_CONDITION] in their cover letter. Should this affect scoring?</span>
                        <span className="tk">HEALTH</span><span className="tk">SPECIAL_CAT</span><span className="chip g">MASKED</span></div>
                      <div className="lg"><span className="ts">02:19:55</span>
                        <span className="tx">Rank these 40 applicants. [NAME_1..40], [EMAIL_1..40]</span>
                        <span className="tk">NAME &#215;40</span><span className="tk">EMAIL &#215;40</span><span className="chip g">MASKED</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* ================= FOOT ================= */}
        <footer className="pfoot">
          <div className="wrap pfoot-in">
            <span>TAHARA AI &#183; CONTINUOUS ASSURANCE PLATFORM</span>
            <span className="sp">SAFE &#183; ETHICAL &#183; TRANSPARENT</span>
          </div>
        </footer>
      
      </div>
      </div>
    </div>
  );
}
