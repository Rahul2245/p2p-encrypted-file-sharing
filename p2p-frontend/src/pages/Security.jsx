import React from "react";
import "./security.css";

const Security = () => {
  // Shared Gradient definition for the golden glow
  const SvgGradient = () => (
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" /> {/* Amber 400 */}
        <stop offset="100%" stopColor="#d97706" /> {/* Amber 600 */}
      </linearGradient>
    </defs>
  );

  const features = [
    {
      title: "Hybrid Cryptography",
      desc: "We combine RSA-OAEP (2048-bit) for secure key exchange with AES-GCM (256-bit) for high-speed file encryption.",
      icon: (
        // ICON: Key and Lock combined
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Chunk-Level Isolation",
      desc: "Your file is split into 16KB chunks. Each chunk gets a unique 12-byte Initialization Vector (IV). Even if one chunk is cracked, the rest remain secure.",
      icon: (
        // ICON: Broken/Separated Layers
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "SHA-256 Integrity",
      desc: "Math doesn't lie. We calculate a SHA-256 hash of your file before sending. If the received file doesn't match this fingerprint exactly, it's rejected.",
      icon: (
        // ICON: Fingerprint / Validation Check
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      )
    },
    {
      title: "Ephemeral Memory",
      desc: "Keys are generated via the Web Crypto API and exist only in volatile RAM. Reload the page, and the keys vanish forever.",
      icon: (
        // ICON: Time/Disappearing
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      )
    },
    {
      title: "DTLS 1.3 Layer",
      desc: "Beyond file encryption, the connection tunnel itself is secured with Datagram Transport Layer Security (DTLS), preventing Man-in-the-Middle attacks.",
      icon: (
        // ICON: Network Shield
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      title: "No Metadata Logs",
      desc: "We don't just hide your files; we hide the evidence. We do not store IP addresses, file names, or transfer timestamps on any database.",
      icon: (
        // ICON: File with 'Cancel' or Ghost
        <svg viewBox="0 0 24 24" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
  ];

  return (
    <main className="security-page">
      {/* Background Ambience */}
      <div className="sec-glow sec-glow-1"></div>
      <div className="sec-glow sec-glow-2"></div>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}><SvgGradient /></svg>

      <div className="sec-container">
        
        {/* HERO SECTION */}
        <section className="sec-hero">
          <div className="hero-badge">
            <span className="pulsing-dot"></span> 
            Secure Web Crypto API
          </div>
          <h1>Security Built on <br/><span className="text-gradient">Zero Trust</span> Architecture</h1>
          <p>
            PeerVault isn't just a file transfer tool. It's a secure tunnel. 
            We use a <strong>Hybrid Cryptosystem</strong> ensuring your data is mathematically impossible to intercept.
          </p>
        </section>

        {/* MAIN GRID */}
        <section className="sec-features">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-box">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </section>

        {/* PROTOCOL VISUALIZATION SECTION */}
        <section className="protocol-section">
          <h2>The Encryption Protocol</h2>
          <p className="protocol-sub">How your data travels safely (based on actual code logic)</p>
          
          <div className="protocol-steps">
            <div className="protocol-step">
              <span className="step-num">01</span>
              <h4>Handshake</h4>
              <p>Receiver generates <strong>RSA-2048</strong> keys and sends the Public Key to the Sender.</p>
            </div>
            
            <div className="protocol-connector"></div>

            <div className="protocol-step">
              <span className="step-num">02</span>
              <h4>Key Exchange</h4>
              <p>Sender generates an <strong>AES-256</strong> key, encrypts it with the RSA Public Key, and sends it back.</p>
            </div>

            <div className="protocol-connector"></div>

            <div className="protocol-step">
              <span className="step-num">03</span>
              <h4>Transfer</h4>
              <p>File is chunked, hashed (SHA-256), and encrypted (AES-GCM) with unique IVs per chunk.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Security;