import React from 'react';
import { useNavigate } from 'react-router-dom';
import './error.css';

const Error = () => {
  const navigate = useNavigate();

  return (
    <main className="minimal-error-page">
      <div className="content-wrapper">
        
        {/* Creative Element: The Radar 404 */}
        <div className="radar-404">
          <span>4</span>
          <div className="radar-zero">
            <div className="radar-sweep"></div>
          </div>
          <span>4</span>
        </div>

        <div className="text-content">
          <h2 className="minimal-title">File Not Found</h2>
          <p className="minimal-desc">
            We searched the entire chain, but this hash points to nothing.
          </p>
        </div>

        <button onClick={() => navigate('/')} className="gold-link-btn">
          <span className="arrow">←</span> Return to PeerVault
        </button>

      </div>
      
      {/* Subtle footer watermark */}
      <div className="watermark">ERR_NULL_SECTOR</div>
    </main>
  );
};

export default Error; 