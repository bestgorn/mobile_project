// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// เส้นทางสำหรับการลงทะเบียนและล็อกอิน
router.post('/register', authController.register);
router.post('/login', authController.login);

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/users', authController.getAllUsers);

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้โดย ID
router.get('/users/:id', authController.getUserById);

// เส้นทางสำหรับการอัปเดตข้อมูลผู้ใช้
router.put('/users/:id', authController.updateUser);

// เส้นทางสำหรับการลบผู้ใช้
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
