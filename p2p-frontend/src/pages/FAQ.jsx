import React, { useState } from "react";
import "./faq.css";

const faqSections = [
{
category:"Getting Started",
items:[
{q:"Do I need to create an account?",a:"No signup required. Just generate a secure link and start sharing instantly."},
{q:"Do both users need PeerVault open?",a:"Yes. Both sender and receiver must be connected for peer-to-peer transfer."},
{q:"Can I use it on mobile devices?",a:"Yes. Modern mobile browsers supporting WebRTC can use PeerVault."}
]
},
{
category:"Security & Privacy",
items:[
{q:"Can anyone intercept my files?",a:"No. Files are encrypted end-to-end and transmitted directly between devices."},
{q:"Are files stored on servers?",a:"Never. PeerVault does not store your files or metadata."},
{q:"What if someone guesses my link?",a:"Links are unique session rooms. You can regenerate links anytime."},
{q:"Is encryption automatic?",a:"Yes. Encryption and key exchange happen automatically in the background."},
{q:"Can PeerVault admins see my files?",a:"No. Encryption happens locally before transmission."}
]
},
{
category:"File Transfer",
items:[
{q:"How large files can I send?",a:"There is no strict size limit — only depends on device memory and connection stability."},
{q:"Why is my transfer slow?",a:"Speed depends on both users' internet upload/download speeds."},
{q:"What happens if connection drops?",a:"Transfer stops immediately. Restarting will require reconnecting peers."},
{q:"Can I send multiple files?",a:"Yes, sequential transfers are supported."},
{q:"Does transfer resume automatically?",a:"Currently transfers restart for security and integrity verification."}
]
},
{
category:"Technical Questions",
items:[
{q:"Why WebRTC instead of cloud?",a:"WebRTC allows direct encrypted peer connections without storing data."},
{q:"How is encryption handled?",a:"RSA key exchange establishes AES-GCM encryption for chunk-level security."},
{q:"How is file integrity verified?",a:"SHA-256 hashing ensures files remain unchanged during transfer."},
{q:"Do I need same WiFi network?",a:"No. Transfers work across networks using ICE negotiation."},
{q:"Why might corporate networks fail?",a:"Strict NAT/firewalls may block peer connections without TURN servers."}
]
}
];

export default function FAQ(){

const [active,setActive]=useState(null);
let indexCounter=0;

const toggle=(index)=>{
setActive(active===index?null:index);
};

return(
<div className="faq-page">

<div className="faq-hero">
<h1><span>Frequently</span> Asked Questions</h1>
<p>Everything users ask before trusting PeerVault with secure encrypted file transfers.</p>
</div>

<div className="faq-container">

{faqSections.map(section=>(
<div key={section.category}>

<h2 className="faq-category">{section.category}</h2>

{section.items.map(item=>{
const index=indexCounter++;
return(
<div key={index} className={`faq-item ${active===index?"active":""}`}>

<div className="faq-question" onClick={()=>toggle(index)}>
{item.q}
<span className="faq-icon">{active===index?"−":"+"}</span>
</div>

<div className="faq-answer">
<p>{item.a}</p>
</div>

</div>
);
})}

</div>
))}

</div>
</div>
);
}
