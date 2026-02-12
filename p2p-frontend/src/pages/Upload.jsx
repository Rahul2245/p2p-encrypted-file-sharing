import "./upload.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { io } from "socket.io-client";
import { createRTCConfig } from "../webrtcConfig"
import { CopyIcon, CheckIcon, MailIcon } from "@primer/octicons-react"; // Added MailIcon if available, otherwise we use SVG

const Upload = () => {
  const peerRef = useRef(null);
  const dataChannelRef = useRef(null);
  const selectedFileRef = useRef(null);
  const roomIdRef = useRef("");

  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [progress, setProgress] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      selectedFileRef.current = file;
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  // --- SOCIAL SHARE LOGIC ---
  const handleSocialShare = (platform) => {
    if (!roomId) return;
    const shareUrl = `${window.location.origin}/receive/${roomId}`;
    const text = `Here is a secure file link: ${shareUrl}`;
    
    let url = "";

    switch (platform) {
      case "whatsapp":
        // WhatsApp Web/App
        url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case "telegram":
        // Telegram Share
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Here is the file link")}`;
        break;
      case "email":
        // Mailto
        url = `mailto:?subject=File Transfer&body=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank"); 
  };
  // --------------------------

  const sendFile = useCallback(async () => {
    const file = selectedFileRef.current;
    const dc = dataChannelRef.current;
    if (!file || !dc) return;

    const chunkSize = 64 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    dc.send(
      JSON.stringify({
        type: "file-header",
        fileName: file.name,
        fileSize: file.size,
        totalChunks,
        chunkSize,
      })
    );

    let offset = 0;
    let index = 0;

    const MAX_BUFFERED_AMOUNT = 16 * 1024 * 1024;

    while (offset < file.size) {
      if (dc.bufferedAmount > 1024 * 1024) {
        await new Promise((resolve) => {
          const handler = () => {
           if (dc.bufferedAmount < 1 * 1024 * 1024) {
             dc.removeEventListener("bufferedamountlow", handler);
             resolve();
          }
        };
          dc.addEventListener("bufferedamountlow", handler);
        });
      }

      const slice = file.slice(offset, offset + chunkSize);
      const buffer = await slice.arrayBuffer();

      dc.send(
        JSON.stringify({
          type: "file-chunk-meta",
          index,
        })
      );

      dc.send(buffer);

      offset += chunkSize;
      index++;
      const percent = Math.round((offset / file.size)*100);
      setProgress(percent);
      setIsTransferring(true);
    }
  }, []);

  useEffect(() => {
    const s = io("https://10.122.14.12:9000");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // const pc = new RTCPeerConnection({
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // });

      const turnCredentials = {
  username: "webrtc",
  credential: "test123"
};

  
    const pc = new RTCPeerConnection(
  createRTCConfig(turnCredentials)
);
    peerRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate && roomIdRef.current) {
        socket.emit("new-ice-candidate", {
          candidate: event.candidate,
          roomId: roomIdRef.current,
        });
      }
    };

    const handleLinkCreated = async ({ roomId }) => {
      setRoomId(roomId);
      roomIdRef.current = roomId;
    };

    const handleInitiator = async ({ roomId }) => {
      const dc = pc.createDataChannel("file");
      dc.bufferedAmountLowThreshold = 512 * 1024;
      dataChannelRef.current = dc;
      dc.binaryType = "arraybuffer";

      dc.onopen = () => {
        setTimeout(sendFile, 300);
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("offer", {
        offer,
        roomId,
      });
    };

    const handleAnswer = async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleNewIce = async ({ candidate }) => {
      if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const connectionError = (err)=>{
      console.log(err.message);
      if (err.message === "Too many connection attempts") {
     alert("You are connecting too fast! Please wait a moment.");
     socket.disconnect(); // Stop the client from spamming retries
  }

    }

    socket.on("link-created", handleLinkCreated);
    socket.on("initiator", handleInitiator);
    socket.on("answer", handleAnswer);
    socket.on("new-ice-candidate", handleNewIce);
    socket.on("connect_error", connectionError);
  

    return () => {
      pc.close();
      socket.off("link-created");
      socket.off("initiator");
      socket.off("answer");
      socket.off("new-ice-candidate");
    };
  }, [socket, sendFile]);

  useEffect(() => {
    if (!socket || !fileName) return;
    socket.emit("create-link");
  }, [socket, fileName]);

  const shareLink = roomId ? `${window.location.origin}/receive/${roomId}` : "";

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
          {!shareLink && (
            <>
              <label htmlFor="fileUpload" className="upload-box">
                <div className="upload-icon">
                  <div className="cloud" />
                </div>

                <p className="upload-title">
                  {fileName || "Upload File"}
                </p>

                <span className="upload-sub">
                  Click to choose a file
                </span>
              </label>

              <p className="upload-hint">
                Upload the files that you want to send/share
              </p>

              {fileName && (
                <p className="upload-hint">Creating secure link…</p>
              )}
            </>
          )}

          {shareLink && (
            <div className="share-card">

              {fileName && fileSize && (
                <div className="file-info-top">
                  <div className="file-name">{fileName}</div>
                  <div className="file-size">
                    {formatFileSize(fileSize)}
                  </div>
                </div>
              )}
              {/* --- PROGRESS BAR START --- */}
{isTransferring && progress < 100 && (
  <div className="progress-container">
    <div className="progress-header">
      <span>Sending...</span>
      <span>{progress}%</span>
    </div>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
)}
{/* --- PROGRESS BAR END --- */}

              <h3 className="share-title">Scan or Share Link</h3>

              <div className="qr-wrapper">
                <QRCodeCanvas
                  value={shareLink}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  includeMargin
                />
              </div>

              <div className="link-row">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                />
                <button
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 5000);
                  }}
                >
                  {copied ? (
                    <>
                      <CheckIcon size={16} />
                    </>
                  ) : (
                    <>
                      <CopyIcon size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* NEW SOCIAL SHARE SECTION */}
              <div className="social-share-section">
                <p className="social-label">Share via</p>
                <div className="social-icons">
                  {/* WhatsApp */}
                  <button onClick={() => handleSocialShare("whatsapp")} className="social-btn whatsapp" aria-label="Share on WhatsApp">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>

                  {/* Telegram */}
                  <button onClick={() => handleSocialShare("telegram")} className="social-btn telegram" aria-label="Share on Telegram">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>

                  {/* Email */}
                  <button onClick={() => handleSocialShare("email")} className="social-btn email" aria-label="Share via Email">
                     <MailIcon size={20} />
                  </button>
                </div>
              </div>

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