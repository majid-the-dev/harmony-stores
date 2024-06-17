"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
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
          console.log(orderData);
        } catch (error) {
          toast.error("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };

      getOrder();
    }
  }, [id]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));

    try {
      const response = await fetch(`/api/order-page/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      };

      toast.success("Order status updated successfully!");
    } catch (error) {
      toast.error("Failed to update order status");
      setOrder((prevOrder) => ({ ...prevOrder, status: order.status })); // Revert on error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-60">
        <LoaderIcon size={30} className="animate-spin text-black" />
      </div>
    );
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center py-60">
        <LoaderIcon size={30} className="animate-spin text-black" />
      </div>
    );
  };

  // Calculate subtotal
  const subtotal = order?.products?.reduce(
    (acc, product) => acc + product?.price * product?.quantity,
    0
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <h1 className="text-xl font-semibold">{order.orderId}</h1>
          <p className="text-gray-500 text-xs mt-1">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center border border-gray-200 gap-3 rounded-lg px-4 py-2.5">
          <p className="text-gray-500 text-xs font-medium">Status:</p>
          <select
            className="bg-transparent text-red-600 text-xs font-semibold outline-none cursor-pointer"
            onChange={handleStatusChange}
          >
            {order.orderType === "pickup" && (
              <>
                <option value={order.status}>{order.status}</option>
                <option value="Processing">Processing</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Received">Received</option>
              </>
            )}
            {order.orderType === "delivery" && (
              <>
                <option value={order.status}>{order.status}</option>
                <option value="Processing">Processing</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Arrived">Arrived</option>
                <option value="Received">Received</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 mt-8">
        <p className="text-sm font-medium">Summary</p>
        <div className="overflow-x-auto">
          <Table className="mt-6 min-w-full">
            <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
              <TableRow>
                <TableHead className="whitespace-nowrap font-normal">
                  Item
                </TableHead>
                <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                  Name
                </TableHead>
                <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                  Qty.
                </TableHead>
                <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                  Price
                </TableHead>
                <TableHead className="text-right whitespace-nowrap font-normal pr-14 md:pr-7">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {order.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                    {product.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                    x{product.quantity}
                  </TableCell>
                  <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                    &#8358; {formatPrice(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    &#8358; {formatPrice(product.price * product.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-full max-w-sm flex flex-col gap-4 border-t border-gray-200 py-6 mt-14">
            {/* <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs">Sub-total</p>
              <p className="text-xs font-medium">
                &#8358; {formatPrice(order.subtotal)}
              </p>
            </div> */}
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs">Discount</p>
              <p className="text-xs font-medium">
                - &#8358; {formatPrice(order.discountValue)}
              </p>
            </div>
            {order.orderType === "delivery" && (
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">Delivery Fee</p>
                <p className="text-xs font-medium">
                  &#8358; {formatPrice(order.deliveryFee)}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">Total</p>
              <p className="text-xs font-semibold">
                &#8358; {formatPrice(order.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="col-span-2 md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium">Customer Information</p>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center justify-between ">
                <p className="text-gray-500 text-xs">Name</p>
                <p className="text-xs font-medium">{order.customerName}</p>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="text-xs font-medium">{order.email}</p>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-gray-500 text-xs">Phone</p>
                <p className="text-xs font-medium">{order.phone}</p>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-gray-500 text-xs">Address</p>
                <p className="text-xs font-medium">{order.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium">Order Details</p>
            {order.orderType === "delivery" && (
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center justify-between ">
                  <p className="text-gray-500 text-xs">Order Type</p>
                  <p className="text-xs font-medium capitalize">
                    {order.orderType}
                  </p>
                </div>
                {order.additionalInfo && (
                  <div className="flex items-start justify-between ">
                    <p className="flex-1 text-gray-500 text-xs">
                      Additional Info
                    </p>
                    <p className="flex-1 text-xs font-medium capitalize text-right leading-6">
                      {order.additionalInfo}
                    </p>
                  </div>
                )}
              </div>
            )}
            {order.orderType === "pickup" && (
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center justify-between ">
                  <p className="text-gray-500 text-xs">Order Type</p>
                  <p className="text-xs font-medium capitalize">
                    {order.orderType}
                  </p>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="text-gray-500 text-xs">Pickup Schedule</p>
                  <p className="text-xs font-medium capitalize">
                    {order.pickupSchedule}
                  </p>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="text-gray-500 text-xs">Pickup Store</p>
                  <p className="text-xs font-medium capitalize">
                    {order.pickupLocation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
