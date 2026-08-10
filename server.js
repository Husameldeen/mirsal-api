import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

// process.on('uncaughtException', (err) => {
//   console.log('ERROR');
//   console.log(err.name, ',', err.message);
//   process.exit(1);
// });

const port = process.env.PORT || 3000;
const db = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS);

// mongoose.connect(db).then(() => console.log('connected successfully!!!'));

// const db = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASS);

console.log('SERVER.JS IS RUNNING');

try {
  console.log('Connecting to MongoDB...');

  await mongoose.connect(db);

  console.log('✅ MongoDB connected');
} catch (err) {
  console.error('❌ MongoDB connection failed');
  console.error(err);
}

const server = app.listen(port, () =>
  console.log(`Server is listening to request on port ${port}`),
);

// process.on('unhandledRejection', (err) => {
//   console.log('ERROR');
//   console.log(err.name, ',', err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
