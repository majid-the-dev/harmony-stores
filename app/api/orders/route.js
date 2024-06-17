import { mongooseConnect } from "@/lib/mongoose";
import { Orders } from "@/models/Orders";

export const POST = async (req) => {
  await mongooseConnect();

  try {
    const orderData = await req.json();

    const {
      orderId,
      userId,
      customerName,
      email,
      phone,
      address,
      products,
      discountValue,
      deliveryFee,
      totalPrice,
      orderType,
      pickupSchedule,
      pickupLocation,
      additionalInfo,
    } = orderData;

    if (
      !customerName ||
      !email ||
      !phone ||
      !products ||
      !totalPrice ||
      !orderType
    ) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const orderDoc = Orders.create({
      orderId,
      userId,
      customerName,
      email,
      phone,
      address,
      products,
      discountValue,
      deliveryFee,
      totalPrice,
      orderType,
      pickupSchedule,
      pickupLocation,
      additionalInfo,
    });

    return new Response(JSON.stringify({ success: true, data: orderDoc }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};

export const GET = async () => {
  await mongooseConnect();
  const ordersDoc = await Orders.find();
  return Response.json(ordersDoc);
};
