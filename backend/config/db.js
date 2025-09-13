// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// export const connectDB = async () => {
//   const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_runtime_terror';
//   mongoose.set('strictQuery', true);
//   await mongoose.connect(uri, { dbName: 'sih_runtime_terror' });
//   console.log('MongoDB connected');
// };

// db.js

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in the .env file');
    }

    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};