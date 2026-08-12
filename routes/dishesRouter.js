import express from 'express';
import { addDish, getAllDishes } from '../controllers/dishesControllers.js';
import {
  protectedRoute,
  restrictedTo,
} from '../controllers/authControllers.js';

const dishesRouter = express.Router();

dishesRouter.get('/', getAllDishes);
dishesRouter.post('/add-dish', protectedRoute, restrictedTo('admin'), addDish);

export default dishesRouter;
