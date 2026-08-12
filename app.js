import express from 'express';
import usersRouter from './routes/usersRoute.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,

  standardHeaders: 'draft-8',
  legacyHeaders: true, // set false to disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56,
  message: 'too much request frm thi IP, Please try again in one hour!',
});

const app = express();

app.use(express.static('public'));
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Vite
      'http://localhost:5500', // LiveServer
      'http://localhost:5000', // LiveServer
      'http://localhost:3000', // Next.js
      'https://your-frontend.vercel.app',
    ],
    credentials: true,
  }),
); // set HTTP headers on response
app.use(cookieParser());
app.use(helmet()); // Set HTTP Security Headers
app.use('/api', limiter); // Limit requests from same IP

app.use(express.json({ limit: '10kb' })); // Reading  data from body of request
app.set('query parser', 'extended'); // Reading  data from body of request

app.get('/', (req, res, next) => {
  res.status(200).send('Server is running on vercel!');
});

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next('cant find this route');
});

export default app;
