import express from "express";
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors'

import { PORT } from "./config.js";

const app = express();
const servidor = http.createServer(app);

const io = new Server(servidor, {
    cors:{
        origin:'*'
    }
});

app.use(cors());

const port = PORT;

io.on('connection', socket=>{
    console.log(socket.id);

    socket.on('message', (data)=>{
        socket.broadcast.emit('message', data);
    })
})

servidor.listen(port);

console.log('server on port', port);