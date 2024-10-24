const Booking = require('../models/booking.model');
const History = require('../models/history.model');

// เมื่อการจองได้รับการอนุมัติ/ปฏิเสธ จะบันทึกลงใน History
exports.bookingHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await Booking.findAll({ where: { user_id: userId }, include: [Room] });

        // สมมติว่า History เป็นโมเดลที่คุณใช้ในการบันทึกประวัติ
        await History.create({
            userId: userId,
            bookings: bookings,
        });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
