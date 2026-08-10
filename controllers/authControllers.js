import User from '../models/usersModel.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
}

function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'PRODUCTION') cookieOptions.secure = true;

  user.password = undefined;

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
}

export const userSignup = async (req, res, next) => {
  console.log('signup is working');
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'failed',
    });
  }
};

export const driverSignup = async (req, res, next) => {
  console.log('signup is working');
  try {
    if (!req.body.carPlateNum)
      throw new Error('Please provide your vechile plate number!');

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      carPlateNum: req.body.carPlateNum,
      role: 'driver',
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
