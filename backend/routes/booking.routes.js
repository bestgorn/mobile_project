// routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route สำหรับการจองห้อง (Booking)

// Student ทำการจอง
router.post('/booking', authMiddleware.verifyToken, authMiddleware.isStudent, (req, res) => {
    res.status(200).json({ message: 'Booking request submitted' });
});

// Student ตรวจสอบสถานะการจอง
router.get('/booking/status', authMiddleware.verifyToken, authMiddleware.isStudent, (req, res) => {
    res.status(200).json({ message: 'Booking status' });
});

// Approver ดูคำขอการจอง
router.get('/booking/requests', authMiddleware.verifyToken, authMiddleware.isApprover, (req, res) => {
    res.status(200).json({ message: 'List of booking requests for approvers' });
});

router.put('/booking/requests/:id', authMiddleware.verifyToken, authMiddleware.isApprover, async (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body; // ค่าที่จะเป็น 'approved' หรือ 'rejected'

    try {
        // สมมติว่า Booking เป็นโมเดลที่มีสถานะการจอง
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: status },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: 'Booking not found.' });
        
        // ส่งการอัปเดตแบบเรียลไทม์ไปยังทุกคน
        req.io.emit('bookingUpdated', booking);

        res.status(200).json({ message: `Booking request ${status}`, booking: booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking.' });
    }
});


module.exports = router;
