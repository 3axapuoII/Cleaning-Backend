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
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        field: "rate",
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        field: "date",
    },
});

module.exports = Review;
