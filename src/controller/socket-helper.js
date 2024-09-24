// socket.js
const { Server } = require('socket.io');
const http = require('http');
const CustomError = require('../error/customError');

let io;
console.log('io initialization 15');
const createSocket = (app) => {

    const server = http.createServer(app);
    const ioserver = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });


    ioserver.on('connection', (socket) => {

        const { email } = socket.handshake.query;
        if (!email) {
            return ({
                message: 'Invalid Request',
                statusCode: 400
            })
        }
        console.log('A client connected.', email);
        socket.join(email);
        socket.broadcast.emit("join", `${email} has online`);
    })

    ioserver.engine.on("connection_error", (err) => {
        console.log(err.code, err.message, 'error in connecting')
        // socket.emit('error', err);
    });
    io = ioserver;
    console.log('io define with value');
    return { io, server };
};


const emitUserUpdate = async (email, user) => {
    try {
        io.to(email).emit('user_update', user);
        // }
    } catch (error) {
        throw new CustomError(error?.message, 500)
    }

}


module.exports = { createSocket, io, emitUserUpdate };
