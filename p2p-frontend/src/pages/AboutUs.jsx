import React from 'react';
import "./aboutus.css";
import Rahul from "../assets/Rahul.jpeg";
import Raga from "../assets/Raga.jpeg";




const AboutUs = () => {
  // --- PREVIOUS DATA (Features) ---
  const features = [
    {
      title: "The Problem",
      description: "Traditional platforms rely on centralized clouds, impose size limits, and scan your data, raising serious privacy concerns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      )
    },
    {
      title: "Our Solution",
      description: "Direct P2P connections with military-grade end-to-end encryption. Your files go straight to the recipient, never touching a server.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      title: "Core Values",
      description: "Privacy-first architecture, zero-knowledge security, lightning-fast transfers, and accessibility for everyone.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      title: "Technology",
      description: "Built on WebRTC for direct data streams and modern AES-GCM encryption, ensuring speed without compromising safety.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      title: "Who It’s For",
      description: "Whistleblowers, journalists, developers, and anyone who refuses to trade their privacy for convenience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      title: "Our Mission",
      description: "To return control of data to the people. Simple, borderless, and absolutely secure file sharing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
      )
    },
  ];

  const teamMembers = [
  
  {
    name: "Raga Hasini Kalluri",
    role: "Frontend & Socket Implementation ",
    description: "Student frontend developer focused on learning React and modern UI design. Contributed to building responsive interfaces and implementing socket-based signaling for real-time features in academic and collaborative projects.",
    image: Raga
  },

  {
    name: "Rahul Gajula",
    role: "Backend & WebRTC",
    description: "Computer science student with practical experience in backend development and real-time communication concepts. Worked on designing backend logic and exploring WebRTC connections and peer-to-peer communication as part of academic project.",
    image: Rahul
  }
];


  return (
    <main className="about-page">
      {/* Background decoration */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="about-container">
        
        {/* --- SECTION 1: HEADER --- */}
        <header className="about-header">
          <h1>About <span className="text-gradient">PeerVault</span></h1>
          <p className="about-intro">
            PeerVault is a decentralized platform allowing you to transfer files 
            directly between devices. No clouds. No tracking. No limits.
          </p>
        </header>

        {/* --- SECTION 2: FEATURES GRID --- */}
        <section className="about-grid">
          {features.map((item, index) => (
            <div className="about-card" key={index}>
              <div className="card-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        {/* --- SECTION 3: DEVELOPERS (NEW) --- */}
        <section className="team-section">
          <h2 className="team-title">Meet the <span className="text-gradient">Developers</span></h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-img-wrapper">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: CTA --- */}
        <div className="about-cta">
          <button className="cta-button">
            Start Secure Transfer
            <svg className="cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

      </div>
    </main>
  );
};

export default AboutUs;