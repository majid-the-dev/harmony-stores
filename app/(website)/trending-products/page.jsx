"use client";

import ProductCard from "@/components/ProductCard";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortOption, setSortOption] = useState("unsorted");

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

      // Set unique brands immediately after fetching product details
      const uniqueBrands = [
        ...new Set(productDetails.map((product) => product.brand)),
      ];
      setBrands(uniqueBrands);

    } catch (error) {
      console.error("Error fetching trending products!", error);
      toast.error("Error fetching trending products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentSelectedBrands = searchParams.getAll("brand") || [];
    const currentHasDiscount = searchParams.get("discount") === "true";
    const currentSortOption = searchParams.get("sort") || "unsorted";

    setSelectedBrands(currentSelectedBrands);
    setHasDiscount(currentHasDiscount);
    setSortOption(currentSortOption);
  }, [searchParams]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.selectedBrands.length) {
      newFilters.selectedBrands.forEach((brand) => {
        params.append("brand", brand);
      });
    }

    if (newFilters.hasDiscount) {
      params.set("discount", "true");
    }

    if (newFilters.sortOption && newFilters.sortOption !== "unsorted") {
      params.set("sort", newFilters.sortOption);
    }

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    updateFilters({
      selectedBrands: newSelectedBrands,
      hasDiscount,
      sortOption,
    });
  };

  const handleDiscountChange = () => {
    updateFilters({ selectedBrands, hasDiscount: !hasDiscount, sortOption });
  };

  const handleSortChange = (option) => {
    updateFilters({ selectedBrands, hasDiscount, sortOption: option });
  };

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesBrand = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;
      const matchesDiscount = hasDiscount ? product.discount > 0 : true;
      return matchesBrand && matchesDiscount;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <LoaderIcon size={40} className="animate-spin text-default" />
        </div>
      ) : (
        <div className="px-6">
          <div className="flex items-center gap-3 text-xs py-10">
            <Link href={"/"} className="text-black font-medium">
              Home
            </Link>
            <LiaAngleRightSolid className="text-black" />
            <p className="text-gray-500 font-light">Trending Products</p>
          </div>

          <h1 className="text-2xl font-semibold capitalize">
            Trending Products
          </h1>

          <div className="grid grid-cols-4 gap-16 md:gap-10 pt-10 pb-14">
            <div className="col-span-4 lg:col-span-1 order-1 lg:-order-1">
              <div>
                <div className="text-sm font-medium border-b border-gray-300 px-3 py-3">
                  SORT BY
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortOption === "unsorted"}
                      onChange={() => handleSortChange("unsorted")}
                    />
                    <span className="text-xs font-normal">Default</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortOption === "price-asc"}
                      onChange={() => handleSortChange("price-asc")}
                    />
                    <span className="text-xs font-normal">
                      Price, low to high
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortOption === "price-desc"}
                      onChange={() => handleSortChange("price-desc")}
                    />
                    <span className="text-xs font-normal">
                      Price, high to low
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortOption === "date-asc"}
                      onChange={() => handleSortChange("date-asc")}
                    />
                    <span className="text-xs font-normal">
                      Date, old to new
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      className="accent-black"
                      checked={sortOption === "date-desc"}
                      onChange={() => handleSortChange("date-desc")}
                    />
                    <span className="text-xs font-normal">
                      Date, new to old
                    </span>
                  </label>
                </div>
                <div className="text-sm font-medium border-b border-gray-300 px-3 py-3 mt-10">
                  BRANDS
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-black"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <span className="text-xs font-normal">{brand}</span>
                    </label>
                  ))}
                </div>
                <div className="text-sm font-medium border-b border-gray-300 px-3 py-3 mt-10">
                  DISCOUNTS
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={hasDiscount}
                      onChange={handleDiscountChange}
                    />
                    <span className="text-xs font-normal">Discounts</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-4 lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    link={`/trending-products/${product._id}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
