## 📌 Project Title

PeerVault – Nothing stored, everything shared

## 📖 Project Description

PeerVault is a secure peer-to-peer file sharing application that enables users to transfer files directly between devices without storing them on any server. The application uses WebRTC for direct peer-to-peer communication and Socket.IO for signaling between clients.

The platform ensures end-to-end encrypted transfers, temporary sharing sessions, and QR-code based quick sharing between devices.

Users simply upload a file, generate a temporary sharing link or QR code, and the receiver can instantly download the file through a direct peer connection.

## 📸 Screenshots

### Home page
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160241" src="https://github.com/user-attachments/assets/d88f2a5d-7444-4bdb-9c8f-2a092c9b8b0b" />

### Footer
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160308" src="https://github.com/user-attachments/assets/7ad6d109-0269-4c8b-b272-98ce5ee02f2d" />

### Upload page
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160337" src="https://github.com/user-attachments/assets/44984092-e842-4d44-ac77-406ca7cf41d8" />

### File selection
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160417" src="https://github.com/user-attachments/assets/feeb37f2-32e6-468f-bbdf-19d82846d5c5" />

### QR-code page
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160522" src="https://github.com/user-attachments/assets/ac388e29-e2cf-4ef1-903a-c32b1b67331f" />

### Recieve page
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160558" src="https://github.com/user-attachments/assets/60788887-4ace-4dbf-8105-d814628e85a0" />

### File succesfully downloaded
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160613" src="https://github.com/user-attachments/assets/a93cbf13-e7b9-4c0f-a95c-ce97ca3d392a" />

### Error page
<img width="1920" height="1080" alt="Screenshot 2026-03-08 160628" src="https://github.com/user-attachments/assets/0557317f-c584-4149-8996-3d4c73cfca1e" />

## 🌐 Hosted URL

[Live Demo](https://peervault45.vercel.app/)


## ✨ Features Implemented

🖥 Frontend

-File upload interface
-QR code generation for sharing links
-Temporary shareable link creation
-Real-time connection status
-Clean responsive UI
-Copy-to-clipboard link sharing
-Secure peer connection initiation

## 🧠 How It Works
1. Sender creates a sharing session
2. Backend generates a one-time link / QR
3. Receiver joins using the link
4. WebRTC establishes a P2P connection
5. Files are encrypted and sent directly between devices

## 🛠 Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Real-time Signaling: Socket.IO
- P2P Communication: WebRTC
- Encryption: Web Crypto API

## 👥 Team
- Mentor: Aditya Kumar Singh
- Developers: Raga Hasini Kalluri, Rahul Gajula

