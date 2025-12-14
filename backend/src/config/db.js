const mongoose = require("mongoose");

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

};

const disconnectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
};

module.exports = { connectDB, disconnectDB };
