import React from "react";
import "./footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      {/* Decorative background blurs */}
      <div className="footer-blur-blob blob-1"></div>
      <div className="footer-blur-blob blob-2"></div>

      <div className="footer-content">
        
        {/* TOP ROW: Brand & Description */}
        <div className="footer-top">
          <div className="brand-area">
            <div className="logo-flex">
              <img src={logo} alt="PeerVault Logo" className="brand-logo" />
              <h2 className="brand-name">Peer<span className="text-gold">Vault</span></h2>
            </div>
            <p className="brand-tagline">
              Decentralized file sharing for the modern web. <br />
              Zero logs. Zero limits. Maximum speed.
            </p>
          </div>

          <div className="newsletter-area">
            <label>Join the secure revolution</label>
            <div className="input-wrapper">
              <input type="email" placeholder="email@address.com" />
              <button className="submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* MIDDLE ROW: Navigation Links */}
        <div className="footer-grid">
          
          <div className="nav-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Peer-to-Peer</a></li>
              <li><a href="#">Encryption</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API Access</a></li>
            </ul>
          </div>

          <div className="nav-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Whitepaper</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <div className="nav-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a> <span className="hiring-badge">Hiring</span></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="nav-column social-column">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#" className="social-link github">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" className="social-link twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="social-link instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="footer-bottom">
          <p>© 2026 PeerVault Inc. All rights reserved.</p>
          
          <div className="legal-links">
            <a href="#">Privacy</a>
            <span className="dot">•</span>
            <a href="#">Terms</a>
            <span className="dot">•</span>
            <a href="#">Sitemap</a>
          </div>

          <button onClick={scrollToTop} className="scroll-top-btn">
            Back to Top
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;