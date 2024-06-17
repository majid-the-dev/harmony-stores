import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";

export const GET = async (req, { params }) => {
  await mongooseConnect();
  const { id } = params;
  const category = await Categories.findById(id).populate('parent');
  return Response.json(category);
};
