import "./howitworks.css";

const HowItWorks = () => {
  return (
    <main className="how-page">
      <h1>
        How <span>PeerVault</span> Works
      </h1>

      <p className="how-intro">
        PeerVault enables secure file sharing using direct peer-to-peer
        connections with end-to-end encryption — no servers, no storage.
      </p>

      <div className="how-steps">
        <div className="how-step">
          <div className="step-number">1</div>
          <h2>Select a File</h2>
          <p>Choose the file you want to share from your device.</p>
        </div>

        <div className="how-step">
          <div className="step-number">2</div>
          <h2>Create Secure Connection</h2>
          <p>A secure peer-to-peer connection is established using WebRTC.</p>
        </div>

        <div className="how-step">
          <div className="step-number">3</div>
          <h2>Encrypted Transfer</h2>
          <p>Your file is encrypted and transferred securely.</p>
        </div>

        <div className="how-step">
          <div className="step-number">4</div>
          <h2>Receive & Download</h2>
          <p>The receiver decrypts and downloads the file instantly.</p>
        </div>
      </div>

    </main>
  );
};

export default HowItWorks;
