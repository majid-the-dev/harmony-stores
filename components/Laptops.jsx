"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { LoaderIcon } from "lucide-react";

const Laptops = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/laptops", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full px-4 md:px-6">
      <div className="flex items-center gap-5">
        <h1 className="text-[14px] md:text-xl text-left font-bold uppercase">
          Laptops
        </h1>
        <hr className="border-[0.5px] border-gray-200 w-full" />
      </div>
      <div className="mt-6 md:mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <LoaderIcon size={35} className="animate-spin text-default" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.title}
                link={`/product/${product._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Laptops;
