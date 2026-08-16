import express from 'express';
import {
  protectedRoute,
  restrictedTo,
} from '../controllers/authControllers.js';
import { getOrderById, newOrder } from '../controllers/ordersControllers.js';

const orderRouter = express.Router();

orderRouter.post('/new-order', protectedRoute, restrictedTo('user'), newOrder);
orderRouter.get('/:id', protectedRoute, getOrderById);

export default orderRouter;
