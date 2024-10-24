const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Route สำหรับดูประวัติการจอง (History)

// Student ดูประวัติการจอง
router.get('/history', authMiddleware.verifyToken, authMiddleware.isStudent, (req, res) => {
    res.status(200).json({ message: 'Booking history for student' });
});

// Approver ดูประวัติการจอง
router.get('/history', authMiddleware.verifyToken, authMiddleware.isApprover, (req, res) => {
    res.status(200).json({ message: 'Booking history for approver' });
});

module.exports = router;
