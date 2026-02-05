import "./receive.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const Receive = () => {
  const { roomId } = useParams();
  const peerRef = useRef(null);
  const dataChannelRef = useRef(null);
  const receivedBuffersRef = useRef([]);
  const fileMetaRef = useRef(null);
  const expectedChunkIndexRef = useRef(null);
  const receivedCountRef = useRef(0);

  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("waiting for sender...");

  useEffect(() => {
    const s = io("https://localhost:9000");
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
    setStatus("download complete");
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

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
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
      setStatus("receiving file...");
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

  return (
    <main className="receive-page">
      <div className="receive-card">
        <h2>Receiving File</h2>
        <p>{status}</p>
      </div>
    </main>
  );
};

export default Receive;
