import "./upload.css";
import { useState,useEffect} from "react";
import {QRCodeCanvas} from "qrcode.react";
import {io} from "socket.io-client";


const Upload = () => {

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const [socket,setSocket]=useState(null);

  useEffect(() => {
    const s=io("https://127.0.0.1:9000");
    setSocket(s);
    return () => s.disconnect();
  },[]);

  

const [roomId,setRoomId]=useState("");

useEffect(() => {
  if(!socket)return;
  socket.on("link-created", ({roomId}) => {
    setRoomId(roomId);
  });
   return () => socket.off("link-created");
},[socket]);

 useEffect(() => {
    if(!socket||!fileName)return;
    socket.emit("create-link");
  },[socket,fileName]);

const shareLink = roomId
  ? `${window.location.origin}/receive/${roomId}`
  : "";



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

          {shareLink && (
            <div className="qr-section">
              <QRCodeCanvas value={shareLink} size={180} />
              <p>{shareLink}</p>
            </div>
          )}

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