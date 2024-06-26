"use client";

import LoadingScreen from "@/components/LoadingScreen";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSliders } from "react-icons/bs";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [filterSidebar, setFilterSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [products, sortOption, selectedCondition, hasDiscount]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching products");
      }

      const data = await response.json();
      setProducts(data);
      filterProducts(data, searchTerm);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (products, searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const applyFilters = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCondition.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCondition.includes(product.condition)
      );
    }

    if (hasDiscount) {
      filtered = filtered.filter((product) => product.discount > 0);
    }

    if (sortOption !== "default") {
      filtered.sort((a, b) => {
        if (sortOption === "priceLowHigh") {
          return a.price - b.price;
        } else if (sortOption === "priceHighLow") {
          return b.price - a.price;
        } else if (sortOption === "dateOldNew") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortOption === "dateNewOld") {
          return new Date(b.date) - new Date(a.date);
        }
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleConditionChange = (condition) => {
    const newSelectedCondition = selectedCondition.includes(condition)
      ? selectedCondition.filter((c) => c !== condition)
      : [...selectedCondition, condition];
    setSelectedCondition(newSelectedCondition);
  };

  const handleDiscountChange = (e) => {
    setHasDiscount(e.target.checked);
  };

  const openSidebar = () => {
    setAnimationClass("animate__animated animate__fadeInRight");
    setFilterSidebar(true);
  };

  const closeSidebar = () => {
    setAnimationClass("animate__animated animate__fadeOutRight");
    setTimeout(() => {
      setFilterSidebar(false);
    }, 500); // Adjust the timeout to match the animation duration
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="bg-white flex items-center gap-3 text-[11px] md:text-xs border-b border-gray-200 shadow px-4 md:px-6 py-4">
            <Link href={"/"} className="font-medium">
              Home
            </Link>
            <FaAnglesRight className="font-medium" />
            <p className="text-gray-500 font-light">Search results</p>
          </div>

          <div className="w-full grid grid-cols-4 gap-16 md:gap-10 pt-10 pb-14 px-4 md:px-6">
            <div className="col-span-4 lg:col-span-1 order-1 lg:-order-1 hidden lg:block">
              <div>
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3">
                  SORT BY
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="default"
                      className="accent-black"
                      checked={sortOption === "default"}
                      onChange={handleSortChange}
                    />
                    <span className="text-xs font-normal">Default</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="priceLowHigh"
                      className="accent-black"
                      checked={sortOption === "priceLowHigh"}
                      onChange={handleSortChange}
                    />
                    <span className="text-xs font-normal">
                      Price, low to high
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="priceHighLow"
                      className="accent-black"
                      checked={sortOption === "priceHighLow"}
                      onChange={handleSortChange}
                    />
                    <span className="text-xs font-normal">
                      Price, high to low
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="dateOldNew"
                      className="accent-black"
                      checked={sortOption === "dateOldNew"}
                      onChange={handleSortChange}
                    />
                    <span className="text-xs font-normal">
                      Date, old to new
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value="dateNewOld"
                      className="accent-black"
                      checked={sortOption === "dateNewOld"}
                      onChange={handleSortChange}
                    />
                    <span className="text-xs font-normal">
                      Date, new to old
                    </span>
                  </label>
                </div>
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
                  CONDITION
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCondition.includes("Brand New")}
                      onChange={() => handleConditionChange("Brand New")}
                    />
                    <span className="text-xs font-normal">Brand new</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCondition.includes("Pre Owned")}
                      onChange={() => handleConditionChange("Pre Owned")}
                    />
                    <span className="text-xs font-normal">Pre owned</span>
                  </label>
                </div>
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
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

            <div className="w-full col-span-4 lg:col-span-3 relative pb-36 min-h-screen">
              <div className="block lg:hidden">
                <button
                  onClick={openSidebar}
                  className="flex items-center gap-2 bg-gray-100 border border-gray-200 text-xs font-medium px-3 py-2 mb-6"
                >
                  <BsSliders className="text-[16px]" />
                  Filters
                </button>

                {filterSidebar && (
                  <div
                    onClick={closeSidebar}
                    className={`bg-black/90 fixed inset-0 z-50 ${animationClass}`}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative bg-white w-2/3 h-full p-4 overflow-y-scroll float-right"
                    >
                      <button onClick={closeSidebar} className="text-lg">
                        <IoClose />
                      </button>
                      <div>
                        <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3">
                          SORT BY
                        </div>
                        <div className="flex flex-col gap-6 mt-5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sort"
                              value="default"
                              className="accent-black"
                              checked={sortOption === "default"}
                              onChange={handleSortChange}
                            />
                            <span className="text-xs font-normal">Default</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sort"
                              value="priceLowHigh"
                              className="accent-black"
                              checked={sortOption === "priceLowHigh"}
                              onChange={handleSortChange}
                            />
                            <span className="text-xs font-normal">
                              Price, low to high
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sort"
                              value="priceHighLow"
                              className="accent-black"
                              checked={sortOption === "priceHighLow"}
                              onChange={handleSortChange}
                            />
                            <span className="text-xs font-normal">
                              Price, high to low
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sort"
                              value="dateOldNew"
                              className="accent-black"
                              checked={sortOption === "dateOldNew"}
                              onChange={handleSortChange}
                            />
                            <span className="text-xs font-normal">
                              Date, old to new
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sort"
                              value="dateNewOld"
                              className="accent-black"
                              checked={sortOption === "dateNewOld"}
                              onChange={handleSortChange}
                            />
                            <span className="text-xs font-normal">
                              Date, new to old
                            </span>
                          </label>
                        </div>
                        <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
                          CONDITION
                        </div>
                        <div className="flex flex-col gap-6 mt-5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="accent-black"
                              checked={selectedCondition.includes("Brand New")}
                              onChange={() =>
                                handleConditionChange("Brand New")
                              }
                            />
                            <span className="text-xs font-normal">
                              Brand new
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="accent-black"
                              checked={selectedCondition.includes("Pre Owned")}
                              onChange={() =>
                                handleConditionChange("Pre Owned")
                              }
                            />
                            <span className="text-xs font-normal">
                              Pre owned
                            </span>
                          </label>
                        </div>
                        <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
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
                            <span className="text-xs font-normal">
                              Discounts
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {filteredProducts.length > 0 ? (
                <div className="w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      link={`/product/${product._id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <Image
                    src={"/assets/trash-can.png"}
                    alt="icon"
                    height={30}
                    width={30}
                  />
                  <p className="text-sm font-semibold">No products found</p>
                </div>
              )}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center mt-24">
                <button className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 mr-5 disabled:bg-black/60 disabled:cursor-not-allowed">
                  <FaAnglesLeft />
                  Previous
                </button>
                <button className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 disabled:bg-black/60 disabled:cursor-not-allowed">
                  Next
                  <FaAnglesRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
