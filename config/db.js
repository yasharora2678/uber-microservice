const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the database");
    }
    catch (error) {
        console.error('Error connecting to the database. \nExiting now...', error);
        process.exit(1);
    }
}

module.exports = { connectDB };