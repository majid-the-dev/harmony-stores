import { mongooseConnect } from "@/lib/mongoose";
import { Coupons } from "@/models/Coupon";

export const POST = async (req) => {
  await mongooseConnect();

  const { name, code, type, percentage, amount } = await req.json();
  const couponDoc = await Coupons.create({ name, code, type, percentage, amount });
  return Response.json(couponDoc);
};

export const GET = async (req) => {
  await mongooseConnect();

  const couponDoc = await Coupons.find();
  return Response.json(couponDoc);
};

export const PUT = async (req) => {
    await mongooseConnect();

    const { id, name, code, type, percentage, amount } = await req.json();
    const couponDoc = await Coupons.findByIdAndUpdate(
        id,
        {name, code, type, percentage, amount}
    );
    return Response.json(couponDoc);
};

export const DELETE = async (req) => {
  await mongooseConnect();
  const { id } = await req.json();
  await Coupons.findByIdAndDelete(id);
  return new Response('Coupon deleted successfully', { status: 200 });
};
