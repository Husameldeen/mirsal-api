import Order from '../models/ordersModel.js';

export const newOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      dishes: req.body.dishes,
      user: req.user.id,
      startLocation: req.body.startLocation,
      deliveryLocation: req.body.deliveryLocation,
    });

    res.status(201).json({
      status: 'success',
      data: newOrder,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
    });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id).populate({
      path: ['dishes', 'user'],
    });

    res.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
    });
  }
};
