import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useGetSmartPhones } from "@/services/smartphones";

const Smartphones = () => {
  const { data: products, isFetching: loading } = useGetSmartPhones();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-0 pt-14">
        <h1 className="text-2xl md:text-3xl text-center font-extrabold text-gray-900 uppercase">
          Smartphones
        </h1>
        <p className="text-center text-gray-900 text-sm md:text-[16px] font-medium max-w-[95%] md:max-w-[50%] mx-auto mt-4">
          Whether you need lightning-fast processors, pro-grade cameras, or
          all-day battery life, we&apos;ve got the perfect smartphone for you
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 mt-20">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 mt-20">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product?.title}
                link={`/product/${product?._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Smartphones;
