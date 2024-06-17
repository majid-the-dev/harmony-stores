import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export const POST = async (req) => {
  await mongooseConnect();
  const { firstName, lastName, phone, email, password, role } = await req.json();
  const adminDoc = await User.create({ firstName, lastName, phone, email, password, role });
  return Response.json(adminDoc);
};

export const GET = async () => {
  await mongooseConnect();
  const customersDoc = await User.find({ role: "admin" });
  return Response.json(customersDoc);
};
