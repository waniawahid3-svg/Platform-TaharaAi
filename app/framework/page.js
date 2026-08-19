"use client";

import { initFramework } from "./framework-runtime";
import { useEffect } from "react";
import Link from "next/link";
export default function FrameworkPage(){
  useEffect(() => {
    const dispose = initFramework();
    return dispose;
  }, []);

  return (
    <div className="fwr">
    <header className="top">
      <div className="top-in">
        <Link className="brand" href="/overview"><span className="mk">T</span><span><b>Tahara AI</b><i>CONTINUOUS ASSURANCE</i></span></Link>
        <nav className="tnav">
          <Link href="/overview" data-lk="nOverview">Overview</Link><Link href="/governance" data-lk="nGov">Governance</Link>
          <Link className="on" href="/framework" data-lk="nFw">Frameworks</Link><a href="#" data-lk="nDisc" onClick={(e)=>e.preventDefault()}>Discovery</a>
          <a href="#" data-lk="nAdv" onClick={(e)=>e.preventDefault()}>Adversarial</a><a href="#" data-lk="nGuard" onClick={(e)=>e.preventDefault()}>Guardrails</a>
        </nav>
        <div className="top-r">
          <button className="icb" id="themeTg" aria-label="Switch theme">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8.2 8.2 0 0 1 9.6 4 8.5 8.5 0 1 0 20 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
          </button>
          <div className="seg"><button className="on" data-lang="en">EN</button><button data-lang="ar">عربي</button></div><Link className="outl" data-lk="signout" href="/">Sign out</Link>
        </div>
      </div>
      <span className="progress"></span>
    </header>

    <div className="shell">
      <div className="crumbbar"><Link href="/governance" data-lk="crumbRoot">FRAMEWORKS</Link><span className="sep">/</span><b id="crumbFw" className="keep"></b></div>

      <aside className="rail">
        <div className="rb">
          <div className="rk" data-lk="railFw">FRAMEWORK</div>
          <button className="fsw on" data-go="eu-ai-act"><span className="fsw-t"><b>EU AI Act</b><span>BINDING LAW</span></span><span className="fsw-n keep">113</span></button><button className="fsw" data-go="iso-42001"><span className="fsw-t"><b>ISO/IEC 42001:2023</b><span>CERTIFIABLE STANDARD</span></span><span className="fsw-n keep">76</span></button><button className="fsw" data-go="nist-ai-rmf"><span className="fsw-t"><b>NIST AI RMF 1.0</b><span>VOLUNTARY FRAMEWORK</span></span><span className="fsw-n keep">37</span></button>
        </div>
        <div className="rb toc-b">
          <div className="rk" data-lk="railToc">IN THIS EXTRACT</div>
          <nav className="toc" id="toc"></nav>
        </div>
        <div className="rb leg-b">
          <div className="rk" data-lk="railLeg">OUTCOMES</div>
          <div className="leg">
            <span><i className="c"></i><span data-lk="legC">CONFORM</span></span>
            <span><i className="mn"></i><span data-lk="legMn">MINOR NC</span></span>
            <span><i className="mj"></i><span data-lk="legMj">MAJOR NC</span></span>
          </div>
        </div>
      </aside>

      <main className="main">
    
      <section className="fwpage" data-fw="eu-ai-act" data-fwname="EU AI Act" hidden>
        <div className="plate hero" data-rv>
          <div className="hero-g">
            <div className="hero-main">
              <div className="hero-top">
                <div className="hero-id">
                  <span className="idmark keep law" title="Binding law"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v16M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 6 5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 6 19 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M5 8.5 2.5 14a3 3 0 0 0 5 0L5 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M19 8.5 16.5 14a3 3 0 0 0 5 0L19 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg></span>
                  <div><span className="kind">BINDING LAW</span><h1>EU AI Act</h1></div>
                </div>
                <div className="statchips keep"><span className="stat ok"><i></i>IN FORCE · 01 AUG 2024</span><span className="stat warn"><i></i>PENALTY CEILING · 7% TURNOVER</span></div>
              </div>
              <p className="lede">Regulation (EU) 2024/1689. Risk-tiered, extraterritorial. Binds you if your output is used in the Union, regardless of where you are established.</p>
            </div>
            <aside className="hero-side keep"><div className="side-k">COMPOSITION</div><div className="cbar"><i className="sa" style={{'--w':'64.60%'}}></i><i className="sb" style={{'--w':'35.40%'}}></i></div><div className="clegs"><span className="cl"><i className="sa"></i>Operator-facing <b>73</b><em className="pct">65%</em></span><span className="cl"><i className="sb"></i>Internal / member-state <b>40</b><em className="pct">35%</em></span></div><p className="cnote2">2 provisions need interpretation</p><div className="side-k" style={{marginTop:'16px'}}>EXTRACT COVERAGE</div><div className="exrow"><span className="exn"><b>5</b> / 113</span><span className="exbar"><i style={{'--w':'4.42%'}}></i></span></div></aside>
          </div>
          <div className="kband keep"><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><b className="num" data-to="113">0</b><span className="kl">Provisions</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.6" r="3.1" stroke="currentColor" strokeWidth="1.5"/><path d="M3.8 16.5c.9-3 3.2-4.5 6.2-4.5s5.3 1.5 6.2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span><b className="num" data-to="73">0</b><span className="kbar"><i style={{'--w':'65%'}}></i></span><span className="kl">Operator-facing</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="4.8" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 4.8v10.4c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3V4.8" stroke="currentColor" strokeWidth="1.5"/><path d="M4 10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3" stroke="currentColor" strokeWidth="1.5"/></svg></span><b className="num" data-to="62">0</b><span className="kl">Profile fields</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.9 7.7A2.2 2.2 0 1 1 10.4 10c-.5.3-.9.7-.9 1.3v.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9.6" cy="14.2" r=".9" fill="currentColor"/></svg></span><b className="num" data-to="2">0</b><span className="kl">Need interpretation</span></div></div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec1">How a provision becomes a monitored control</h2></div>
        <p className="secnote" data-rv data-l="sec1n">Every provision is compiled into a deterministic rule over your system profile, a probe that observes the live system, and a defined set of evidence that satisfies it. No model decides whether an obligation applies.</p>
        <div className="plate method" data-rv>
          <div className="mrow">
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><rect x="5" y="2.5" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7h6M8 10.2h6M8 13.4h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m1">Obligation</h3><p data-l="m1p">The provision as written, verbatim with its citation. The law is never paraphrased.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M11 3.2v2.3M11 16.5v2.3M18.8 11h-2.3M5.5 11H3.2M16.4 5.6l-1.6 1.6M7.2 14.8l-1.6 1.6M16.4 16.4l-1.6-1.6M7.2 7.2 5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m2">Control</h3><p data-l="m2p">A deterministic rule over your declared profile. The build fails if a rule reads an undeclared field.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="4.4" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="1.2" fill="currentColor"/></svg></span><h3 data-l="m3">Probe</h3><p data-l="m3p">What the collector reads from the live system to test whether the control is operating.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><path d="M11 3 17.5 5.6v5c0 4.4-2.7 7.3-6.5 8.4-3.8-1.1-6.5-4-6.5-8.4v-5L11 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="m7.9 11.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3 data-l="m4">Evidence</h3><p data-l="m4p">What satisfies the control, and what each finding obliges you to produce.</p></div>
          </div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec2">Control register</h2><span className="secr keep">113 PROVISIONS</span></div>

        <div className="regbar keep" data-rv>
          <label className="rsw"><svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.5"/><path d="m10.6 10.6 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input className="regsearch" type="search" placeholder="Search obligations…" aria-label="Search obligations" /></label>
          <div className="fchips" role="group">
            <button className="fchip on" data-f="all">ALL</button>
            <button className="fchip" data-f="ctrl">CONTROLS</button>
            <button className="fchip" data-f="gate">GATES</button>
          </div>
          <span className="rcount"><b className="rc-n">5</b> SHOWN · 4 CONTROLS · 1 GATES</span>
          <span className="rsp"></span>
          <button className="xa" data-x="1">EXPAND ALL</button>
          <span className="rdot">·</span>
          <button className="xa" data-x="0">COLLAPSE ALL</button>
        </div>

        <div className="oblist">
        <article className="plate ob open" id="eu-ai-act-ob-0" data-type="gate" data-search="art. 6(2) high-risk classification: annex iii “ai systems referred to in annex iii shall be considered to be high-risk.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="true">
            <span className="ref">Art. 6(2)</span>
            <span className="tt"><b>High-risk classification: Annex III</b><i>3 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag gate">GATE</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“AI systems referred to in Annex III shall be considered to be high-risk.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule"><span className="fld">system.is_ai_system</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">system.available_in_eu</span> <span className="op">||</span> <span className="fld">system.output_used_in_eu</span>
    <span className="op">&&</span> size(<span className="fld">system.annex_iii_domains</span>) <span className="op">&gt;</span> <span className="lit">0</span>
    <span className="op">&&</span> <span className="op">!</span>(<span className="lit">'none'</span> in <span className="fld">system.annex_iii_domains</span>)</code></div>
                    <p className="cnote">One of only <b>two</b> provisions in the whole Regulation that needs a model: to decide whether a free-text intended purpose falls inside an Annex III area. Everything else is a boolean.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T0</span><span className="t">Intended purpose extracted from your architecture doc and model card</span></div><div className="pli"><span className="tier">T1</span><span className="t">Product marketing copy and API docs scanned for use-case language</span></div><div className="pli"><span className="tier">T2</span><span className="t">Model registry read: what the deployed model is actually scored against</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF NOT ANNEX III</span><p>A <b>documented intended purpose</b>, human-attested, that falls outside all eight Annex III areas. A machine extraction is <b>not enough</b>. An exclusion here removes the entire high-risk regime, so it requires your signature.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF IS ANNEX III</span><p>Nothing to produce yet, but Articles 9–15, 17, 43, 48 and 49 now all engage. This obligation is a <b>gate</b>, not a control.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 Cl. 6.1.4</span><span className="m">ISO 42005 §5</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="eu-ai-act-ob-1" data-type="ctrl" data-search="art. 6(3) derogation from high-risk classification “…shall not be considered high-risk where it does not pose a significant risk of harm… notwithstanding, an ai system shall always be considered high-risk where it performs profiling of natural persons.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">Art. 6(3)</span>
            <span className="tt"><b>Derogation from high-risk classification</b><i>3 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“…shall not be considered high-risk where it does not pose a significant risk of harm… Notwithstanding, an AI system shall always be considered high-risk where it performs profiling of natural persons.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule"><span className="op">//</span> ADJUDICATED: interpretive
    <span className="fld">system.annex_iii_profiling</span> <span className="op">==</span> <span className="lit">true</span>
      <span className="op">→</span> derogation UNAVAILABLE <span className="op">//</span> absolute bar, no balancing</code></div>
                    <p className="cnote">The final subparagraph is an <b>absolute bar</b>. Not a factor to be weighed. A hard stop. This is the provision most tools get wrong, and they get it wrong in the dangerous direction: clearing a system that should have been high-risk.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T0</span><span className="t">Model card and architecture read for evaluative language about individuals</span></div><div className="pli"><span className="tier">T2</span><span className="t">Model output schema inspected: does it emit a per-person score, rank or grade?</span></div><div className="pli"><span className="tier">T2</span><span className="t">Feature list read from the model registry: are personal attributes inputs?</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF DEROGATION AVAILABLE</span><p><b>Documented assessment</b> against all four Art. 6(3) grounds, plus an attested statement that the system performs no profiling. Registration under Art. 49 is <b>still required</b>. The derogation does not exempt you from that.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF DEROGATION BARRED</span><p>No evidence will help. Profiling is dispositive. Proceed to the full high-risk regime.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 Cl. 6.1.4</span><span className="m">GDPR Art. 22</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="eu-ai-act-ob-2" data-type="ctrl" data-search="art. 9 risk management system “a risk management system shall be established, implemented, documented and maintained… as a continuous iterative process planned and run throughout the entire lifecycle.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">Art. 9</span>
            <span className="tt"><b>Risk management system</b><i>3 probes · 3 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill minor" title="minor outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“A risk management system shall be established, implemented, documented and maintained… as a continuous iterative process planned and run throughout the entire lifecycle.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">IS_HIGH_RISK
    <span className="op">&&</span> <span className="fld">org.role_provider</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">→</span> requires: <span className="fld">lifecycle.has_risk_management_system</span></code></div>
                    <p className="cnote">Note the wording: <b>continuous iterative process</b>, not a document. A risk register with three entries from 2024 does not satisfy this, and an auditor will say so.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T1</span><span className="t">Document store and repo searched for a risk register, risk policy, FRIA</span></div><div className="pli"><span className="tier">T1</span><span className="t">Ticketing system read for risk-review records. <b>When did you last run one?</b></span></div><div className="pli"><span className="tier">T3</span><span className="t">Review cadence measured against your own declared policy</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>A risk management <b>policy</b>, a populated <b>register</b>, and, the part that matters, <b>records of at least three review cycles</b> within the stated cadence. Having the policy is a ten-second check. Showing you followed it is the audit.</p></div><div className="ev minor"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><path d="M7 2 12.6 11.6H1.4L7 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 6v2.4M7 10.4v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF DOCUMENTED, NOT OPERATING</span><p>Policy and register exist; no review records in the observation window. <b>Minor NC.</b> Produce the last three review minutes, or run one.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF ABSENT</span><p>No AI-specific risk process. An ISO 27001 register does <b>not</b> satisfy this. It addresses information security risk, not risk to fundamental rights.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 Cl. 6.1.2</span><span className="m">ISO 23894 §6</span><span className="m">NIST MAP-1.1</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="eu-ai-act-ob-3" data-type="ctrl" data-search="art. 12 record-keeping “high-risk ai systems shall technically allow for the automatic recording of events (logs) over the lifetime of the system.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">Art. 12</span>
            <span className="tt"><b>Record-keeping</b><i>3 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“High-risk AI systems shall technically allow for the automatic recording of events (logs) over the lifetime of the system.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">IS_HIGH_RISK
    <span className="op">→</span> requires: <span className="fld">lifecycle.has_automatic_logging</span> <span className="op">==</span> <span className="lit">true</span></code></div>
                    <p className="cnote">This is the obligation continuous discovery is <b>best</b> at. A snapshot audit asks “is logging enabled?” and gets told yes. We watch the log sequence and notice when it <b>stops</b>.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T2</span><span className="t">Logging configuration read: enabled, retention period, immutability</span></div><div className="pli"><span className="tier">T3</span><span className="t">Log <b>sequence completeness</b> checked: gaps, not contents</span></div><div className="pli"><span className="tier">T3</span><span className="t">Retention verified against the period you declared</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>Logging config, retention policy, and a <b>continuous, gap-free sequence</b> over the observation window. The collector never reads log <i>contents</i>, only that the records exist and are unbroken.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF SEQUENCE GAP</span><p>Logging is configured but the trail has a <b>3-day hole</b>. Produce an incident record explaining it, or the control is not operating. This is exactly the failure a point-in-time audit cannot see.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 A.6.2.8</span><span className="m">ISO 27001 A.8.15</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="eu-ai-act-ob-4" data-type="ctrl" data-search="art. 14 human oversight “high-risk ai systems shall be designed… such that they can be effectively overseen by natural persons during the period in which they are in use.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">Art. 14</span>
            <span className="tt"><b>Human oversight</b><i>3 probes · 3 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill minor" title="minor outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“High-risk AI systems shall be designed… such that they can be effectively overseen by natural persons during the period in which they are in use.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">IS_HIGH_RISK
    <span className="op">→</span> requires: <span className="fld">system.human_oversight_possible</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">system.autonomy_level</span> <span className="op">!=</span> <span className="lit">'fully_autonomous'</span></code></div>
                    <p className="cnote">The word doing the work is <b>effectively</b>. A human who rubber-stamps 98% of outputs is not oversight. They are a liability shield, and the Regulation anticipates that.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T2</span><span className="t">Decision pipeline inspected for an auto-action path that bypasses review</span></div><div className="pli"><span className="tier">T3</span><span className="t"><b>Override rate measured.</b> If humans never disagree with the model, oversight is nominal.</span></div><div className="pli"><span className="tier">T3</span><span className="t">Confidence thresholds read: is there an auto-reject above a score?</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF EFFECTIVE</span><p>A documented oversight procedure, <b>plus</b> an observed override rate that shows humans actually intervene. Both. A procedure alone proves nothing.</p></div><div className="ev minor"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><path d="M7 2 12.6 11.6H1.4L7 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 6v2.4M7 10.4v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF NOMINAL</span><p>Oversight exists on paper; the observed override rate is <b>under 2%</b>. Produce evidence the reviewer has authority, time and information to disagree, or accept the finding.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF BYPASSED</span><p>An auto-reject path operates above a confidence threshold with no human in the loop. That is an <b>autonomous adverse decision</b> about a natural person.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 A.9.2</span><span className="m">GDPR Art. 22</span><span className="m">NIST MANAGE-2.2</span></div>
            </div>
          </div>
        </article></div>
        <div className="plate nores keep" hidden><b>No matching obligations.</b> Clear the search or filters to see the full extract.</div>

        <div className="plate colo keep" data-rv>
          <div><b>Extract only.</b> Shown here are the first 5 of 113 provisions. The full control library is compiled, hash-pinned and frozen at build time. Every provision receives the same four-stage treatment, and the build fails if any rule reads a profile field that was never declared.</div>
          <div className="buildline">CONTROL LIBRARY · BUILD 2026.08.14 · DIGEST 4A7F…19E2 · FROZEN</div>
        </div>
      </section>
      <section className="fwpage" data-fw="iso-42001" data-fwname="ISO/IEC 42001:2023" hidden>
        <div className="plate hero" data-rv>
          <div className="hero-g">
            <div className="hero-main">
              <div className="hero-top">
                <div className="hero-id">
                  <span className="idmark keep cert" title="Certifiable standard"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5 19 6.5v5c0 5-3 8.3-7 9.5-4-1.2-7-4.5-7-9.5v-5l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m8.7 12.2 2.2 2.2 4.4-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <div><span className="kind">CERTIFIABLE STANDARD</span><h1>ISO/IEC 42001:2023</h1></div>
                </div>
                <div className="statchips keep"><span className="stat ok"><i></i>PUBLISHED · DEC 2023</span><span className="stat n"><i></i>CLAUSES 4–10 MANDATORY</span></div>
              </div>
              <p className="lede">An AI management system standard. Clauses 4–10 are mandatory; Annex A gives 38 controls you select and justify in a Statement of Applicability. The certifiable one.</p>
            </div>
            <aside className="hero-side keep"><div className="side-k">COMPOSITION</div><div className="cbar"><i className="sa" style={{'--w':'50.00%'}}></i><i className="sb" style={{'--w':'50.00%'}}></i></div><div className="clegs"><span className="cl"><i className="sa"></i>Clauses 4–10 <b>38</b><em className="pct">50%</em></span><span className="cl"><i className="sb"></i>Annex A controls <b>38</b><em className="pct">50%</em></span></div><p className="cnote2">Annex A selected and justified in the SoA</p><div className="side-k" style={{marginTop:'16px'}}>EXTRACT COVERAGE</div><div className="exrow"><span className="exn"><b>3</b> / 76</span><span className="exbar"><i style={{'--w':'3.95%'}}></i></span></div></aside>
          </div>
          <div className="kband keep"><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><b className="num" data-to="76">0</b><span className="kl">Requirements</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.6" r="3.1" stroke="currentColor" strokeWidth="1.5"/><path d="M3.8 16.5c.9-3 3.2-4.5 6.2-4.5s5.3 1.5 6.2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span><b className="num" data-to="38">0</b><span className="kbar"><i style={{'--w':'50%'}}></i></span><span className="kl">Annex A controls</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="4.8" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 4.8v10.4c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3V4.8" stroke="currentColor" strokeWidth="1.5"/><path d="M4 10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3" stroke="currentColor" strokeWidth="1.5"/></svg></span><b className="num" data-to="SoA">SoA</b><span className="kl">Central artefact</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.9 7.7A2.2 2.2 0 1 1 10.4 10c-.5.3-.9.7-.9 1.3v.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9.6" cy="14.2" r=".9" fill="currentColor"/></svg></span><b className="num" data-to="3yr">3yr</b><span className="kl">Cert cycle</span></div></div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec1">How a provision becomes a monitored control</h2></div>
        <p className="secnote" data-rv data-l="sec1n">Every provision is compiled into a deterministic rule over your system profile, a probe that observes the live system, and a defined set of evidence that satisfies it. No model decides whether an obligation applies.</p>
        <div className="plate method" data-rv>
          <div className="mrow">
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><rect x="5" y="2.5" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7h6M8 10.2h6M8 13.4h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m1">Obligation</h3><p data-l="m1p">The provision as written, verbatim with its citation. The law is never paraphrased.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M11 3.2v2.3M11 16.5v2.3M18.8 11h-2.3M5.5 11H3.2M16.4 5.6l-1.6 1.6M7.2 14.8l-1.6 1.6M16.4 16.4l-1.6-1.6M7.2 7.2 5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m2">Control</h3><p data-l="m2p">A deterministic rule over your declared profile. The build fails if a rule reads an undeclared field.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="4.4" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="1.2" fill="currentColor"/></svg></span><h3 data-l="m3">Probe</h3><p data-l="m3p">What the collector reads from the live system to test whether the control is operating.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><path d="M11 3 17.5 5.6v5c0 4.4-2.7 7.3-6.5 8.4-3.8-1.1-6.5-4-6.5-8.4v-5L11 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="m7.9 11.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3 data-l="m4">Evidence</h3><p data-l="m4p">What satisfies the control, and what each finding obliges you to produce.</p></div>
          </div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec2">Control register</h2><span className="secr keep">76 REQUIREMENTS ACROSS CLAUSES 4–10 AND ANNEX A</span></div>

        <div className="regbar keep" data-rv>
          <label className="rsw"><svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.5"/><path d="m10.6 10.6 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input className="regsearch" type="search" placeholder="Search obligations…" aria-label="Search obligations" /></label>
          <div className="fchips" role="group">
            <button className="fchip on" data-f="all">ALL</button>
            <button className="fchip" data-f="ctrl">CONTROLS</button>
            <button className="fchip" data-f="gate">GATES</button>
          </div>
          <span className="rcount"><b className="rc-n">3</b> SHOWN · 3 CONTROLS · 0 GATES</span>
          <span className="rsp"></span>
          <button className="xa" data-x="1">EXPAND ALL</button>
          <span className="rdot">·</span>
          <button className="xa" data-x="0">COLLAPSE ALL</button>
        </div>

        <div className="oblist">
        <article className="plate ob open" id="iso-42001-ob-0" data-type="ctrl" data-search="cl. 6.1.2 ai risk assessment “the organization shall define and apply an ai risk assessment process that… produces consistent, valid and comparable results.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="true">
            <span className="ref">Cl. 6.1.2</span>
            <span className="tt"><b>AI risk assessment</b><i>3 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill minor" title="minor outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“The organization shall define and apply an AI risk assessment process that… produces consistent, valid and comparable results.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">AIMS_IN_SCOPE
    <span className="op">→</span> requires: <span className="fld">iso.risk_process_documented</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">iso.risk_criteria_defined</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">iso.risk_process_repeatable</span> <span className="op">==</span> <span className="lit">true</span></code></div>
                    <p className="cnote">The word <b>consistent</b> is the requirement. Two assessors, same system, must reach the same risk rating, which means your criteria have to be written down, not held in someone's head.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T1</span><span className="t">Risk methodology document located and read</span></div><div className="pli"><span className="tier">T1</span><span className="t">Risk register read: are ratings <b>justified</b>, or just asserted?</span></div><div className="pli"><span className="tier">T3</span><span className="t">Consistency tested: same risk category, do ratings agree across entries?</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>Documented methodology with <b>defined criteria</b>, a populated register, and evidence of application across at least one full cycle. This is the seam with <b>EU AI Act Art. 9</b>: satisfy one and you have most of the other.</p></div><div className="ev minor"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><path d="M7 2 12.6 11.6H1.4L7 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 6v2.4M7 10.4v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF INCONSISTENT</span><p>A process exists but ratings are not reproducible. Produce your risk criteria, or the results are not <i>comparable</i> in the sense the clause requires.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">EU AI Act Art. 9</span><span className="m">ISO 23894 §6</span><span className="m">NIST MAP-1.1</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="iso-42001-ob-1" data-type="ctrl" data-search="cl. 9.2 internal audit “the organization shall conduct internal audits at planned intervals to provide information on whether the ai management system conforms…”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">Cl. 9.2</span>
            <span className="tt"><b>Internal audit</b><i>3 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“The organization shall conduct internal audits at planned intervals to provide information on whether the AI management system conforms…”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">AIMS_IN_SCOPE
    <span className="op">→</span> requires: <span className="fld">iso.internal_audit_programme</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> count(<span className="fld">iso.audit_records</span>, window: <span className="lit">12mo</span>) <span className="op">&gt;</span> <span className="lit">0</span></code></div>
                    <p className="cnote"><b>This is where certifications fail.</b> Not because companies lack an audit programme, but because they have one and never ran it. The clause is satisfied by <b>records</b>, not by a plan.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T1</span><span className="t">Document store searched for internal audit reports</span></div><div className="pli"><span className="tier">T1</span><span className="t">Ticketing read for audit-related work items and their closure</span></div><div className="pli"><span className="tier">T3</span><span className="t"><b>Interval measured</b> against your own declared audit programme</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>An audit <b>programme</b>, plus <b>audit reports</b> covering the last planned interval, plus evidence that findings were <b>actioned</b>. All three. A report with open findings from 18 months ago is worse than no report.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF NO RECORDS</span><p>Programme exists; zero audits performed in 12 months. <b>Major NC.</b> This alone will stop a certification audit at the door. No argument rescues it.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">EU AI Act Art. 17</span><span className="m">ISO 27001 Cl. 9.2</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="iso-42001-ob-2" data-type="ctrl" data-search="a.4.2 ai system resources: access control “the organization shall identify and provide resources for the ai system, including… controlled access to data, tooling and computing resources.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">A.4.2</span>
            <span className="tt"><b>AI system resources: access control</b><i>4 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“The organization shall identify and provide resources for the AI system, including… controlled access to data, tooling and computing resources.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule">SOA_SELECTED(<span className="lit">'A.4.2'</span>)
    <span className="op">→</span> requires: <span className="fld">iso.access_control_documented</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">discovery.iam_matches_policy</span> <span className="op">==</span> <span className="lit">true</span></code></div>
                    <p className="cnote">This control is the <b>clearest case for continuous discovery</b> in the entire standard. The policy is static. IAM drifts every week. Only one of those two is observable.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T2</span><span className="t"><b>IAM principals enumerated</b> on model buckets, registries, training data</span></div><div className="pli"><span className="tier">T2</span><span className="t">Each principal matched against the role the policy permits</span></div><div className="pli"><span className="tier">T2</span><span className="t">Wildcard grants and service accounts flagged specifically</span></div><div className="pli"><span className="tier">T3</span><span className="t">Access changes tracked over time: is drift happening?</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>An access-control policy, <b>and an IAM state that matches it</b>. Both, simultaneously, observed. This is the triangle: what you say, what you wrote, what is true.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF DRIFT</span><p>Policy says engineering only. IAM shows <b>14 principals, 3 outside engineering, 1 wildcard service account</b>. The documented control is not operating. Two findings, one delta: the drift itself, and the <b>Clause 7.3 awareness gap</b> that let the owner believe otherwise.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">EU AI Act Art. 15</span><span className="m">ISO 27001 A.5.15</span><span className="m">NIST GOVERN-1.3</span></div>
            </div>
          </div>
        </article></div>
        <div className="plate nores keep" hidden><b>No matching obligations.</b> Clear the search or filters to see the full extract.</div>

        <div className="plate colo keep" data-rv>
          <div><b>Extract only.</b> Shown here are the first 3 of 76 requirements across Clauses 4–10 and Annex A. The full control library is compiled, hash-pinned and frozen at build time. Every provision receives the same four-stage treatment, and the build fails if any rule reads a profile field that was never declared.</div>
          <div className="buildline">CONTROL LIBRARY · BUILD 2026.08.14 · DIGEST 4A7F…19E2 · FROZEN</div>
        </div>
      </section>
      <section className="fwpage" data-fw="nist-ai-rmf" data-fwname="NIST AI RMF 1.0" hidden>
        <div className="plate hero" data-rv>
          <div className="hero-g">
            <div className="hero-main">
              <div className="hero-top">
                <div className="hero-id">
                  <span className="idmark keep vol" title="Voluntary framework"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="m14.6 9.4-3.1 2-1.1 3.2 3.1-2 1.1-3.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg></span>
                  <div><span className="kind">VOLUNTARY FRAMEWORK</span><h1>NIST AI RMF 1.0</h1></div>
                </div>
                <div className="statchips keep"><span className="stat ok"><i></i>PUBLISHED · JAN 2023</span><span className="stat n"><i></i>VOLUNTARY BASELINE</span></div>
              </div>
              <p className="lede">Voluntary, but the de-facto US baseline and increasingly referenced by Gulf regulators. Four functions: Govern, Map, Measure, Manage.</p>
            </div>
            <aside className="hero-side keep"><div className="side-k">COMPOSITION</div><div className="cbar"><i className="sa" style={{'--w':'25.00%'}}></i><i className="sb" style={{'--w':'25.00%'}}></i><i className="sc" style={{'--w':'25.00%'}}></i><i className="sd" style={{'--w':'25.00%'}}></i></div><div className="clegs"><span className="cl"><i className="sa"></i>Govern</span><span className="cl"><i className="sb"></i>Map</span><span className="cl"><i className="sc"></i>Measure</span><span className="cl"><i className="sd"></i>Manage</span></div><div className="side-k" style={{marginTop:'16px'}}>EXTRACT COVERAGE</div><div className="exrow"><span className="exn"><b>2</b> / 37</span><span className="exbar"><i style={{'--w':'5.41%'}}></i></span></div></aside>
          </div>
          <div className="kband keep"><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><rect x="4" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><b className="num" data-to="37">0</b><span className="kl">Subcategories</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.6" r="3.1" stroke="currentColor" strokeWidth="1.5"/><path d="M3.8 16.5c.9-3 3.2-4.5 6.2-4.5s5.3 1.5 6.2 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span><b className="num" data-to="4">0</b><span className="kl">Functions</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="4.8" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 4.8v10.4c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3V4.8" stroke="currentColor" strokeWidth="1.5"/><path d="M4 10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3" stroke="currentColor" strokeWidth="1.5"/></svg></span><b className="num" data-to="0">0</b><span className="kl">Penalties</span></div><div className="kc" data-rv><span className="ki"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.9 7.7A2.2 2.2 0 1 1 10.4 10c-.5.3-.9.7-.9 1.3v.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9.6" cy="14.2" r=".9" fill="currentColor"/></svg></span><b className="num" data-to="—">—</b><span className="kl">Not certifiable</span></div></div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec1">How a provision becomes a monitored control</h2></div>
        <p className="secnote" data-rv data-l="sec1n">Every provision is compiled into a deterministic rule over your system profile, a probe that observes the live system, and a defined set of evidence that satisfies it. No model decides whether an obligation applies.</p>
        <div className="plate method" data-rv>
          <div className="mrow">
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><rect x="5" y="2.5" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7h6M8 10.2h6M8 13.4h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m1">Obligation</h3><p data-l="m1p">The provision as written, verbatim with its citation. The law is never paraphrased.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M11 3.2v2.3M11 16.5v2.3M18.8 11h-2.3M5.5 11H3.2M16.4 5.6l-1.6 1.6M7.2 14.8l-1.6 1.6M16.4 16.4l-1.6-1.6M7.2 7.2 5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></span><h3 data-l="m2">Control</h3><p data-l="m2p">A deterministic rule over your declared profile. The build fails if a rule reads an undeclared field.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="4.4" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="11" r="1.2" fill="currentColor"/></svg></span><h3 data-l="m3">Probe</h3><p data-l="m3p">What the collector reads from the live system to test whether the control is operating.</p></div>
            <div className="ms"><span className="mtile"><svg viewBox="0 0 22 22" fill="none"><path d="M11 3 17.5 5.6v5c0 4.4-2.7 7.3-6.5 8.4-3.8-1.1-6.5-4-6.5-8.4v-5L11 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="m7.9 11.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span><h3 data-l="m4">Evidence</h3><p data-l="m4p">What satisfies the control, and what each finding obliges you to produce.</p></div>
          </div>
        </div>

        <div className="sechead" data-rv><h2 data-l="sec2">Control register</h2><span className="secr keep">37 SUBCATEGORIES ACROSS FOUR FUNCTIONS</span></div>

        <div className="regbar keep" data-rv>
          <label className="rsw"><svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.5"/><path d="m10.6 10.6 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input className="regsearch" type="search" placeholder="Search obligations…" aria-label="Search obligations" /></label>
          <div className="fchips" role="group">
            <button className="fchip on" data-f="all">ALL</button>
            <button className="fchip" data-f="ctrl">CONTROLS</button>
            <button className="fchip" data-f="gate">GATES</button>
          </div>
          <span className="rcount"><b className="rc-n">2</b> SHOWN · 2 CONTROLS · 0 GATES</span>
          <span className="rsp"></span>
          <button className="xa" data-x="1">EXPAND ALL</button>
          <span className="rdot">·</span>
          <button className="xa" data-x="0">COLLAPSE ALL</button>
        </div>

        <div className="oblist">
        <article className="plate ob open" id="nist-ai-rmf-ob-0" data-type="ctrl" data-search="govern-1.1 legal and regulatory requirements understood “legal and regulatory requirements involving ai are understood, managed, and documented.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="true">
            <span className="ref">GOVERN-1.1</span>
            <span className="tt"><b>Legal and regulatory requirements understood</b><i>2 probes · 1 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“Legal and regulatory requirements involving AI are understood, managed, and documented.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule"><span className="op">// this framework maps ONTO the others</span>
    <span className="fld">crosswalk.frameworks_identified</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">crosswalk.applicability_documented</span> <span className="op">==</span> <span className="lit">true</span></code></div>
                    <p className="cnote">Amusingly, <b>this subcategory is satisfied by using this product</b>. The gap assessment <i>is</i> the documented understanding of which requirements apply.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T0</span><span className="t">Frameworks in scope, and the justification for each</span></div><div className="pli"><span className="tier">T1</span><span className="t">Legal register located, if one exists</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>A documented determination of which frameworks bind you and why. Your <b>gap assessment report</b> satisfies this directly.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">ISO 42001 Cl. 4.2</span><span className="m">EU AI Act Art. 4</span></div>
            </div>
          </div>
        </article>
        <article className="plate ob" id="nist-ai-rmf-ob-1" data-type="ctrl" data-search="measure-2.7 ai system security and resilience evaluated “ai system security and resilience — as identified in the map function — are evaluated and documented.”" data-rv>
          <button className="ob-h" type="button" aria-expanded="false">
            <span className="ref">MEASURE-2.7</span>
            <span className="tt"><b>AI system security and resilience evaluated</b><i>2 probes · 2 outcomes</i></span>
            <span className="sds"><span className="opill conform" title="conform outcomes">1</span><span className="opill major" title="major outcomes">1</span></span>
            <span className="tag ctrl">CONTROL</span>
            <span className="chev"><svg viewBox="0 0 16 16" fill="none"><path d="m4 6.2 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </button>
          <div className="ob-b">
            <div className="ob-in">
              <blockquote className="quote keep">“AI system security and resilience — as identified in the MAP function — are evaluated and documented.”<span className="qc">SOURCE TEXT · VERBATIM · SHA-256 PINNED</span></blockquote>
              <div className="spine">
                <div className="stg"><span className="nd">1</span>
                  <div className="sg-b"><h4>Obligation</h4><p>Reproduced verbatim with its citation. Any amendment to the source flags every dependent report automatically.</p></div></div>
                <div className="stg"><span className="nd">2</span>
                  <div className="sg-b"><h4>Control <em>compiled rule</em></h4>
                    <div className="codewrap keep"><div className="codebar"><span>DETERMINISTIC · EVALUATED AT BUILD</span><button className="copy" type="button">COPY</button></div><code className="rule"><span className="fld">adversarial.probes_run</span> <span className="op">==</span> <span className="lit">true</span>
    <span className="op">&&</span> <span className="fld">adversarial.results_documented</span> <span className="op">==</span> <span className="lit">true</span></code></div>
                    <p className="cnote">This is the subcategory the <b>Adversarial surface</b> feeds. OWASP LLM Top 10 results map here directly.</p></div></div>
                <div className="stg"><span className="nd">3</span>
                  <div className="sg-b"><h4>Probe</h4><div className="plist keep"><div className="pli"><span className="tier">T4</span><span className="t">OWASP LLM Top 10 probed on a schedule, <b>staging only</b></span></div><div className="pli"><span className="tier">T3</span><span className="t">Results trended over time, not just a point-in-time pass</span></div></div></div></div>
                <div className="stg last"><span className="nd">4</span>
                  <div className="sg-b"><h4>Evidence</h4><div className="keep"><div className="ev conform"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="m4.6 7.2 1.7 1.7 3.1-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>IF OPERATING</span><p>Documented adversarial evaluation with <b>results over time</b>. A single pentest from last year is a point, not a trend.</p></div><div className="ev major"><span className="ef"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4"/><path d="M4.9 4.9l4.2 4.2M9.1 4.9 4.9 9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>IF FAILING</span><p>Prompt injection succeeding at <b>39%</b>. Document the finding, the remediation, and re-probe. The evidence is the <b>closure</b>, not the discovery.</p></div></div></div></div>
              </div>
              <div className="maps keep"><span className="mk">ALSO SATISFIES</span><span className="m">EU AI Act Art. 15</span><span className="m">ISO 42001 A.6.2.6</span></div>
            </div>
          </div>
        </article></div>
        <div className="plate nores keep" hidden><b>No matching obligations.</b> Clear the search or filters to see the full extract.</div>

        <div className="plate colo keep" data-rv>
          <div><b>Extract only.</b> Shown here are the first 2 of 37 subcategories across four functions. The full control library is compiled, hash-pinned and frozen at build time. Every provision receives the same four-stage treatment, and the build fails if any rule reads a profile field that was never declared.</div>
          <div className="buildline">CONTROL LIBRARY · BUILD 2026.08.14 · DIGEST 4A7F…19E2 · FROZEN</div>
        </div>
      </section>
      </main>
    </div>

    <footer className="foot"><span>TAHARA AI · CONTINUOUS ASSURANCE PLATFORM</span><span>SAFE · ETHICAL · TRANSPARENT</span></footer>
    </div>
  );
}
