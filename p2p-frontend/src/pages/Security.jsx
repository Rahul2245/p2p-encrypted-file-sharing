import "./security.css";

const Security = () => {
  return (
    <main className="security-page">
      <section className="hero">
        <h1>Security You Can <span>Trust</span></h1>
        <p>
          At PeerVault, your privacy is our top priority. All transfers are end-to-end encrypted,
          temporary, and never stored on any servers. You control your data entirely.
        </p>
      </section>

      <section className="security-features">
        <div className="feature-card">
          <h2>End-to-End Encryption 🔒</h2>
          <p>Your files are encrypted before leaving your device and decrypted only on the receiver’s device.</p>
        </div>

        <div className="feature-card">
          <h2>No Storage 📂</h2>
          <p>Files never touch our servers. Nothing is stored permanently, ensuring complete privacy.</p>
        </div>

        <div className="feature-card">
          <h2>Temporary Sessions ⏱️</h2>
          <p>Files exist only for the duration of the session. Links and QR codes expire automatically.</p>
        </div>

        <div className="feature-card">
          <h2>Peer-to-Peer Only 🔗</h2>
          <p>All transfers happen directly between devices without third-party intermediaries.</p>
        </div>
      </section>
    </main>
  );
};

export default Security;
