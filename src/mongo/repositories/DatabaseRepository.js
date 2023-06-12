const mongoose = require('mongoose');
const databaseScheme = require("../schemes/DatabaseScheme");

const Database = mongoose.model("cleaaning_logs", databaseScheme);
//Database
module.exports = Database;