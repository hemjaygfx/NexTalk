/* import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
 */

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Mongo DB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connection to MONGODB : ", error);
        process.exit(1); // 1 status code means fail, 0 means success
    }
}