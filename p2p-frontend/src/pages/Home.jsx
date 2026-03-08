import "./home.css";
import { Link } from "react-router-dom";
import { FaLink, FaLock, FaClock, FaGlobe } from "react-icons/fa";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <h1>
          Secure <span>Peer-to-Peer</span>
          <br />
          File Sharing
        </h1>

        <p className="hero-text">
          PeerVault allows you to share files directly between devices using
          end-to-end encryption. No cloud storage, no login, no tracking —
          just fast and private peer-to-peer sharing.
        </p>

        <div className="hero-actions">
          <Link to="/upload">
            <button className="btn btn-primary">Start Sharing</button>
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>
            <FaLink className="icon" /> Direct Peer Transfer
          </h3>
          <p>
            Files are sent directly between peers using WebRTC,
            without passing through any server.
          </p>
        </div>

        <div className="feature-card">
          <h3>
            <FaLock className="icon" /> End-to-End Encrypted
          </h3>
          <p>
            Your files are encrypted before transfer and decrypted
            only on the receiver’s device.
          </p>
        </div>

        <div className="feature-card">
          <h3>
            <FaClock className="icon" /> Temporary Sessions
          </h3>
          <p>
            One-time links and QR codes ensure secure, temporary
            sharing sessions.
          </p>
        </div>

        <div className="feature-card">
          <h3>
            <FaGlobe className="icon" /> Works Everywhere
          </h3>
          <p>
            Share files across devices and networks — laptops,
            tablets, and phones.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;