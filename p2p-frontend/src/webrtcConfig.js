export function createRTCConfig(turnCredentials) {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "turn:172.17.168.48:3478",
        username: turnCredentials.username,
        credential: turnCredentials.credential,
      },
    ],
  };
}
