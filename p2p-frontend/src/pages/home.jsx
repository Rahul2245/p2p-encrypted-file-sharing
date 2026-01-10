import "./home.css";

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
          <button className="btn btn-primary">Start Sharing</button>
          <button className="btn btn-secondary">How It Works</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
