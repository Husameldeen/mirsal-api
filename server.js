import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import app from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;
const db = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS);

async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(db);

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed');
    console.error(err);
  }
}

connectDB();

// const server = app.listen(port, () =>
//   console.log(`Server is listening to request on port ${port}`),
// );
