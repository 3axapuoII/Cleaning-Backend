const Sequelize = require("sequelize");
const sequelize = require("../config/DatabaseConfig");

const UserInfo = sequelize.define("user_infos", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        field: "id",
    },
    avatar: {
        type: Sequelize.STRING(256),
        allowNull: true,
        unique: false,
        field: "avatar",
    },
    firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: false,
        field: "first_name",
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: "email",
    },
    phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: false,
        field: "phone",
    }, 
       userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: "userId",
    },
});
module.exports = UserInfo;
