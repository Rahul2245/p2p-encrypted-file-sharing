import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect scroll to trigger the animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        
        {/* --- LOGO --- */}
        <div className="brand-section">
          <img src={logo} alt="PeerVault" className="logo" />
          <div className="brand-info">
            <span className="brand-title">
              Peer<span className="text-gold">Vault</span>
            </span>
            <span className="brand-subtitle">Zero Knowledge Sharing</span>
          </div>
        </div>

        {/* --- DESKTOP NAV --- */}
        <nav className="desktop-nav">
          {["Share", "Receive", "How it works", "Security", "About Us"].map((item, index) => {
            // Helper to convert text to path: "How it works" -> "/how-it-works"
            const path = item === "Share" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <NavLink 
                key={index} 
                to={path} 
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item}
                <span className="glow-dot"></span>
              </NavLink>
            );
          })}
        </nav>

        {/* --- MOBILE HAMBURGER --- */}
        <button 
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* --- MOBILE OVERLAY --- */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-links">
             {["Share", "Receive", "How it works", "Security", "About Us"].map((item) => {
               const path = item === "Share" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`;
               return (
                 <NavLink to={path} key={item}>{item}</NavLink>
               );
             })}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;