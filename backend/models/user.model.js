// models/user.model.js
const connection = require('../config/db.config');

// สร้างฟังก์ชันเพื่อเพิ่มผู้ใช้ใหม่
const createUser = (username, password, email, confirmPassword) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        connection.query(sql, [username, password, email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    createUser
};
