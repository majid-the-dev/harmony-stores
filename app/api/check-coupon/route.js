import { mongooseConnect } from "@/lib/mongoose";
import { Coupons } from "@/models/Coupon";

export const POST = async (req) => {
  await mongooseConnect();

  const { code } = await req.json();

  if (!code) {
    return new Response(JSON.stringify({ message: "Coupon code is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const coupon = await Coupons.findOne({ code });

  if (!coupon) {
    return new Response(JSON.stringify({ message: "Please enter a valid coupon code!" }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (coupon.status === "disabled") {
    return new Response(JSON.stringify({ message: "Sorry, this coupon is no longer valid!" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ coupon }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
