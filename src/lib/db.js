import mongoose from "mongoose";

const url = process.env.DATABASE_URL;
let connection;

const connectDB = async () => {
    if (!connection) {
        connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return connection;
};

export default connectDB;
