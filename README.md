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

### 🖥 Frontend

- Upload and share files directly between devices using peer-to-peer communication.

- Generate a unique shareable link for each file transfer session.

- QR code generation to allow quick connection from another device by scanning.

- Real-time communication with the backend using Socket.IO.

- Clean and responsive React-based user interface.

- Displays connection and transfer status during file sharing.

### ⚙ Backend

- WebRTC signaling server implemented with Node.js and Socket.IO to establish peer-to-peer connections.

- Socket.IO middleware used for validating and managing socket connections.

- Redis-based rate limiter implemented to prevent abuse and control excessive requests.

- Session/room management for secure communication between peers.

- Backend does not store files, ensuring privacy and temporary session-based communication.

### 🔒Security

- End-to-end encrypted file transfer using WebRTC data channels.

- Symmetric encryption used to encrypt the file data before transmission.

- Asymmetric encryption (RSA) used for secure key exchange between peers.

- Combination of symmetric + asymmetric encryption ensures secure and efficient data transfer.

- Files are transferred directly between devices, avoiding permanent storage on the server.


## 🛠 Technologies / Libraries / Packages Used
### Frontend

- React.js

- Socket.IO Client

- WebRTC APIs

- QRCode React

- CSS3

### Backend

- Node.js

- Express.js

- Socket.IO

- Crypto (for room ID generation)

### Other Tools

- Git & GitHub

- WebRTC

- Local HTTPS certificates

## 🖥Local Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
git clone https://github.com/Rahul2245/p2p-encrypted-file-sharing.git

cd p2p-encrypted-file-sharing

### 2. Install backend dependencies
cd Backend

npm install

### 3. Start the backend server
node server.js

The backend will run on:
http://localhost:9000

### 4. Install frontend dependencies
Open a new terminal and run:

cd p2p-frontend

npm install

### 5. Start the frontend
npm start

The frontend will run on:
http://localhost:3000

## 👨‍💻 Team Members
Raga Hasini Kalluri

Rahul Gajula










