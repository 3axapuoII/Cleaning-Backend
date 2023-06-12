const {Sequelize} = require('sequelize');
const MongoLogger = require('./../utils/MongoLogger');

const sequelize = new Sequelize("cleaning", "postgres", "'", {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    logging: false,
});

module.exports = sequelize;