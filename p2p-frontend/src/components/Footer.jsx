import "./footer.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left: Logo */}
        <div className="footer-brand">
          <img src={logo} alt="PeerVault logo" className="footer-logo" />
          <h3>
            <span className="peer">Peer</span>
            <span className="vault">Vault</span>
          </h3>
        </div>

        {/* Product */}
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><Link to="/upload">Send file</Link></li>
            <li><Link to="/receive">Receive</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

    {/* Connect */}
<div className="footer-col">
  <h4>Connect</h4>
  <ul>
    <li>
      <a href="mailto:peervault4545@gmail.com">
        Gmail
      </a>
    </li>
    <li>
      <a
        href="https://github.com/Rahul2245/p2p-encrypted-file-sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </li>
    <li>
      <a
        href="https://instagram.com/peervault4545"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </li>
  </ul>
</div>

      </div>

      <div className="footer-bottom">
        © 2026 PeerVault · Nothing stored, everything shared
      </div>
    </footer>
  );
};

export default Footer;
