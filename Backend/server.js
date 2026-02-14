import { readFileSync } from 'fs'
import http from 'http'

import express from 'express'
import { Server } from 'socket.io'
import { dirname,join } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "crypto";
import Redis from 'ioredis';
import { RateLimiterRedis  } from 'rate-limiter-flexible';
import dotenv from 'dotenv';
dotenv.config();




const app = express()

//reading key and cert from certfiles
// const key = readFileSync('./cert/cert.key')
// const cert = readFileSync('./cert/cert.crt')    

const secureExpressServer = http.createServer(app);


// const secureExpressServer = createServer({key,cert
//     // requestCert :true,
//     // ca:[
//     //     readFileSync('./cert/ca.crt')
//     // ]
// },app);


const io = new Server(secureExpressServer,{
    maxHttpBufferSize: 1e5,
    cors: {
    origin: "*",   // allow frontend
    methods: ["GET", "POST"]
  }
});

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   username: "default",
//   password: process.env.REDIS_PASSWORD
// });


// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// });

// const handshakeLimiter = new RateLimiterRedis({
//     storeClient: redisClient,
//    points: 50, 
//   duration: 60,

// });

// const eventLimiter = new RateLimiterRedis({
//     storeClient: redisClient,
//     points: 15,
//     duration: 1,
// });

// io.use(async (socket, next)=>{
//     const ip = socket.handshake.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     socket.handshake.address;
//     try{
//         await handshakeLimiter.consume(ip);
//         next();

//     }catch(e){
//         next(new Error('Too many connection attempts'));

//     }
// });

io.on('connection',(socket)=>{
    console.log('a user entered the connection',socket.id); 
    
    

    // socket.use(async ([event, ...args], next)=>{
    //     try{
    //         await eventLimiter.consume(socket.id);
    //         next();

    //     }catch (e){
    //         console.warn(`Rate limit exceeded for ${socket.id} on event: ${event}`);
    //         socket.emit('error', 'Too many requests. Slow down.');

    //     }
    // })
    socket.on('disconnect',()=>{
        console.log('user disconnnected',socket.id);
    });

    



    //forward offer
    socket.on('offer',(data)=>{
        console.log('recieved offer');
        const roomid = data.roomId;
        socket.to(roomid).emit('offer',data);
    })

    //forward answer
    socket.on('answer',(data)=>{
        console.log('received answer');
        const roomId = data.roomId;
        socket.to(roomId).emit('answer',data);
    })

    //forward ice candidates
    socket.on('new-ice-candidate',(data)=>{
        console.log('forwarded candidate');
        const roomid = data.roomId;
        socket.to(roomid).emit('new-ice-candidate',data);
    })

    //join room
    socket.on('join-room',(data)=>{
        console.log('joined room',socket.id);
        const roomId = data.roomId;
        console.log(roomId);
    //     if (clients.size >= 4) { 
    //     socket.emit('room-full', 'This room has reached its limit of 4 peers.');
    //     return; 
    // }
        socket.join(roomId);
        const clients = io.sockets.adapter.rooms.get(roomId);
        console.log(clients.size);
        if(clients.size > 1){
            socket.to(roomId).emit('initiator',{roomId});
            console.log('more than 2 clients',socket.id);
        }
        if (clients.size >= 4) { 
        socket.emit('room-full', 'This room has reached its limit of 4 peers.');
        return; 
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



const PORT = process.env.PORT || 9000



secureExpressServer.listen(process.env.PORT, "0.0.0.0", ()=>{
    console.log("server running on port 9000");
});


