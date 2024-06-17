"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import OrderActionDropdown from "@/components/admin/OrderActionDropdown";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching orders!");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching orders!");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search query
  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Customer Orders</h1>
      <p className="text-xs font-normal text-gray-500 mt-1">
        Track and manage customer orders here.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          <div className="w-full mt-8">
            <form className="w-full">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search order ID here..."
                  className="w-full bg-gray-100 text-xs border border-gray-200 rounded-lg outline-none pl-9 pr-5 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {filteredOrders?.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                      Order ID
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                      Date
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                      Customer
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                      Status
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-14 md:pr-7">
                      Amount
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {filteredOrders?.length > 0 &&
                    filteredOrders.slice().reverse().map((order) => (
                      <TableRow>
                        <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                          {order.orderId}
                        </TableCell>
                        <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                          {order.email}
                        </TableCell>
                        <TableCell className="text-red-600 capitalize whitespace-nowrap pr-14 md:pr-7">
                          {order.status}
                        </TableCell>
                        <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                          &#8358; {formatPrice(order.totalPrice)}
                        </TableCell>
                        <TableCell className="float-end">
                          <OrderActionDropdown order={order} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center">
              <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                <CgTrashEmpty />
              </p>
              <p className="text-xs text-gray-500 font-normal mt-4">
                No orders yet!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
