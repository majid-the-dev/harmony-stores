import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  discountValue: {
    type: Number
  },
  deliveryFee: {
    type: Number
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderType: {
    type: String,
    enum: ["delivery", "pickup"],
    required: true,
  },
  pickupSchedule: {
    type: String,
  },
  pickupLocation: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  status: {
    type: String,
    default: "Processing"
  }
}, {timestamps: true});

export const Orders = models?.Orders || model('Orders', OrderSchema);
