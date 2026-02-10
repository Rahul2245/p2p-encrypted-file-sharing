import "./receive.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { createRTCConfig } from "../webrtcConfig"
import { useParams } from "react-router-dom";


const Receive = () => {

  const { roomId: urlRoomId } = useParams();
  const peerRef = useRef(null);
  const dataChannelRef = useRef(null);
  const receivedBuffersRef = useRef([]);
  const fileMetaRef = useRef(null);
  const expectedChunkIndexRef = useRef(null);
  const receivedCountRef = useRef(0);

  const [inputLink, setInputLink] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Waiting for link...");
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (urlRoomId) {
      setRoomId(urlRoomId);
      setStatus("Establishing secure connection...");
    }
  }, [urlRoomId]);

  useEffect(() => {
    // Note: Ensure this URL matches your actual backend config
    const s = io("https://10.122.14.12:9000");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const assembleFile = useCallback(() => {
    if (!fileMetaRef.current) return;
    const { fileName } = fileMetaRef.current;
    const blob = new Blob(receivedBuffersRef.current);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    
    // logic remains same
    setStatus("Download Complete");
  }, []);

  const handleIncomingData = useCallback((event) => {
    if (typeof event.data === "string") {
      const msg = JSON.parse(event.data);
      if (msg.type === "file-header") {
        fileMetaRef.current = msg;
        receivedBuffersRef.current = new Array(msg.totalChunks);
        receivedCountRef.current = 0;
        return;
      }
      if (msg.type === "file-chunk-meta") {
        expectedChunkIndexRef.current = msg.index;
        return;
      }
    } else {
      const index = expectedChunkIndexRef.current;
      if (index === null) return;
      receivedBuffersRef.current[index] = event.data;
      receivedCountRef.current++;
      if (fileMetaRef.current) {
  const percent = Math.round((receivedCountRef.current / fileMetaRef.current.totalChunks) * 100);
  setProgress(percent);
}

      expectedChunkIndexRef.current = null;

      if (
        fileMetaRef.current &&
        receivedCountRef.current === fileMetaRef.current.totalChunks
      ) {
        assembleFile();
      }
    }
  }, [assembleFile]);




  useEffect(() => {
    if (!socket || !roomId) return;

      const turnCredentials = {
  username: "webrtc",
  credential: "test123"
};

    // const pc = new RTCPeerConnection({
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // });
    const pc = new RTCPeerConnection(
  createRTCConfig(turnCredentials)
);
    peerRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("new-ice-candidate", { candidate: event.candidate, roomId });
      }
    };

    pc.ondatachannel = (event) => {
      const dc = event.channel;
      dataChannelRef.current = dc;
      dc.binaryType = "arraybuffer";
      setStatus("Receiving file stream...");
      dc.onmessage = handleIncomingData;
    };

    const handleOffer = async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { answer, roomId });
    };

    const handleNewIce = async ({ candidate }) => {
      if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    };

    socket.emit("join-room", { roomId });
    socket.on("offer", handleOffer);
    socket.on("new-ice-candidate", handleNewIce);

    return () => {
      pc.close();
      socket.off("offer");
      socket.off("new-ice-candidate");
    };
  }, [socket, roomId, handleIncomingData]);

  const handlePaste = () => {
    if (!inputLink) return;
    let id = inputLink.trim();
    try {
      const url = new URL(id);
      const parts = url.pathname.split("/");
      id = parts[parts.length - 1];
    } catch {
      if (id.includes("/receive/")) {
        id = id.split("/receive/")[1];
      }
    }
    setRoomId(id);
    setStatus("Establishing secure connection...");
  };

  const handleReset = () => {
     window.location.reload();
  };

  return (
    <main className="receive-page">
      <div className="receive-wrapper">
        <div className="receive-card">
          
          <div className="receive-header">
            <div className="icon-wrapper">
              {/* Change Main Icon based on completion */}
              {status === "Download Complete" ? "✅" : (roomId ? "📡" : "⬇️")}
            </div>
            <h2>{!roomId ? "Receive File" : (status === "Download Complete" ? "File Received" : "Incoming Transmission")}</h2>
            <p className="receive-sub">
              {!roomId
                ? "Enter the unique link shared with you to begin the secure P2P transfer."
                : (status === "Download Complete" ? "The file has been saved to your device." : "Please keep this tab open while the transfer completes.")}
            </p>
          </div>

          {!roomId && (
            <div className="receive-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Paste secure link here..."
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                  autoFocus
                />
              </div>
              <button onClick={handlePaste}>
                Initiate Download
              </button>
            </div>
          )}

          {roomId && (
            <div className="receive-status">
              {/* Conditional Rendering: If Complete, show Success UI. If not, show Loader */}
              {status === "Download Complete" ? (
                 <div className="success-message">
                    <p className="status-text success">Download Complete</p>
                    <button className="reset-btn" onClick={handleReset}>Receive Another File</button>
                 </div>
              ) : (
                <>
                  <div className="status-loader"></div>
                  <p className="status-text">{status}</p>
                  {roomId && status !== "Download Complete" && progress > 0 && (
  <div className="progress-container">
    <div className="progress-header">
      <span>Downloading...</span>
      <span>{progress}%</span>
    </div>
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
)}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Receive;