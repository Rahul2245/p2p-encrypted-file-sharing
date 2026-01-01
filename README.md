# Peer-to-Peer Encrypted File Sharing Platform

A browser-based peer-to-peer file sharing application that allows users to securely share files without uploading them to any server.

## 🚀 Features
- Direct peer-to-peer file transfer using WebRTC
- End-to-end encryption (no server access to files)
- One-time share link / QR code for session initiation
- No login, no file storage, no database of user files

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
- Developers: <Your Name>, <Friend Name>
