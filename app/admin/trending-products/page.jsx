"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { CgTrashEmpty } from "react-icons/cg";
import { BsDash, BsThreeDotsVertical } from "react-icons/bs";
import { formatPrice } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderIcon } from "lucide-react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTrendingProducts();
  }, []);

  const getTrendingProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trending-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching trending products!");
        return;
      }

      const trendingProductIds = await response.json();
      console.log("Trending products (IDs):", trendingProductIds);

      // Fetch product details for each trending product ID
      const productDetails = await Promise.all(
        trendingProductIds.map(async (id) => {
          const productResponse = await fetch(`/api/trending-products/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!productResponse.ok) {
            throw new Error("Error fetching product details");
          }

          return await productResponse.json();
        })
      );

      setProducts(productDetails);
    } catch (error) {
      console.error("Error fetching trending products!", error);
      toast.error("Error fetching trending products!");
    } finally {
      setLoading(false);
    }
  };

  const unmarkAsTrending = async (id) => {
    try {
      const response = await fetch(`/api/trending-products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error unmarking product as trending");
      }

      toast.success("Product unmarked as trending!");

      // Update the products state by removing the unmarked product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error unmarking product as trending!", error);
      toast.error("Error unmarking product as trending!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Trending Products</h1>
          <p className="text-xs font-normal text-gray-500 mt-1">
            Create and manage all trending products here.
          </p>
        </div>
        <div className="inline-flex">
          <Link
            href={"/admin/trending-products/new"}
            className="bg-black text-white text-xs flex items-center gap-2 rounded-lg px-4 py-3 hover:opacity-80"
          >
            <span>
              <AiOutlinePlusCircle className="text-[16px]" />
            </span>
            Add New
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead className="text-start whitespace-nowrap font-normal pr-14 md:pr-7">
                      Product Title
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Product Price
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Discount Price
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Availability
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="flex items-start gap-1 font-medium truncate pr-20 md:pr-7">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 mr-2 rounded-full"
                          />
                        )}
                        <div className="flex flex-col items-start gap-2">
                          <p className="font-medium line-clamp-1">
                            {product.title}
                          </p>
                          <p className="bg-gray-200/60 text-gray-500 font-normal rounded-lg px-2 py-1">
                            {product?.category?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4">
                        &#8358; {formatPrice(product.price)}
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4">
                        {product.discount ? (
                          <span>&#8358; {formatPrice(product.discount)}</span>
                        ) : (
                          <BsDash className="text-red-600 text-2xl" />
                        )}
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4 whitespace-nowrap">
                        {product.availability}
                      </TableCell>
                      <TableCell className="float-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="text-gray-500 text-[16px]" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="text-gray-500 text-xs"
                              onClick={() => unmarkAsTrending(product._id)}
                            >
                              Unmark as Trending
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                No trending product!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
