const mongoose = require('mongoose');
//access to config dir
const config = require('config');
//get all the config properties with config.get()
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("Connected to MongoDB...");
    }
    catch (err) {
        console.log(err.message);
        //exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;
