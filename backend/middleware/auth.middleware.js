const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware สำหรับตรวจสอบว่า Token ถูกต้องหรือ
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
        req.user = decoded;
        next();
    });
};

// ตรวจสอบว่าผู้ใช้เป็น Student (นักเรียน) หรือไม่
exports.isStudent = (req, res, next) => {
    if (req.user.role !== 'Student') return res.status(403).json({ message: 'Access denied. Only students are allowed.' });
    next();
};

// ตรวจสอบว่าผู้ใช้เป็น Staff (เจ้าหน้าที่) หรือไม่
exports.isStaff = (req, res, next) => {
    if (req.user.role !== 'Staff') return res.status(403).json({ message: 'Access denied. Only staff members are allowed.' });
    next();
};

// ตรวจสอบว่าผู้ใช้เป็น Approver (ผู้มีสิทธิ์อนุมัติ เช่น อาจารย์) หรือไม่
exports.isApprover = (req, res, next) => {
    if (req.user.role !== 'Approver') return res.status(403).json({ message: 'Access denied. Only approvers are allowed.' });
    next();
};