const Room = require('../models/room.model');

// แสดงห้องทั้งหมด
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms.' });
    }
};

// เพิ่มห้องใหม่
exports.addRoom = async (req, res) => {
    const { roomNumber, capacity, equipment } = req.body;
    try {
        const newRoom = new Room({
            roomNumber,
            capacity,
            equipment,
        });
        await newRoom.save();
        
        // ส่งการอัปเดตแบบเรียลไทม์ไปยังทุกคน
        req.io.emit('roomUpdated', newRoom);

        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: 'Error adding room.' });
    }
};

// อัปเดตห้อง
exports.updateRoom = async (req, res) => {
    const roomId = req.params.id;
    const { roomNumber, capacity, equipment } = req.body;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { roomNumber, capacity, equipment },
            { new: true }
        );
        if (!updatedRoom) return res.status(404).json({ message: 'Room not found.' });
        
        // ส่งการอัปเดตแบบเรียลไทม์ไปยังทุกคน
        req.io.emit('roomUpdated', updatedRoom);

        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
        res.status(500).json({ message: 'Error updating room.' });
    }
};

// ลบห้อง
exports.deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) return res.status(404).json({ message: 'Room not found.' });

        // ส่งการอัปเดตแบบเรียลไทม์ไปยังทุกคน
        req.io.emit('roomUpdated', { roomId: roomId, deleted: true });

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room.' });
    }
};
