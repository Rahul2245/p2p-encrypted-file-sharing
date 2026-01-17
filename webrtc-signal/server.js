import { readFileSync } from 'fs'
import { createServer } from 'https'
import express from 'express'
import { Server } from 'socket.io'
import { dirname,join } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "crypto";



const app = express()

//reading key and cert from certfiles
const key = readFileSync('./cert/cert.key')
const cert = readFileSync('./cert/cert.crt')    

const secureExpressServer = createServer({key,cert
    // requestCert :true,
    // ca:[
    //     readFileSync('./cert/ca.crt')
    // ]
},app)
const io = new Server(secureExpressServer);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'sample.html'));
});

io.on('connection',(socket)=>{
    console.log('a user entered the connection',socket.id);
    socket.on('disconnect',()=>{
        console.log('user disconnnected',socket.id);
    })

    //forward offer
    socket.on('offer',(data)=>{
        console.log('recieved offer');
        const roomid = data.roomid;
        socket.to(roomid).emit('offer',data);
    })

    //forward answer
    socket.on('answer',(data)=>{
        console.log('received answer');
        const roomid = data.roomid;
        socket.to(roomid).emit('answer',data);
    })

    //forward ice candidates
    socket.on('new-ice-candidate',(data)=>{
        console.log('forwarded candidate');
        const roomid = data.roomid;
        socket.to(roomid).emit('new-ice-candidate',data);
    })

    //join room
    socket.on('join-room',(data)=>{
        console.log('joined room',socket.id);
        const roomid = data.roomid;
        console.log(roomid);
        socket.join(roomid);
        const clients = io.sockets.adapter.rooms.get(roomid);
        console.log(clients.size);
        if(clients.size > 1){
            socket.to(roomid).emit('initiator');
            console.log('more than 2 clients',socket.id);
        }

    });

    //create-link
    socket.on('create-link', async (data) => {
    console.log('link creation');
     const roomId = crypto.randomBytes(8).toString("hex");

     socket.join(roomId);
     
     socket.emit('link-created', {roomId});


});

});






secureExpressServer.listen(9000,()=>{
    console.log("server running on port 9000");
})

