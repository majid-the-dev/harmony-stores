import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
    const body = await req.json();
    mongoose.connect(process.env.MONGODBURI);
    const password = body.password;

    const notHashedPassword = password;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const userDoc = await User.create(body);
    return Response.json(userDoc);
};