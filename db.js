import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let connected = false;

export default async function connectDB() {
  if (connected) return;

  const db = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS);

  await mongoose.connect(db);

  connected = true;

  console.log('MongoDB connected');
}
