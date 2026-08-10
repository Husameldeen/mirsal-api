import express from 'express';
import { driverSignup, userSignup } from '../controllers/authControllers.js';

const usersRouter = express.Router();

usersRouter.post('/user-signup', userSignup);

usersRouter.post('/driver-signup', driverSignup);

export default usersRouter;
