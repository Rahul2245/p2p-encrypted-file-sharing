import "./upload.css";

const Upload = () => {
  return (
    <main className="upload-page">
      <div className="upload-container">

        {/* LEFT SIDE */}
        <div className="upload-left">
          <div className="upload-box">
            <p className="upload-title">Upload File</p>
          </div>
          <p className="upload-hint">
            Upload the files that you want to send/share
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="upload-right">
          <div className="feature-pill"><h3>🔗 Direct Peer Transfer</h3>
      <p>
        Files are sent directly between peers using WebRTC,
        without passing through any server.
      </p></div>
          <div className="feature-pill"><h3>🔒 End-to-End Encrypted</h3>
      <p>
        Your files are encrypted before transfer and decrypted
        only on the receiver’s device.
      </p></div>
          <div className="feature-pill"><h3>⏱️ Temporary Sessions</h3>
      <p>
        One-time links and QR codes ensure secure, temporary
        sharing sessions.
      </p></div>
          <div className="feature-pill"><h3>🌐 Works Everywhere</h3>
      <p>
        Share files across devices and networks — laptops,
        tablets, and phones.
      </p></div>
        </div>

      </div>
    </main>
  );
};

export default Upload;
