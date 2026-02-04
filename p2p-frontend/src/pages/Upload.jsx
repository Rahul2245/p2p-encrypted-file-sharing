import "./upload.css";
import { useState,useEffect,useRef} from "react";
import {QRCodeCanvas} from "qrcode.react";
import {io} from "socket.io-client";
import { CopyIcon, CheckIcon } from "@primer/octicons-react";


const Upload = () => {

  const peerRef=useRef(null);
  const dataChannelRef=useRef(null);
  const selectedFileRef=useRef(null);

  const [copied,setCopied]=useState(false);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);

      // ✅ NEW (for WebRTC)
    selectedFileRef.current = file;
    }
  };

  
  const formatFileSize = (bytes) => {
     if(!bytes) return "";
     const sizes=["B","KB","MB","GB"];
     const i=Math.floor(Math.log(bytes)/Math.log(1024));
     return `${(bytes/Math.pow(1024,i)).toFixed(2)} ${sizes[i]}`;
  }

  const [socket,setSocket]=useState(null);

  useEffect(() => {
    const s=io("http://localhost:9000");
    setSocket(s);
    return () => s.disconnect();
  },[]);

  

const [roomId,setRoomId]=useState("");

useEffect(() => {
    if(!socket) return;

    const pc = new RTCPeerConnection({
      iceServers: [
        {urls: "stun:stun.l.google.com:19302"}
      ]
    });

    peerRef.current=pc;

    pc.onicecandidate = (event) =>{
      if(event.candidate){
        socket.emit("new-ice-candidate",{
          candidate: event.candidate,
          roomId
        });

        }
      };

       pc.onconnectionstatechange = () => {
          console.log("Connection:", pc.connectionState);
    };

    return () => pc.close();
  },[socket]);

useEffect(() => {
  if(!socket)return;
  socket.on("link-created",async ({roomId}) => {
    setRoomId(roomId);

    const pc=peerRef.current;

    const dc=pc.createDataChannel("file");
    dataChannelRef.current=dc;

    dc.binaryType="arraybuffer";
    dc.onopen =() => {
      console.log("datachannel open (sender)");
      setTimeout(sendFile,300);
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer",{offer,roomId});
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

  useEffect(() => {
    if(!socket)return;

    socket.on("answer", async ({answer}) =>{
      await peerRef.current.setRemoteDescription(answer);
    });

    socket.on("new-ice-candidate", async ({candidate}) => {
      if(candidate){
        await peerRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socket.off("answer");
      socket.off("new-ice-candidate");
    }
  },[socket]);

  const sendFile = async () => {
    const file = selectedFileRef.current;
    const dc = dataChannelRef.current;

    if(!file||!dc)return;

    const chunkSize = 16*1024;
    let offset=0;

    dc.send(JSON.stringify({
      type: "meta",
      name: file.name,
      size: file.size
    }));

    while(offset < file.size){
      const slice = file.slice(offset,offset+chunkSize);
      const buffer=await slice.arrayBuffer();
      dc.send(buffer);
      offset=offset+chunkSize;
    }

    dc.send(JSON.stringify({type:"done"}));
    console.log("file sent");
  }


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
    <span>  Copied</span>
  </>
) : (
  <>
    <CopyIcon size={16} />
    <span>  Copy</span>
  </>
)}

</button>

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