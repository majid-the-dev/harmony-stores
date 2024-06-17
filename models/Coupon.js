import mongoose, { Schema, model, models } from "mongoose";

const CouponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
  },
  amount: {
    type: Number
  },
  status: {
    type: String,
    default: "enabled",
  }
}, { timestamps: true });

export const Coupons = models?.Coupons || model('Coupons', CouponSchema);
