const mongoose = require("mongoose");

const MongoConfig = require("../config/MongoConfig.json");

async function connect() {
    await mongoose.connect(
        'mongodb://127.0.0.1/Cleaning',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
}

module.exports = connect();
