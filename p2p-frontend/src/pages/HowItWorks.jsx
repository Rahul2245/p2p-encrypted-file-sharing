import React from 'react';
import "./howitworks.css";

const HowItWorks = () => {
  // --- 1. SHARED GRADIENT DEFINITION ---
  // This allows all icons to share the same "Cyber Gold" gradient
  const SvgGradient = () => (
    <defs>
      <linearGradient id="cyber-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" /> {/* Amber 400 */}
        <stop offset="50%" stopColor="#f59e0b" /> {/* Amber 500 */}
        <stop offset="100%" stopColor="#d97706" /> {/* Amber 600 */}
      </linearGradient>
      <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  const storySteps = [
    {
      id: 1,
      title: "The Old Way: The Nosy Postman",
      story: "In the old world (Cloud Storage), Leo hands his letter to a postman (Server). The postman takes it to the post office, sorts it, and reads the address. The problem? The postman—or anyone at the office—could peek inside your envelope while they hold it.",
      techTranslation: "Traditional Cloud: Your files sit on their servers. They hold the encryption keys, not you.",
      icon: (
        // ICON: Cloud with a spying eye/warning
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <SvgGradient />
          {/* Cloud Outline */}
          <path d="M5.5 16.5H4.5C3.11929 16.5 2 15.3807 2 14C2 12.8335 2.79815 11.854 3.88289 11.5861C4.05374 9.17265 6.06815 7.25 8.5 7.25C8.89201 7.25 9.27076 7.30606 9.62916 7.41163C10.4243 5.41926 12.3789 4 14.65 4C18.0475 4 20.8016 6.75406 20.8016 10.1516C20.8016 10.2704 20.7969 10.3877 20.7877 10.5034C21.4886 10.8767 21.9678 11.6133 21.9678 12.4678C21.9678 13.5901 21.0579 14.5 19.9356 14.5H19" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Spying Eye / Danger Icon */}
          <path d="M12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11Z" fill="rgba(251, 191, 36, 0.2)" stroke="url(#cyber-gold)" strokeWidth="1.5"/>
          <path d="M16 13C16 13 14.5 9 12 9C9.5 9 8 13 8 13C8 13 9.5 17 12 17C14.5 17 16 13 16 13Z" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Alert Exclamation */}
          <path d="M19 17L19 20" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="19" cy="22" r="1" fill="#ef4444"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "The New Way: The Digital Vault",
      story: "With PeerVault, Leo locks his message in a titanium vault before it ever leaves his hands. He keeps the only key. Even if a thief steals the vault during transport, they can't open it. It's just a heavy, useless metal box to them.",
      techTranslation: "End-to-End Encryption: Data is encrypted on your device (Client-Side). We never see the raw file.",
      icon: (
        // ICON: Secure Shield Vault
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <SvgGradient />
          {/* Shield Shape */}
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="rgba(251, 191, 36, 0.1)" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Internal Lock Mechanism */}
          <rect x="9" y="9" width="6" height="4" rx="1" stroke="url(#cyber-gold)" strokeWidth="1.5"/>
          <path d="M12 13V15" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 9V7.5C10 6.39543 10.8954 5.5 12 5.5C13.1046 5.5 14 6.39543 14 7.5V9" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Sparkles */}
          <path d="M18 6L19 4L20 6M4 16L5 14L6 16" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "The Meeting Spot: The Circuit Tree",
      story: "Leo and Mia meet at the 'Old Oak Tree.' But this isn't a normal tree—it's a digital signal point. The tree doesn't touch the vault; it just waves a flag so Leo can see where Mia is standing in the crowded digital park.",
      techTranslation: "Signaling Server: Handshakes the connection (SDP/ICE) but drops out once the link is established.",
      icon: (
        // ICON: Digital Tree / Network Node
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <SvgGradient />
          {/* Main Trunk */}
          <path d="M12 21V13" stroke="url(#cyber-gold)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="11" r="2" fill="rgba(251, 191, 36, 0.3)" stroke="url(#cyber-gold)" strokeWidth="1.5"/>
          {/* Left Branch */}
          <path d="M12 11L7 6" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="7" cy="6" r="1.5" fill="url(#cyber-gold)"/>
          {/* Right Branch */}
          <path d="M12 11L17 6" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="17" cy="6" r="1.5" fill="url(#cyber-gold)"/>
          {/* Signal Waves */}
          <path d="M8.5 16C8.5 16 10 14.5 12 14.5C14 14.5 15.5 16 15.5 16" stroke="url(#cyber-gold)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 18C6 18 9 17 12 17C15 17 18 18 18 18" stroke="url(#cyber-gold)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "The Hand-off: Laser-Link Transfer",
      story: "Now that they see each other, Leo shoots the vault directly to Mia through a private laser tunnel. No postman, no stops, no detours. It goes straight from his hand to hers at the speed of light.",
      techTranslation: "Peer-to-Peer (WebRTC): A direct data stream between browsers. Maximum speed, maximum privacy.",
      icon: (
        // ICON: Direct P2P Laser Connection
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <SvgGradient />
          {/* Device A */}
          <rect x="2" y="5" width="5" height="14" rx="1" stroke="url(#cyber-gold)" strokeWidth="1.5" fill="rgba(251, 191, 36, 0.05)"/>
          {/* Device B */}
          <rect x="17" y="5" width="5" height="14" rx="1" stroke="url(#cyber-gold)" strokeWidth="1.5" fill="rgba(251, 191, 36, 0.05)"/>
          {/* The Laser Beam */}
          <path d="M7 12H17" stroke="url(#cyber-gold)" strokeWidth="2" strokeDasharray="100" strokeDashoffset="0">
             <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
          </path>
          {/* Central Spark */}
          <path d="M11 9L13 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" stroke="url(#cyber-gold)" strokeWidth="1" opacity="0.5"/>
          {/* Speed Motion Lines */}
          <path d="M8 9L16 9" stroke="url(#cyber-gold)" strokeWidth="1" opacity="0.3"/>
          <path d="M8 15L16 15" stroke="url(#cyber-gold)" strokeWidth="1" opacity="0.3"/>
        </svg>
      )
    },
  ];

  return (
    <main className="hiw-page">
      {/* Background Ambience */}
      <div className="bg-glow bg-glow-top"></div>
      <div className="bg-glow bg-glow-bottom"></div>

      <div className="hiw-container">
        <header className="hiw-header">
          <h1>How <span className="text-gradient">PeerVault</span> Works</h1>
          <p className="hiw-intro">
            We ditched the servers to bring you true privacy. It’s complex technology, explained simply with a story about Leo, Mia, and a Digital Vault.
          </p>
        </header>

        {/* THE STORY TIMELINE */}
        <section className="story-timeline">
          {storySteps.map((step, index) => (
            <div className={`story-card ${index % 2 === 0 ? 'left' : 'right'}`} key={step.id}>
              
              {/* STYLED ICON CONTAINER */}
              <div className="story-illustration-box">
                <div className="icon-glow-ring"></div>
                {step.icon}
              </div>

              <div className="story-content">
                <span className="step-number">Step 0{step.id}</span>
                <h2>{step.title}</h2>
                <p className="story-text">{step.story}</p>
                <div className="tech-translation">
                  <strong>Tech Specs: </strong> {step.techTranslation}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FINAL SUMMARY */}
        <section className="hiw-summary">
          <h2>Why this is revolutionary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h3>No Middleman</h3>
              <p>Unlike cloud apps, we don't have a "post office." We have no servers to hack, scan, or impose limits on your files.</p>
            </div>
            <div className="summary-item">
              <h3>Zero Knowledge</h3>
              <p>Because you lock the box before it leaves your hands, PeerVault has "zero knowledge" of what you are sending.</p>
            </div>
            <div className="summary-item">
              <h3>Blazing Fast</h3>
              <p>The shortest distance between two points is a straight line. By skipping the server detour, your transfer speed is limitless.</p>
            </div>
          </div>

           <div className="hiw-cta">
            <button className="cta-button-large">
              Try sending a file now
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default HowItWorks;