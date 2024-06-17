"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { FaCircleCheck } from "react-icons/fa6";
import LoadingScreen from "@/components/LoadingScreen";

const page = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const getOrder = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/order-page/${id}`);
          const orderData = await response.json();
          setOrder(orderData);
        } catch (error) {
          toast.error("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };

      getOrder();
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="px-6 py-20">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <div className="bg-white rounded-lg p-6 mt-6">
            <p className="text-sm font-semibold">Order ID: {order.orderId}</p>
            <div className="flex items-center gap-4 mt-6">
              <p className="text-gray-500 text-xs font-medium uppercase">
                DATE:
              </p>
              <p className="text-xs font-semibold uppercase">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-gray-500 text-xs font-medium uppercase">
                ORDER TYPE:
              </p>
              <p className="text-xs font-semibold uppercase">
                {order.orderType}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-gray-500 text-xs font-medium uppercase">
                ORDER STATUS:
              </p>
              <p className="text-red-600 text-xs font-semibold uppercase">
                {order.status}
              </p>
            </div>

            <div className="mt-16">
              <p className="text-sm font-medium">Products</p>
              <hr className="my-2.5" />
              <ul className="flex flex-col gap-3 mt-6">
                {order?.products?.map((product) => (
                  <li className="text-xs">
                    {product.quantity} {product.title}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-8">
                <p className="text-gray-500 text-xs font-medium uppercase">
                  DISCOUNT:
                </p>
                <p className="text-xs font-semibold uppercase">
                  - &#8358; {formatPrice(order.discountValue)}
                </p>
              </div>
              {order.orderType === "delivery" && (
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-gray-500 text-xs font-medium uppercase">
                    DELIVERY:
                  </p>
                  <p className="text-xs font-semibold uppercase">
                    &#8358; {formatPrice(order.deliveryFee)}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 mt-3">
                <p className="text-gray-500 text-xs font-medium uppercase">
                  TOTAL:
                </p>
                <p className="text-red-600 text-xs font-semibold uppercase">
                  &#8358; {formatPrice(order.totalPrice)}
                </p>
              </div>
            </div>

            {order.orderType === "pickup" && (
              <div className="mt-12">
                <p className="text-sm font-medium">Details</p>
                <hr className="my-2.5" />
                <ul className="flex flex-col gap-4 mt-6">
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Name:{" "}
                    </span>
                    <span className="font-semibold">{order.customerName}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Phone Number:{" "}
                    </span>
                    <span className="font-semibold">{order.phone}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Email Address:{" "}
                    </span>
                    <span className="font-semibold">{order.email}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Pickup Schedule:{" "}
                    </span>
                    <span className="font-semibold">
                      {order.pickupSchedule}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Pickup Location:{" "}
                    </span>
                    <span className="font-semibold">
                      {order.pickupLocation}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {order.orderType === "delivery" && (
              <div className="mt-12">
                <p className="text-sm font-medium">Details</p>
                <hr className="my-2.5" />
                <ul className="flex flex-col gap-4 mt-6">
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Name:{" "}
                    </span>
                    <span className="font-semibold">{order.customerName}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Phone Number:{" "}
                    </span>
                    <span className="font-semibold">{order.phone}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Email Address:{" "}
                    </span>
                    <span className="font-semibold">{order.email}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Delivery Address:{" "}
                    </span>
                    <span className="font-semibold">{order.address}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 font-medium uppercase">
                      Additional Info:{" "}
                    </span>
                    <span className="font-semibold">
                      {order.additionalInfo}
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
