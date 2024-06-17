"use client";

import NewCouponModal from "@/components/admin/NewCouponModal";
import { useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import CouponActionDropdown from "@/components/admin/CouponActionDropdown";
import { formatPrice } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const Page = () => {
  const [fetchCoupons, setFetchCoupons] = useState(true);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    try {
      const response = await fetch("/api/coupons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching coupons!");
      }

      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      toast.error("Error fetching coupons!");
    } finally {
      setFetchCoupons(false);
    }
  };

  const handleCouponCreated = async () => {
    await getCoupons();
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await fetch("/api/coupons", {
        method: "DELETE",
        body: JSON.stringify({ id: couponId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Coupon deleted successfully!");
      }

      await getCoupons();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleEnableCoupon = async (couponId) => {
    try {
      const response = await fetch(`/api/coupons/${couponId}/enable`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'enabled' }),
      });

      if (response.ok) {
        toast.success("Coupon enabled successfully!");
      };

      await getCoupons();

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleDisableCoupon = async (couponId) => {
    try {
      const response = await fetch(`/api/coupons/${couponId}/disable`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'disabled' }),
      });

      if (response.ok) {
        toast.success("Coupon disabled successfully!");
      };

      await getCoupons();

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Coupons</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Create and manage all coupons here.
          </p>
        </div>

        <div>
          <NewCouponModal onCouponCreated={handleCouponCreated} />
        </div>
      </div>

      <div>
        {fetchCoupons ? (
          <div className="flex items-center justify-center py-20">
            <LoaderIcon size={40} className="animate-spin text-default" />
          </div>
        ) : (
          <div>
            {coupons?.length > 0 ? (
              <div className="overflow-x-auto">
                <Table className="mt-8 min-w-full">
                  <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                    <TableRow>
                      <TableHead className="whitespace-nowrap font-normal">
                        Coupon Name
                      </TableHead>
                      <TableHead className="text-center whitespace-nowrap font-normal px-14">
                        Coupon Type
                      </TableHead>
                      <TableHead className="text-center whitespace-nowrap font-normal px-14">
                        Percentage Value
                      </TableHead>
                      <TableHead className="text-center whitespace-nowrap font-normal px-14">
                        Amount Value
                      </TableHead>
                      <TableHead className="text-right whitespace-nowrap font-normal">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {coupons?.length > 0 &&
                      coupons.map((coupon) => (
                        <TableRow key={coupon.name}>
                          <TableCell className="flex flex-col items-start gap-1.5 font-medium max-w-[300px] truncate">
                            <p>{coupon.name}</p>
                            <p className={`${coupon.status === "enabled" ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-lg px-3 py-1`} >{coupon.status}</p>
                          </TableCell>
                          <TableCell className="text-center px-14 capitalize">
                            {coupon.type}
                          </TableCell>
                          <TableCell className="text-center px-14">
                            {coupon.percentage ? (
                              <p>{coupon.percentage}%</p>
                            ) : (
                              <p className="text-red-600 text-[16px]">
                                <IoClose className="mx-auto" />
                              </p>
                            )}
                          </TableCell>
                          <TableCell className="text-center px-14">
                            {coupon.amount ? (
                              <p>&#8358; {formatPrice(coupon.amount)}</p>
                            ) : (
                              <p className="text-red-600 text-[16px]">
                                <IoClose className="mx-auto" />
                              </p>
                            )}
                          </TableCell>
                          <TableCell className="flex items-center justify-end">
                            <CouponActionDropdown
                              coupon={coupon}
                              onCouponEdited={handleCouponCreated}
                              onDelete={handleDeleteCoupon}
                              onEnable={handleEnableCoupon}
                              onDisable={handleDisableCoupon}
                            />
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
                  No coupon available!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
