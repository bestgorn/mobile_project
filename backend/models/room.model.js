// models/room.model.js
const connection = require('../config/db.config');

// สร้างฟังก์ชันเพื่อเพิ่มห้องใหม่
const createRoom = (room_name, status = 'free') => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO rooms (room_name, status) VALUES (?, ?)';
        connection.query(sql, [room_name, status], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// ฟังก์ชันสำหรับอัปเดตข้อมูลห้อง
const updateRoom = (room_id, room_name, status) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE rooms SET room_name = ?, status = ? WHERE id = ?';
        connection.query(sql, [room_name, status, room_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// ฟังก์ชันสำหรับลบห้อง
const deleteRoom = (room_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM rooms WHERE id = ?';
        connection.query(sql, [room_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// ฟังก์ชันอื่นๆ เช่น getAllRooms
const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM rooms';
        connection.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRooms 
};
