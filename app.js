import express from 'express';
import usersRouter from './routes/usersRoute.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import connectDB from './db.js';

await connectDB();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,

  standardHeaders: 'draft-8',
  legacyHeaders: true, // set false to disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56,
  message: 'too much request frm thi IP, Please try again in one hour!',
});

console.log('APP STARTED');

const app = express();

app.use(helmet()); // Set HTTP Security Headers
app.use('/api', limiter); // Limit requests from same IP

app.use(express.json({ limit: '10kb' })); // Reading  data from body of request
app.set('query parser', 'extended'); // Reading  data from body of request

const dbStatus = {
  hasDBURL: !!process.env.DB_URL,
  hasDBPASS: !!process.env.DB_PASS,
};

console.log('APP.JS IS RUNNING');

app.get('/db-status', (req, res) => {
  res.json({
    readyState: mongoose.connection.readyState,
    DB: dbStatus,
  });
});

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success', env: process.env });
});

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next('cant find this route');
});

export default app;
