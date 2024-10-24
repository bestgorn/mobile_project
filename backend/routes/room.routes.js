const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roomController = require('../controllers/room.controller'); // นำ controller เข้ามาใช้งาน

// Route สำหรับจัดการห้อง (Room)

// Student ดูรายชื่อห้อง
router.get('/rooms', authMiddleware.verifyToken, authMiddleware.isStudent, roomController.getAllRooms);

// Staff ดูรายชื่อห้อง
router.get('/rooms', authMiddleware.verifyToken, authMiddleware.isStaff, roomController.getAllRooms);

// Staff เพิ่มห้อง
router.post('/rooms', authMiddleware.verifyToken, authMiddleware.isStaff, roomController.addRoom);

// Staff แก้ไขข้อมูลห้อง
router.put('/rooms/:id', authMiddleware.verifyToken, authMiddleware.isStaff, roomController.updateRoom);

// Staff ลบห้อง
router.delete('/rooms/:id', authMiddleware.verifyToken, authMiddleware.isStaff, roomController.deleteRoom);

// Approver ดูรายชื่อห้อง
router.get('/rooms', authMiddleware.verifyToken, authMiddleware.isApprover, roomController.getAllRooms);

module.exports = router;
