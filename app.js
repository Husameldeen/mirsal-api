import express from 'express';
import usersRouter from './routes/usersRoute.js';

const app = express();

app.use(express.json({ limit: '10kb' })); // Reading  data from body of request
app.set('query parser', 'extended'); // Reading  data from body of request

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next('cant find this route');
});

export default app;
