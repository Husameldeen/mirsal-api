import Dish from '../models/dishesModel.js';
import Order from '../models/ordersModel.js';

export const newOrder = async (req, res, next) => {
  let deliveryPrice;
  let orderPrice;
  let route;

  try {
    const dishesData = req.body.dishes.map(
      async (dish) => await Dish.findById(dish),
    );
    const data = await Promise.all(dishesData);
    // const prices = data.map((dish) => dish.price);
    orderPrice = data.reduce((acc, cur) => acc + cur.price, 0);
  } catch (err) {
    console.log(err);
  }

  try {
    const startLocation = req.body.startLocation.coordinates;
    const deliveryLocation = req.body.deliveryLocation.coordinates;

    // FETCH REQ to collect data about distance and route of an order
    const data = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLocation[0]},${startLocation[1]};${deliveryLocation[0]},${deliveryLocation[1]}?overview=full&geometries=geojson`,
    );

    const orderInfo = await data.json();

    deliveryPrice = Math.round((orderInfo.routes[0].distance * 2000) / 1000);

    route = orderInfo.routes[0].geometry.coordinates;
    // console.log(orderInfo.routes[0].distance, deliveryPrice);
  } catch (err) {
    console.log(err);
  }
  try {
    const newOrder = await Order.create({
      dishes: req.body.dishes,
      user: req.user.id,
      startLocation: req.body.startLocation,
      deliveryLocation: req.body.deliveryLocation,
      orderPrice,
      deliveryPrice: deliveryPrice,
    });

    res.status(201).json({
      status: 'success',
      data: newOrder,
      route,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
    });
  }
};

export const getOrderById = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id).populate({
      path: ['dishes', 'user'],
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
    });
  }

  try {
    // FETCH REQ to collect data about route of an order
    const data = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${order.startLocation.coordinates[0]},${order.startLocation.coordinates[1]};${order.deliveryLocation.coordinates[0]},${order.deliveryLocation.coordinates[1]}?overview=full&geometries=geojson`,
    );

    const orderInfo = await data.json();

    const route = orderInfo.routes[0].geometry.coordinates;

    res.status(200).json({
      status: 'success',
      data: order,
      route,
    });
  } catch (err) {
    console.log(err);
  }
};
