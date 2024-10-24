// controllers/booking.controller.js
const User = require('../models/user.model');
const Room = require('../models/room.model');

// ฟังก์ชันเพื่อสร้างผู้ใช้
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await User.createUser(username, password);
        res.status(201).json({ message: 'User created successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ฟังก์ชันเพื่อสร้างห้อง
const addRoom = async (req, res) => {
    const { room_name, status } = req.body;
    try {
        const result = await Room.createRoom(room_name, status);
        res.status(201).json({ message: 'Room created successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ฟังก์ชันสำหรับดูห้อง
const browseRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ฟังก์ชันสำหรับการขอการจอง
const requestBooking = async (req, res) => {
    // Logic สำหรับการขอการจอง
};

// ฟังก์ชันสำหรับตรวจสอบสถานะการจอง
const checkRequestStatus = async (req, res) => {
    // Logic สำหรับตรวจสอบสถานะ
};

// ฟังก์ชันสำหรับอนุมัติการจอง
const approveBooking = async (req, res) => {
    // Logic สำหรับอนุมัติการจอง
};

module.exports = {
    registerUser,
    addRoom,
    browseRooms,
    requestBooking,
    checkRequestStatus,
    approveBooking
};
