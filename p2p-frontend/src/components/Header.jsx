import "./header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        {/* LEFT: Logo + Brand */}
        <div className="brand">
          <img src={logo} alt="PeerVault Logo" className="logo" />

          <div className="brand-text">
            <span className="brand-name">
              Peer<span className="brand-accent">Vault</span>
            </span>
            <span className="brand-tagline">
              Nothing stored, everything shared
            </span>
          </div>
        </div>

        {/* RIGHT: Navigation */}
        <nav className="nav">
          <Link to="/receive">Receive</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/about">About us</Link>
          <Link to="/security" className="nav-highlight">
            Security
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;