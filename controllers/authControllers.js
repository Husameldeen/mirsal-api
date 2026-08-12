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
    // sameSite: 'Lax',
    // secure: false,
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
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

export const driverSignup = async (req, res, next) => {
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
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      throw new Error('Please provide your email & password!');

    const user = await User.findOne({ email }).select('+password');

    const isCorrectPass = await user?.checkPassword(password, user.password);

    if (!user || !isCorrectPass) throw new Error('Wrong email or password!');

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

export const protectedRoute = async (req, res, next) => {
  try {
    // GET USER TOKEN AND VERFIY IT
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) throw new Error('Please login to performe this action!');

    // VERFING THE TOKEN
    const decodedJWT = await jwt.verify(token, process.env.JWT_SECRET);

    // CHECK IF USER STILL EXIST IN DATABASE
    const currentUser = await User.findById(decodedJWT.id);

    if (!currentUser) throw new Error('This user has been deleted!');

    req.user = currentUser;

    next();
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

export const restrictedTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: 'you are not authorized to perform this action!' });
      return;
    }

    next();
  };
};

export const getUserById = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      data: userData,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};
