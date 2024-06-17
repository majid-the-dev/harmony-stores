import mongoose, { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    availability: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    properties: [
        {
            name: { type: String, required: true },
            description: { type: String, required: true }
        }
    ],
    images: [{type: String}],
    category: {
        type: mongoose.Types.ObjectId, 
        ref:'Categories',
        required: true
    },
    weightClass: {
        type: String,
        required: true
    },
    freeDelivery: {
        type: String,
        required: true 
    }
}, { timestamps: true});

export const Products = models?.Products || model('Products', ProductsSchema);