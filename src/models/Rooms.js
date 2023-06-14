const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseConfig");

const bcrypt = require("bcrypt");



const Rooms = sequelize.define('Services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DOUBLE},
    description: {type: DataTypes.STRING, allowNull: true},
});

module.exports = Rooms;