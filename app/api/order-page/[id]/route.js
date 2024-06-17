import { mongooseConnect } from "@/lib/mongoose";
import { Orders } from "@/models/Orders";

export const GET = async (req, { params }) => {
  await mongooseConnect();

  try {
    const { id } = params;
    const orderDoc = await Orders.findById(id);

    if (!orderDoc) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(orderDoc), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  await mongooseConnect();

  try {
    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return new Response(JSON.stringify({ error: "Status is required" }), {
        status: 400,
      });
    }

    const orderDoc = await Orders.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!orderDoc) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(orderDoc), { status: 200 });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
