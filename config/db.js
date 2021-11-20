require('dotenv').config();
const mongoose = require('mongoose');

//access to config dir
// const config = require('config');
//get all the config properties with config.get()
// const db = config.get('mongoURI');

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@contactkeeper.sklwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI || db);
        console.log("Connected to MongoDB...");
    }
    catch (err) {
        console.log(err.message);
        //exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;
