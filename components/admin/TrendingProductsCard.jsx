"use client";

import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast"; // Ensure you import toast for error messages
import { LoaderIcon } from "lucide-react";
import { CgTrashEmpty } from "react-icons/cg";

const TrendingProductsCard = () => {
  
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

      // Reverse the productDetails array and slice the latest 5
      const latestProducts = productDetails.reverse().slice(0, 5);

      setProducts(latestProducts);
    } catch (error) {
      console.error("Error fetching trending products!", error);
      toast.error("Error fetching trending products!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 border border-gray-200/55 rounded-lg">
      <div className="flex items-center justify-between bg-gray-100 rounded-t-lg px-4 py-4">
        <p className="text-xs font-medium">Trending Products</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <BsThreeDots className="text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-gray-500 text-xs">
              <Link href={"/admin/trending-products"} className="w-full">
                See All
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-36">
          <LoaderIcon size={22} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          <div className="py-5">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product._id}
                  className={`flex items-start gap-4 p-4 ${
                    index < products.length - 1 ? "border-b" : ""
                  }`}
                >
                  <Image
                    src={product.images[0]}
                    className="rounded-lg"
                    height={30}
                    width={30}
                    alt="product image"
                  />
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-xs font-normal line-clamp-1">
                      {product.title}
                    </p>
                    <p className="bg-gray-100 text-gray-500 text-[11px] rounded-lg px-3 py-1">
                      {product.category.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full py-24 flex flex-col items-center justify-center">
                <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                  <CgTrashEmpty />
                </p>
                <p className="text-xs text-gray-500 font-normal mt-4">
                  No trending product!
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingProductsCard;
