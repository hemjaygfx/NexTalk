
import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async function() {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not set");
        }

        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log('Mongo DB Connected : ' + conn.connection.host);
    } catch (error) {
        console.error('Error connection to MONGODB : ', error);
        process.exit(1);
    }
};
