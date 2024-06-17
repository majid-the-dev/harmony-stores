import { mongooseConnect } from "@/lib/mongoose";
import { TrendingProduct } from "@/models/TrendingProduct";
import { Products } from "@/models/Products";

export const POST = async (req, { params }) => {
  try {
    await mongooseConnect();
    const { id } = params;
    const product = await Products.findById(id);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    const trendingProduct = new TrendingProduct({ product: id });
    await trendingProduct.save();

    return new Response("Product marked as trending", { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();
    const { id } = params;

    await TrendingProduct.findOneAndDelete({ product: id });

    return new Response("Product removed from trending", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    const { id } = params;
    const product = await Products.findById(id).populate('category');

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
