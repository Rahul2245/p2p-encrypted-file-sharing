import React from 'react';
import { useNavigate } from 'react-router-dom';
import './error.css';

const Error = () => {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      {/* Background Effects */}
      <div className="noise-overlay"></div>
      <div className="scan-line"></div>
      
      {/* Decorative Background Elements */}
      <div className="error-glow error-glow-1"></div>
      <div className="error-glow error-glow-2"></div>

      <div className="error-container">
        {/* The Glitching 404 */}
        <div className="glitch-wrapper">
          <h1 className="glitch-text" data-text="404">404</h1>
        </div>

        <div className="error-icon-zone">
          <svg viewBox="0 0 24 24" fill="none" className="broken-link-icon">
             <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="error-title">Signal Lost in the Void</h2>
        <p className="error-desc">
          The coordinates you entered point to a null sector. 
          This file might have been deleted, expired, or never existed in this dimension.
        </p>

        <div className="error-actions">
          <button onClick={() => navigate('/')} className="home-button">
            <span className="btn-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Return to Base
            </span>
          </button>
        </div>

        <div className="tech-readout">
          <span>ERR_CODE: NULL_POINTER</span>
          <span>SYSTEM: DISCONNECTED</span>
          <span>PROTOCOL: HALTED</span>
        </div>
      </div>
    </main>
  );
};

export default Error;