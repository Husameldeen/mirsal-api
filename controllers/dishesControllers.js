import Dish from '../models/dishesModel.js';

export const addDish = async (req, res, next) => {
  try {
    const newDish = await Dish.create({
      name: req.body.name,
      ingredients: req.body.ingredients,
      price: req.body.price,
      currency: req.body.currency,
      preparationTime: req.body.preparationTime,
      category: req.body.category,
      spicyLevel: req.body.spicyLevel,
      available: req.body.available,
      image: `/images/${req.body.name}.jpg`,
      rating: req.body.rating,
    });

    res.status(201).json({
      message: 'success',
      data: newDish,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'failed',
    });
  }
};

export const getAllDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find();

    res.status(200).json({
      message: 'success',
      result: dishes.length,
      data: dishes,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'failed',
    });
  }
};

export const getDishById = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.id);

    res.status(200).json({
      message: 'success',
      data: dish,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'failed',
    });
  }
};
