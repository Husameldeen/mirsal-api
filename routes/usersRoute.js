import express from 'express';
import {
  driverSignup,
  login,
  userSignup,
} from '../controllers/authControllers.js';

const usersRouter = express.Router();

usersRouter.post('/user-signup', userSignup);
usersRouter.post('/driver-signup', driverSignup);
usersRouter.post('/login', login);

export default usersRouter;
