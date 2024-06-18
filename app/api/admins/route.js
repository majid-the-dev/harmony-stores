import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  await mongooseConnect();
  const { firstName, lastName, phone, email, password, role } =
    await req.json();

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const adminDoc = await User.create({
    firstName,
    lastName,
    phone,
    email,
    password: hashedPassword,
    role,
  });
  return Response.json(adminDoc);
};

export const GET = async () => {
  await mongooseConnect();
  const customersDoc = await User.find({ role: "admin" });
  return Response.json(customersDoc);
};
