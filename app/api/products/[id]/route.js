// import { mongooseConnect } from "@/lib/mongoose";
// import { Products } from "@/models/Products";

// export const GET = async (req, { params }) => {
//   await mongooseConnect();
//   const { id } = params;
//   const products = await Products.find({ category: id });
//   return Response.json(products);
// };


// api/products/[id].js
// import { mongooseConnect } from "@/lib/mongoose";
// import { Products } from "@/models/Products";
// import { Categories } from "@/models/Categories";
// import getAllSubcategories from "@/lib/getAllSubcategories";

// export const GET = async (req, { params }) => {
//   await mongooseConnect();
//   const { id } = params;

//   // Fetch all subcategories recursively
//   const subcategories = await getAllSubcategories(id);
//   const allCategories = [id, ...subcategories];

//   // Fetch products for the given category and all its subcategories
//   const products = await Products.find({ category: { $in: allCategories } });
  
//   return Response.json(products);
// };



import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";
import { Categories } from "@/models/Categories";

// Helper function to recursively fetch all subcategory IDs
const getAllSubcategories = async (categoryId) => {
  const subcategories = await Categories.find({ parent: categoryId }).exec();
  let allSubcategories = subcategories.map(category => category._id);

  for (let category of subcategories) {
    const subSubcategories = await getAllSubcategories(category._id);
    allSubcategories = allSubcategories.concat(subSubcategories);
  }

  return allSubcategories;
};

export const GET = async (req, { params }) => {
  await mongooseConnect();
  const { id } = params;

  // Fetch all subcategories recursively
  const subcategories = await getAllSubcategories(id);
  const allCategories = [id, ...subcategories];

  // Fetch products for the given category and all its subcategories
  const products = await Products.find({ category: { $in: allCategories } });

  return new Response(JSON.stringify(products), { status: 200 });
};

