import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  dishes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Dishes',
      required: [true, 'you must select a dish'],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: [true, 'Order must belong to a user'],
  },
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
  },
  deliveryLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
  },
  orderPrice: Number,
  deliveryPrice: Number,
});

orderSchema.index({ deliveryLocation: '2dsphere' });

const Order = mongoose.model('Order', orderSchema);

export default Order;
