import "./receive.css";
import { useState,useEffect,useRef} from "react";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";
const Receive = () =>{
  const {roomId} = useParams();

  const peerRef = useRef(null);
  const dataChannelRef  = useRef(null);

  const receivedBuffersRef=useRef([]);
  const fileMetaRef = useRef(null);


    const [socket,setSocket]=useState(null);
    const [status,setStatus]=useState("waiting for sender...");

  useEffect(() => {
    const s=io("http://localhost:9000");
    setSocket(s);
    return () => s.disconnect();
  },[]);

  useEffect(() => {
    if(!socket||!roomId) return;
    socket.emit("join-room",{roomId});
  },[socket,roomId]);

  useEffect(() => {
    if(!socket)return;

    const pc=new RTCPeerConnection({
      iceServers: [{urls: "stun:stun.l.google.com:19302"}]
    });

    peerRef.current=pc;

    pc.onicecandidate=(event) => {
      if(event.candidate){
        socket.emit("new-ice-candidate",{
          candidate: event.candidate,
          roomId
        });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("connection:",pc.connectionState);
    };

    pc.ondatachannel = (event) => {
      const dc=event.channel;
      dataChannelRef.current=dc;
      dc.binaryType="arraybuffer";

      setStatus("receiving file...");

      dc.onmessage=handleIncomingData;
    };

    return () => pc.close();
  },[socket]);

  useEffect(() => {
    if(!socket)return; 

    socket.on("offer",async ({offer}) => {
      const pc=peerRef.current;
      await pc.setRemoteDescription(offer);

      const answer=await pc.createAnswer();
      await pc.setLocalDescription(answer);

       socket.emit("answer",{answer,roomId});
    });

    socket.on("new-ice-candidate",async ({candidate}) => {
        if(candidate){
          await peerRef.current.addIceCandidate(candidate);
        }
      });

      return () => {
        socket.off("offer");
        socket.off("new-ice-candidate");
      };
  },[socket,roomId]);

  const handleIncomingData = (event) => {
    if(typeof event.data==="string"){
      const msg=JSON.parse(event.data);

      if(msg.type==="meta"){
        fileMetaRef.current = msg;
        receivedBuffersRef.current=[];
      }

      if(msg.type==="done"){
        assembleFile();
      }
    }

    else{
      if (!fileMetaRef.current) return;
      receivedBuffersRef.current.push(event.data);
    }
  };

  const assembleFile = () => {
    const {name} = fileMetaRef.current;

    const blob=new Blob(receivedBuffersRef.current);
    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");
    a.href=url;
    a.download=name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus("download complete");
  };

     return(
        <main className="receive-page">
      <div className="receive-card">
        <h2>Receiving File</h2>
        <p>{status}</p>
      </div>
    </main>
     );
};

export default Receive