import "./_group.css";
import "./Grounded.css";

// Grounded variant: Redesigned CTAs for a premium, confident B2B aesthetic.
export function Grounded() {
  return (
    <div className="gd-root variant-grounded">
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="gridoverlay"></div>
        <div className="hero-field"></div>
        <div className="wrap hero-inner">
          <img className="hero-logo" src="/__mockup/images/graindash-logo.png" alt="GrainDash" width={1400} height={142} />
          <h1><span className="nw">The Whole Farm.</span>{" "}<span className="grad nw">One Dashboard.</span></h1>
          <div className="hero-chips">
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20V10l3.5-3 3.5 3v10"/><path d="M3 10h7"/><path d="M13 20v-8l3.5-3 3.5 3v8"/><path d="M13 12h7"/></svg>Inventory &amp; Bin Yard</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8.4" cy="8.4" r="1.5"/></svg>Sales &amp; Contracts</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4v16h18"/><path d="M6 15l4-4 3 2 5-6"/></svg>Break-Even</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Fields &amp; Records</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h5"/></svg>Report Generation</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21v-8"/><path d="M12 13c0-3.2 2.2-5.2 6.2-5.2C18.2 11 16 13.6 12 13z"/><path d="M12 15.5c0-2.8-2-4-5-4 0 2.8 2 4.6 5 4z"/></svg>Scout AI Assistant</span>
          </div>
          <div className="hero-cta">
            <a className="btn primary" href="https://graindashapp.net">Get Started →</a>
            <a className="btn ghost" href="#download">Download the App</a>
          </div>
        </div>
      </section>
    </div>
  );
}
