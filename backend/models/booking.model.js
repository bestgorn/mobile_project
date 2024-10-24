const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
});

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
    },
    approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Export the model
module.exports = Booking;
