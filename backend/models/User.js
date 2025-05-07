// ./models/user.js
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../database");


const User = db.define('user',{
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',

    },
})

module.exports = User