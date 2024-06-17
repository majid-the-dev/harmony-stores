import { mongooseConnect } from "@/lib/mongoose";
import { Coupons } from "@/models/Coupon";

export const PUT = async (req, {params}) => {
    await mongooseConnect();

    const {id} = params;
    const {status} = await req.json();

    const couponDoc = await Coupons.findByIdAndUpdate(
        id,
        {status}
    );

    return Response.json(couponDoc);
};