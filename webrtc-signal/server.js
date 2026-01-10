import { readFileSync } from 'fs'
import { createServer } from 'https'
import express from 'express'
import { Server } from 'socket.io'



const app = express()

//reading key and cert from certfiles
const key = readFileSync('./cert/cert.key')
const cert = readFileSync('./cert/cert.crt')    

const secureExpressServer = createServer({key,cert,
    requestCert :true,
    ca:[
        readFileSync('./cert/ca.crt')
    ]
},app)
const io = new Server(secureExpressServer);

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
        const roomid = data.roomid;
        socket.join(roomid);
        const clients = io.sockets.adapter.rooms.get(roomid);
        if(clients.size > 1){
            socket.to(roomid).emit('initiator');
        }

    })

});






secureExpressServer.listen(9000,()=>{
    console.log("server running on port 9000");
})

