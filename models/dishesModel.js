import mongoose from 'mongoose';

const dishesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A dish must have a name!'],
    unique: [true, 'The name must be unique'],
  },
  ingredients: [String],
  price: Number,
  currency: {
    type: String,
    default: 'SDG',
  },
  preparationTime: {
    type: String,
  },
  category: {
    type: String,
    enum: ['وجبة رئيسية', 'مشويات', 'شوربة', 'إفطار', 'مأكولات بحرية'],
    default: 'وجبة رئيسية',
  },
  spicyLevel: {
    type: String,
    enum: ['متوسط', 'خفيف', 'حار', 'حسب الطلب'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: String,
  rating: {
    type: Number,
    default: 4.5,
    validate: {
      validator: function (rating) {
        return rating > 5 || rating < 0 ? false : true;
      },
      message: 'rating must be between 0 and 5',
    },
  },
});

const Dish = mongoose.model('Dishes', dishesSchema);

export default Dish;
