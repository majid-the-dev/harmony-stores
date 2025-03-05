import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white">
      {/* Product Image Skeleton */}
      <div className="relative aspect-square">
        <Skeleton className="w-full h-full bg-gray-200/90" />

        {/* Action Buttons Skeleton */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded-full bg-white" />
          ))}
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="bg-white text-center p-4">
        <div className="space-y-3 my-4">
          <Skeleton className="h-4 w-3/4 mx-auto bg-gray-200/90" />
          <Skeleton className="h-3 w-1/4 mx-auto bg-gray-200/90" />
        </div>

        {/* Price and Add to Cart Skeleton */}
        <div className="grid grid-cols-2 gap-2 border-t pt-4">
          <div className="flex items-center justify-center">
            <Skeleton className="h-4 w-20 bg-gray-200/90" />
          </div>
          <Skeleton className="h-8 w-24 mx-auto bg-gray-200/90" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
