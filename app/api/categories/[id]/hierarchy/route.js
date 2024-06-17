import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";

const getCategoryHierarchy = async (categoryId, hierarchy = []) => {
  const category = await Categories.findById(categoryId).lean();
  if (category) {
    hierarchy.unshift(category); // Add category to the beginning of the hierarchy
    if (category.parent) {
      return getCategoryHierarchy(category.parent, hierarchy); // Fetch parent recursively
    }
  }
  return hierarchy;
};

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await mongooseConnect();

  try {
    const hierarchy = await getCategoryHierarchy(id);
    res.status(200).json(hierarchy);
  } catch (error) {
    console.error("Failed to fetch category hierarchy:", error);
    // res.status(500).json({ message: "Internal server error" });
  }
};
