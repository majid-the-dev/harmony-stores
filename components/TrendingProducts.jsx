"use client";

import Link from "next/link";
import NewArrivalProductCard from "./NewArrivalProductCard";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import FeaturedProductCard from "./FeaturedProductCard";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

const TrendingProducts = () => {
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
      const latestProducts = productDetails.reverse().slice(0, 6);

      setProducts(latestProducts);
    } catch (error) {
      console.error("Error fetching trending products!", error);
      toast.error("Error fetching trending products!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-6">
      <div className="bg-white border border-gray-200/80 rounded-lg px-6 md:px-10 pt-10 pb-14">
        <h1 className="text-xl md:text-2xl text-center md:text-left font-semibold">Trending Products</h1>
        {loading ? (
          <div className="flex items-center justify-center py-48">
            <LoaderIcon size={35} className="animate-spin text-default" />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
              {products.map((product) => (
                <FeaturedProductCard
                  key={product.title}
                  product={product}
                  usage="trending"
                  link={`/trending-products/${product._id}`}
                />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mt-14">
              <div className="mx-auto">
                <Link
                  href={"/trending-products"}
                  className="animation bg-black flex items-center gap-2 text-white text-xs font-semibold rounded-lg px-7 py-3 hover:scale-110"
                >
                  SHOW MORE
                  <RiArrowRightDoubleLine className="text-xl animate__animated animate__slideOutRight animate__slow animate__infinite" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
