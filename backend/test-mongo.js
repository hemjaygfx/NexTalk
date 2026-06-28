
import mongoose from "mongoose";

const MONGO_URI = 'mongodb://hemjaystarz_db_user:5vb0XK5PjWy15AEd@ac-zzwapcs-shard-00-00.ibgkbbb.mongodb.net:27017,ac-zzwapcs-shard-00-01.ibgkbbb.mongodb.net:27017,ac-zzwapcs-shard-00-02.ibgkbbb.mongodb.net:27017/NexTalk_db?ssl=true&replicaSet=atlas-l8m5nn-shard-0&authSource=admin&appName=Cluster0';

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
