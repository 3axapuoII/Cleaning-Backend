const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseConfig");

const bcrypt = require("bcrypt");


const Orders = sequelize.define('Orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {type: DataTypes.INTEGER},
    price: {type: DataTypes.DOUBLE, allowNull:false},
    review: {type: DataTypes.INTEGER, allowNull:true},
    begin_date: {type: DataTypes.DATE, field: "createdAt"},
} );

module.exports = Orders;