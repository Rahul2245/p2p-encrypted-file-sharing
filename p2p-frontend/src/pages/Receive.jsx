import "./receive.css";
import { useState,useEffect} from "react";
import {io} from "socket.io-client";
const Receive = () =>{
    const [socket,setSocket]=useState(null);

  useEffect(() => {
    const s=io("http://localhost:9000");
    setSocket(s);
    return () => s.disconnect();
  },[]);

     return(
        <div>
            Recieve page
        </div>
     );
};

export default Receive