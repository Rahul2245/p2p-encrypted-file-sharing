import "./footer.css";
import logo from "../assets/logo.png";

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
            <li>Send file</li>
            <li>Receive</li>
            <li>How it works</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li>Email</li>
            <li>GitHub</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="footer-bottom">
        © 2026 PeerVault · built for winter project
      </div>
    </footer>
  );
};

export default Footer;
