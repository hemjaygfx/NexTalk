
import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not set in your .env file');
  process.exit(1);
}

console.log('Testing MongoDB connection...');

async function testConnection() {
  try {
    console.log('Connecting...');
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 20000
    });
    console.log('SUCCESS! MongoDB Connected! Host:', conn.connection.host);
    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('ERROR:', error);
    process.exit(1);
  }
}

testConnection();





