import mongoose, { Schema, model, models } from "mongoose";

const TrendingProductSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
}, {  timestamps: true});

export const TrendingProduct = models?.TrendingProduct || model('TrendingProduct', TrendingProductSchema);
