import "./_group.css";
import "./FarmFirst.css";

export default function FarmFirst() {
  return (
    <section className="hero gd-farm" aria-label="GrainDash farm management">
      <div className="gd-farm-scene" aria-hidden="true" />
      <div className="gd-farm-shade" aria-hidden="true" />
      <div className="gd-farm-grain" aria-hidden="true" />
      <div className="gd-farm-wrap">
        <div className="gd-farm-copy">
          <img className="hero-logo" src="/__mockup/images/graindash-logo.png" alt="GrainDash" width="1400" height="142" fetchPriority="high" />
          <h1><span className="nw">The Whole Farm.</span> <span className="grad nw">One Dashboard.</span></h1>
          <div className="hero-chips">
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 20V10l3.5-3 3.5 3v10"/><path d="M3 10h7"/><path d="M13 20v-8l3.5-3 3.5 3v8"/><path d="M13 12h7"/></svg>Inventory &amp; Bin Yard</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8.4" cy="8.4" r="1.5"/></svg>Sales &amp; Contracts</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4v16h18"/><path d="M6 15l4-4 3 2 5-6"/></svg>Break-Even</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Fields &amp; Records</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h5"/></svg>Report Generation</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Employees &amp; Payroll</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21v-8"/><path d="M12 13c0-3.2 2.2-5.2 6.2-5.2C18.2 11 16 13.6 12 13z"/><path d="M12 15.5c0-2.8-2-4-5-4 0 2.8 2 4.6 5 4z"/></svg>Scout AI Assistant</span>
            <span className="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#3DE84C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M22 6l-10 7L2 6"/></svg>Daily Digest</span>
          </div>
          <div className="hero-cta">
            <a className="btn primary" href="https://graindashapp.net">Get Started →</a>
            <a className="btn ghost" href="https://apps.apple.com/us/app/graindash/id6798817387">Download the App</a>
          </div>
        </div>
        <div className="gd-farm-devices" aria-label="GrainDash on laptop and phone">
          <img className="gd-farm-laptop" src="/__mockup/images/laptop-overview.png" alt="GrainDash overview running on a laptop" />
          <img className="gd-farm-phone" src="/__mockup/images/phone-sales.png" alt="GrainDash sales and break-even view on a phone" />
        </div>
      </div>
    </section>
  );
}
