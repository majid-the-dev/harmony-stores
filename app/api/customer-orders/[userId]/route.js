import { mongooseConnect } from "@/lib/mongoose";
import { Orders } from "@/models/Orders";

export const GET = async (req, { params }) => {
  await mongooseConnect();

  const { userId } = params;

  try {
    const orders = await Orders.find({ userId }).exec();

    if (!orders) {
      return new Response(
        JSON.stringify({ error: "No orders found for this user." }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Failed to get orders:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
