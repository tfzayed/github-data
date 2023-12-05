import mongoose from "mongoose";

const url = process.env.DATABASE_URL_LOCAL;

let connection;

const connectDB = async () => {
    if (!connection) connection = await mongoose.connect(url);

    return connection;
};

export default connectDB;
