import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";
import { Products } from "@/models/Products";

export const GET = async (req) => {
  await mongooseConnect();

  try {
    const category = await Categories.findOne({ name: "Laptops" });

    if (!category) {
      //   return res.status(404).json({ message: "Category not found" });
      return new Response("Category not found", { status: 404 });
    }

    const products = await Products.find({ category: category._id })
      .limit(6)
      .exec();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    // res.status(200).json(products);
  } catch (error) {
    // res.status(500).json({ error: "Failed to fetch products" });
    return new Response("Failed to fetch products", { status: 500 });
  }
};
