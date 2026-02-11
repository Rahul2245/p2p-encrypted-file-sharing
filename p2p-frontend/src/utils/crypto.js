//----------------RSA-------------

export async function generateRSAKeyPair(){
    return crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1,0,1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt","decrypt"]
    );
}

export async function exportRSAPublicKey(publicKey){
    return crypto.subtle.exportKey("spki",publicKey);
}

export async function importRSAPublicKey(keyArray){
    return crypto.subtle.importKey(
        "spki",
        new Uint8Array(keyArray).buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA_256"
        },
        true,
        ["encrypt"]
    );
}

//---------AES----------------

export  async function generateAESKey(){
    return crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length:256
        },
        true,
        ["encrypt","decrypt"]
    );
}

export async function exportAESKey(aeskey){
    return crypto.subtle.exportKey("raw",aeskey);
}

export async function encryptAESKey(rsaPublicKey,aesKey){
      const rawKey=await exportAESKey(aesKey);
      return crypto.subtle.encrypt(
        {name:"RSA-OAEP"},
        rsaPublicKey,
        rawKey
      );
}

export async function decryptAESKey(encryptedKey,rsaPrivateKey){
    const raw = await crypto.subtle.decrypt(
        {name:"RSA-OAEP"},
        rsaPrivateKey,
        encryptedKey
    );
    return crypto.subtle.impoetKey(
        "raw",
        raw,
        {name:"AES-GCM"},
        true,
        ["encrypt","decrypt"]
    );
}

//------------CHUNKS-------------

export async function encryptCHunk(aesKey,buffer){
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const encryptedChunk=await crypto.subtle.encrypt(
        {name: "AES-GCM",iv},
        aesKey,
        buffer
    );

    return {iv,encryptedChunk};
}

export async function decryptChunk(aesKey,iv,encryptedChunk){
    return crypto.subtle.decrypt(
        {name:"AES-GCM",iv},
        aesKey,
        encryptedChunk
    );
}

//------------HASH-------------------

export async function generateSHA256FileHash(fileOrBlob){
    const buffer=await fileOrBlob.arrayBuffer();
    const hashBuffer=await crypto.subtle.digest("SHA-256",buffer);
    return Array.from(new Array8Uint(hashBuffer)).map(b => b.toString(16).padStart(2,"0")).join("");
}

export function checkFileHash(incoming,calculated){
    return incoming==calculated;
}