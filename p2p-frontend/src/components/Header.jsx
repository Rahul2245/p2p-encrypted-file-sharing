import { useState } from "react"; // 1. Import useState
import "./header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  // 2. State to track if the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // 3. Toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 4. Close menu when a link is clicked (UX improvement)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* LEFT: Logo + Brand */}
        {/* We use Link here so clicking logo goes home */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="PeerVault Logo" className="logo" />

          <div className="brand-text">
            <span className="brand-name">
              Peer<span className="brand-accent">Vault</span>
            </span>
            <span className="brand-tagline">
              Nothing stored, everything shared
            </span>
          </div>
        </Link>

        {/* CENTER/RIGHT: Hamburger Icon (Visible only on Mobile) */}
        <div 
          className={`hamburger ${isOpen ? "active" : ""}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* RIGHT: Navigation (Sidebar on Mobile) */}
        {/* We add the 'active' class if state is true */}
        <nav className={`nav ${isOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Share
          </Link>
          <Link to="/receive" onClick={closeMenu}>
            Receive
          </Link>
          <Link to="/how-it-works" onClick={closeMenu}>
            How it works
          </Link>
          <Link to="/aboutus" onClick={closeMenu}>
            About us
          </Link>
          <Link to="/security" onClick={closeMenu}>
            Security
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;