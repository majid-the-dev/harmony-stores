import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useGetSmartPhones } from "@/services/smartphones";

const BestSellers = () => {
  const { data: products, isFetching: loading } = useGetSmartPhones();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-900 uppercase">
          Best sellers
        </h1>
        <p className="text-center text-gray-600 text-base max-w-[48%] mx-auto mt-3 leading-loose">
          From smartphones to accessories, these bestsellers are flying off the
          shelves! Grab yours before they&apos;re gone.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 mt-16">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 mt-16">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product?.title}
                link={`/product/${product?._id}`}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
