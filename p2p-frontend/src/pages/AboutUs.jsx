import "./aboutus.css";

const AboutUs = () => {
  return (
    <main className="about-page">
      <h1>
        About <span>PeerVault</span>
      </h1>

      <p className="about-intro">
        PeerVault is a secure peer-to-peer file sharing platform that allows
        users to transfer files directly between devices without relying on
        cloud storage or third-party servers.
      </p>

      <div className="about-sections">
        <div className="about-card">
          <h2>The Problem</h2>
          <p>
            Traditional file sharing platforms rely heavily on cloud storage,
            introduce file size limits, and raise concerns about privacy and
            data tracking.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Solution</h2>
          <p>
            PeerVault uses direct peer-to-peer connections with end-to-end
            encryption, ensuring your files are transferred securely and never
            stored on any server.
          </p>
        </div>

        <div className="about-card">
          <h2>Core Values</h2>
          <p>
            Privacy-first design, strong security, fast transfers, simplicity,
            and accessibility for everyone.
          </p>
        </div>

        <div className="about-card">
          <h2>Technology</h2>
          <p>
            Built using WebRTC for peer connections, modern encryption
            techniques, and React for a fast, responsive user experience.
          </p>
        </div>

        <div className="about-card">
          <h2>Who It’s For</h2>
          <p>
            Students, developers, teams, and anyone who values secure and
            private file sharing without limitations.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To make file sharing simple, secure, and fully under the user’s
            control.
          </p>
        </div>
      </div>

      
    </main>
  );
};

export default AboutUs;
