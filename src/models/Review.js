const Sequelize = require("sequelize");
const sequelize = require("../config/DatabaseConfig");

const Review = sequelize.define("reviews", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        field: "id",
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        field: "comment",
    },
    serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        field: "ServiceId",
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        field: "userId",
    },
});

module.exports = Review;
