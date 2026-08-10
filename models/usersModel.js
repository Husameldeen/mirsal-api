import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minLength: [3, 'username must be 3 characters at least'],
    maxLength: [15, 'username must be 15 characters maximum'],
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email!'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user',
  },
  carPlateNum: Number,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    min: [8, 'password length must be 8 characters at least'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      // only work on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.methods.checkPassword = async function (candPass, userPass) {
  return await bcrypt.compare(candPass, userPass);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('Users', userSchema);

export default User;
