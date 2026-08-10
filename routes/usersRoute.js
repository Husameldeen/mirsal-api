import express from 'express';
import { driverSignup, userSignup } from '../controllers/authControllers.js';

const usersRouter = express.Router();

usersRouter.post('/user-signup', (req, res, next) => {
  res.status(200).json({ status: 'success', data: null });
});

usersRouter.post('/driver-signup', driverSignup);

export default usersRouter;
