import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";

// export const GET = async () => {
//   await mongooseConnect();
//   const categories = await Categories.find().populate('parent');
  
//   const buildCategoryTree = (categories, parent = null) => {
//     return categories
//       .filter(category => (category.parent ? category.parent._id.equals(parent) : !parent))
//       .map(category => ({
//         ...category._doc,
//         children: buildCategoryTree(categories, category._id)
//       }));
//   };

//   const categoryTree = buildCategoryTree(categories);
//   return Response.json(categoryTree);
// };



export const GET = async () => {
  await mongooseConnect();
  const categories = await Categories.find().populate('parent');

  const buildCategoryTree = (categories, parent = null) => {
    return categories
      .filter(category => (category.parent ? category.parent._id.equals(parent) : !parent))
      .map(category => ({
        _id: category._id,
        name: category.name,
        parent: category.parent ? category.parent._id : null,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        children: buildCategoryTree(categories, category._id)
      }));
  };

  const categoryTree = buildCategoryTree(categories);
  return new Response(JSON.stringify(categoryTree), {
    headers: { "Content-Type": "application/json" },
  });
};
