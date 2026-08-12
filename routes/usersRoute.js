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

// const dirname = import.meta.dirname;
// usersRouter.get('/login-view', (req, res) => {
//   res.set('Content-Type', 'text/html');
//   res.status(200);
//   res.sendFile(`${dirname}/login.html`);
// });

export default usersRouter;
