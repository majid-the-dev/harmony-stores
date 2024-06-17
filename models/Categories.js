// import mongoose, { Schema, model, models } from "mongoose"

// const CategorySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     parent: {
//         type: mongoose.Types.ObjectId,
//         ref: 'Categories'
//     }
// }, { timestamps: true});

// export const Categories = models?.Categories || model('Categories', CategorySchema);

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Categories'
    }
});

export const Categories = mongoose.models.Categories || mongoose.model('Categories', CategorySchema);