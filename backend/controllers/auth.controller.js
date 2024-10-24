const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config'); // เชื่อมต่อฐานข้อมูล

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
exports.register = async (req, res) => {
    const { username, password, email, confirmPassword } = req.body;

    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!username || !password || !email || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        // ตรวจสอบว่ามีผู้ใช้ที่มี username หรือ password ซ้ำหรือไม่
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? OR password = ?', [username, hashedPassword]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or password already exists.' });
        }

        // กำหนด role ตาม email
        let role = 'Student'; // ค่าเริ่มต้นเป็น Student
        if (email === 'staff@gmail.com') {
            role = 'Staff';
        } else if (email === 'approver@gmail.com') {
            role = 'Approver';
        }

        // บันทึกผู้ใช้ลงในฐานข้อมูล
        await db.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, role]);

        res.status(201).json({ message: 'User registered successfully', role });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


// ฟังก์ชันสำหรับการล็อกอิน
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // ค้นหาผู้ใช้ในฐานข้อมูล
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // สร้าง JWT พร้อมกับบทบาท
        const token = jwt.sign(
            { id: user[0].id, username: user[0].username, role: user[0].role }, // เพิ่ม role
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // กำหนดเวลาหมดอายุของ JWT
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};



// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, email, role FROM users');

        // แปลงข้อมูลผู้ใช้เป็นอ็อบเจกต์
        const usersObject = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role // เพิ่มเครื่องหมายคอมม่า
        }));

        res.status(200).json(usersObject);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};


// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้โดย ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.query('SELECT id, username, email, role FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // แปลงข้อมูลผู้ใช้เป็นอ็อบเจกต์
        const userObject = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            role: user[0].role // เพิ่มข้อมูลบทบาท
        };

        res.status(200).json(userObject);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
};



// ฟังก์ชันสำหรับการอัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
        // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // ถ้ารหัสผ่านถูกส่งมา ให้เข้ารหัสก่อน
        let hashedPassword = user[0].password; // ใช้รหัสผ่านเดิมหากไม่ได้ส่งรหัสผ่านใหม่
        if (password) {
            hashedPassword = await bcrypt.hash(password, 8);
        }

        // ตรวจสอบว่า username และ email ถูกส่งมาหรือไม่ และอัปเดต role
        await db.query('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?', 
        [username || user[0].username, email || user[0].email, hashedPassword, role || user[0].role, id]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
// ฟังก์ชันสำหรับการลบผู้ใช้
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};



//ติดปัญหาตรง ใช้ เมธอด put แล้ว ไม่อัพเดต role ให้