// socket.js
const socketIo = require('socket.io');

const initSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        // รับการตัดการเชื่อมต่อ
        socket.on('disconnect', () => {
            console.log(' user disconnected');
        });
    });

    return io;
};

module.exports = initSocket;
