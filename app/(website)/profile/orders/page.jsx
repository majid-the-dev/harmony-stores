"use client";

import ProfileNavigation from "@/components/ProfileNavigation";
import { formatDate, formatPrice } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingScreen from "@/components/LoadingScreen";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = session || {};
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    if (userId) {
      getOrders();
    }
  }, [userId]);

  const getOrders = async () => {
    try {
      const response = await fetch(`/api/customer-orders/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <>
      {status === "loading" || loading ? (
        <LoadingScreen />
      ) : (
        <div className="px-6">
          <div className="flex items-center gap-3 text-xs py-12">
            <Link href={"/"} className="text-black font-medium">
              Home
            </Link>
            <LiaAngleRightSolid />
            <Link href={"/profile"} className="text-black font-medium">
              Profile
            </Link>
            <LiaAngleRightSolid />
            <p className="text-gray-400">Orders</p>
          </div>

          <div className="mt-2 mb-24">
            <div className="grid grid-cols-4 gap-10">
              <div className="col-span-4 md:col-span-1">
                <ProfileNavigation />
              </div>
              <div className="col-span-4 md:col-span-3">
                <h1 className="text-2xl font-semibold">Recent Orders</h1>
                <div>
                  {orders.length === 0 ? (
                    <p>No orders found.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table className="mt-10 min-w-full">
                        <TableHeader className="bg-white text-xs hover:bg-white">
                          <TableRow className="hover:bg-white">
                            <TableHead className="whitespace-nowrap text-black font-semibold">
                              Order Id
                            </TableHead>
                            <TableHead className="text-black font-semibold whitespace-nowrap pr-14 md:pr-7">
                              Date Created
                            </TableHead>
                            <TableHead className="text-black font-semibold whitespace-nowrap pr-14 md:pr-7">
                              Status
                            </TableHead>
                            <TableHead className="text-black font-semibold whitespace-nowrap pr-14 md:pr-7">
                              Quantity
                            </TableHead>
                            <TableHead className="text-black font-semibold text-right whitespace-nowrap">
                              Total Paid
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="text-xs">
                          {orders.slice().reverse().map((order) => (
                            <TableRow key={order.orderId} className="bg-white cursor-pointer">
                              <Link href={`/profile/orders/${order._id}`} className="contents">
                                <TableCell className="whitespace-nowrap pr-14 md:pr-7">{order.orderId}</TableCell>
                                <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                                  {formatDate(order.createdAt)}
                                </TableCell>
                                <TableCell className="text-red-600 whitespace-nowrap pr-14 md:pr-7">{order.status}</TableCell>
                                <TableCell className="whitespace-nowrap pr-14 md:pr-7">
                                  {calculateTotalQuantity(order.products)}
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                  &#8358; {formatPrice(order.totalPrice)}
                                </TableCell>
                              </Link>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
