import { mongooseConnect } from "@/lib/mongoose";
import { TrendingProduct } from "@/models/TrendingProduct";

export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    
    const trendingProducts = await TrendingProduct.find().populate('product');

    // Return an empty array instead of a 404 error if no trending products are found
    const trendingProductIds = trendingProducts.length > 0 
      ? trendingProducts.map(tp => tp.product._id.toString()) 
      : [];
    
    return new Response(JSON.stringify(trendingProductIds), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
