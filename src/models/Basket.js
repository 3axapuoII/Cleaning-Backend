const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseConfig");
const bcrypt = require("bcrypt");

const Basket = sequelize.define('OrdersServ', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    OrderId: {type: DataTypes.INTEGER},
    ServiceId: {type: DataTypes.INTEGER, allowNull:false},
});

module.exports = Basket;