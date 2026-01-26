import "./upload.css";
import { useState } from "react";

const Upload = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <main className="upload-page">
      <div className="upload-container">

        {/* LEFT SIDE */}
        <div className="upload-left">

          {/* Hidden file input */}
          <input
            type="file"
            className="input-file"
            id="fileUpload"
            onChange={handleFileChange}
          />

          {/* Upload Box (LABEL) */}
          <label htmlFor="fileUpload" className="upload-box">
            <div className="upload-icon">
              <div className="cloud"/>                
             
            </div>

            <p className="upload-title">
              {fileName ? fileName : "Upload File"}
            </p>

            <span className="upload-sub">
              Click to choose a file
            </span>
          </label>

          <p className="upload-hint">
            Upload the files that you want to send/share
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="upload-right">
          <div className="feature-pill">
            <h3>🔗 Direct Peer Transfer</h3>
            <p>
              Files are sent directly between peers using WebRTC,
              without passing through any server.
            </p>
          </div>

          <div className="feature-pill">
            <h3>🔒 End-to-End Encrypted</h3>
            <p>
              Your files are encrypted before transfer and decrypted
              only on the receiver’s device.
            </p>
          </div>

          <div className="feature-pill">
            <h3>⏱️ Temporary Sessions</h3>
            <p>
              One-time links and QR codes ensure secure, temporary
              sharing sessions.
            </p>
          </div>

          <div className="feature-pill">
            <h3>🌐 Works Everywhere</h3>
            <p>
              Share files across devices and networks — laptops,
              tablets, and phones.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Upload;
