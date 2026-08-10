import express from 'express';
import usersRouter from './routes/usersRoute.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,

  standardHeaders: 'draft-8',
  legacyHeaders: true, // set false to disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56,
  message: 'too much request frm thi IP, Please try again in one hour!',
});

const app = express();

app.use(helmet()); // Set HTTP Security Headers
app.use('/api', limiter); // Limit requests from same IP

app.use(express.json({ limit: '10kb' })); // Reading  data from body of request
app.set('query parser', 'extended'); // Reading  data from body of request

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success', env: process.env });
});

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next('cant find this route');
});

export default app;
