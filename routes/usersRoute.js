import express from 'express';
import {
  driverSignup,
  getUserById,
  login,
  protectedRoute,
  userSignup,
} from '../controllers/authControllers.js';

const usersRouter = express.Router();

usersRouter.post('/user-signup', userSignup);
usersRouter.post('/driver-signup', driverSignup);
usersRouter.post('/login', login);
usersRouter.get('/me', protectedRoute, getUserById);

export default usersRouter;
