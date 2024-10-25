const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const initSocket = require('./socket'); // นำเข้าไฟล์ socket
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');
const roomRoutes = require('./routes/room.routes');
const historyRoutes = require('./routes/history.routes');
require('dotenv').config(); 

const app = express();
const server = http.createServer(app);
const io = initSocket(server); // เรียกใช้ฟังก์ชัน initSocket

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// เส้นทางที่ต้องการ
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/booking', bookingRoutes);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
