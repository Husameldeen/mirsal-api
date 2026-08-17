import express from 'express';
import {
  addDish,
  getAllDishes,
  getDishById,
} from '../controllers/dishesControllers.js';
import {
  protectedRoute,
  restrictedTo,
} from '../controllers/authControllers.js';

const dishesRouter = express.Router();

dishesRouter.get('/', protectedRoute, getAllDishes);
dishesRouter.get('/:id', protectedRoute, getDishById);
dishesRouter.post('/add-dish', protectedRoute, restrictedTo('admin'), addDish);

export default dishesRouter;
