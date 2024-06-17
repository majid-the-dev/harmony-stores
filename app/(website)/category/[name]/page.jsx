"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSliders } from "react-icons/bs";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { name } = useParams();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortOption, setSortOption] = useState("unsorted");
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const id = category?._id;

  useEffect(() => {
    const fetchCategoryTree = async () => {
      try {
        const response = await fetch(`/api/parent-categories`);
        const categoryTree = await response.json();
        setCategoryTree(categoryTree);
      } catch (error) {
        console.error("Failed to fetch category tree:", error);
      }
    };

    fetchCategoryTree();
  }, []);

  useEffect(() => {
    const findBreadcrumbPath = (categories, targetId) => {
      const findPath = (nodes, path = []) => {
        for (const node of nodes) {
          const newPath = [...path, node];
          if (node._id === targetId) {
            return newPath;
          }
          if (node.children && node.children.length) {
            const result = findPath(node.children, newPath);
            if (result) {
              return result;
            }
          }
        }
        return null;
      };
      return findPath(categories);
    };

    if (categoryTree.length > 0 && id) {
      const breadcrumbPath = findBreadcrumbPath(categoryTree, id);
      setBreadcrumb(breadcrumbPath || []);
    }
  }, [categoryTree, id]);

  useEffect(() => {
    if (name) {
      const fetchCategoryAndProducts = async () => {
        setLoading(true);

        try {
          const categoryResponse = await fetch(`/api/cat/${name}`);
          const categoryData = await categoryResponse.json();
          setCategory(categoryData);

          const productsResponse = await fetch(
            `/api/pro/${name}?page=${currentPage}&limit=12`
          );
          const { products, totalPages } = await productsResponse.json();

          if (Array.isArray(products)) {
            setProducts(products); // Ensure products is an array
          } else {
            console.error("Products is not an array", products);
            setProducts([]);
          }

          setTotalPages(totalPages);

          const uniqueBrands = [
            ...new Set(products.map((product) => product.brand)),
          ];
          setBrands(uniqueBrands);
        } catch (error) {
          console.error("Failed to fetch category or products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryAndProducts();
    }
  }, [name, currentPage]);

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

    if (newFilters?.selectedCondition?.length) {
      newFilters.selectedCondition.forEach((condition) => {
        params.append("condition", condition);
      });
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
      const matchesCondition = selectedCondition.length
        ? selectedCondition.includes(product.condition)
        : true;
      return matchesBrand && matchesDiscount && matchesCondition;
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
        <LoadingScreen />
      ) : (
        <div className="">
          <div className="bg-white flex items-center gap-3 text-xs border-b border-gray-200 px-4 md:px-6 py-5">
            <Link href={"/"} className="text-black font-medium">
              Home
            </Link>
            {breadcrumb.map((category, index) => (
              <div key={category._id} className="flex items-center gap-3">
                <FaAnglesRight className="text-black text-[10px]" />
                <Link
                  href={`/category/${category._id}`}
                  className={`${
                    index === breadcrumb.length - 1
                      ? "text-gray-500 font-light"
                      : "text-black font-medium"
                  }`}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

          {/* <h1 className="text-2xl font-semibold capitalize px-4 md:px-6 mt-6">
            {category?.name}
          </h1> */}
          <div className="grid grid-cols-4 gap-16 md:gap-10 pt-10 pb-14 px-4 md:px-6">
            <div className="col-span-4 lg:col-span-1 order-1 lg:-order-1 hidden lg:block">
              <div className="">
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3">
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
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
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
                <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
                  CONDITION
                </div>
                <div className="flex flex-col gap-6 mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCondition.includes("Brand New")}
                      onChange={() => {
                        const newSelectedCondition = selectedCondition.includes(
                          "Brand New"
                        )
                          ? selectedCondition.filter((c) => c !== "Brand New")
                          : [...selectedCondition, "Brand New"];
                        setSelectedCondition(newSelectedCondition);
                        updateFilters({
                          selectedBrands,
                          hasDiscount,
                          sortOption,
                          selectedCondition: newSelectedCondition,
                        });
                      }}
                    />
                    <span className="text-xs font-normal">Brand new</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-black"
                      checked={selectedCondition.includes("Pre Owned")}
                      onChange={() => {
                        const newSelectedCondition = selectedCondition.includes(
                          "Pre Owned"
                        )
                          ? selectedCondition.filter((c) => c !== "Pre Owned")
                          : [...selectedCondition, "Pre Owned"];
                        setSelectedCondition(newSelectedCondition);
                        updateFilters({
                          selectedBrands,
                          hasDiscount,
                          sortOption,
                          selectedCondition: newSelectedCondition,
                        });
                      }}
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

            <div className="col-span-4 lg:col-span-3 relative pb-28">
              <div className="block lg:hidden">
                <Sheet className="block md:hidden">
                  <SheetTrigger>
                    <button className="flex items-center gap-3 bg-white border border-gray-100 text-xs font-medium px-5 py-3 mb-6">
                      <BsSliders className="text-[16px]" />
                      Filters
                    </button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-scroll">
                    <SheetHeader>
                      <SheetTitle className="text-left">
                        Filter Products
                      </SheetTitle>
                    </SheetHeader>
                    <div className="bg-white text-sm font-medium border-b border-gray-200 py-3 mt-6">
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
                    <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
                      CONDITION
                    </div>
                    <div className="flex flex-col gap-6 mt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={selectedCondition.includes("Brand New")}
                          onChange={() => {
                            const newSelectedCondition =
                              selectedCondition.includes("Brand New")
                                ? selectedCondition.filter(
                                    (c) => c !== "Brand New"
                                  )
                                : [...selectedCondition, "Brand New"];
                            setSelectedCondition(newSelectedCondition);
                            updateFilters({
                              selectedBrands,
                              hasDiscount,
                              sortOption,
                              selectedCondition: newSelectedCondition,
                            });
                          }}
                        />
                        <span className="text-xs font-normal">Brand new</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={selectedCondition.includes("Pre Owned")}
                          onChange={() => {
                            const newSelectedCondition =
                              selectedCondition.includes("Pre Owned")
                                ? selectedCondition.filter(
                                    (c) => c !== "Pre Owned"
                                  )
                                : [...selectedCondition, "Pre Owned"];
                            setSelectedCondition(newSelectedCondition);
                            updateFilters({
                              selectedBrands,
                              hasDiscount,
                              sortOption,
                              selectedCondition: newSelectedCondition,
                            });
                          }}
                        />
                        <span className="text-xs font-normal">Pre owned</span>
                      </label>
                    </div>
                    <div className="bg-white text-sm font-medium border-b border-gray-200 px-3 py-3 mt-10">
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
                  </SheetContent>
                </Sheet>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    link={`/category/${encodeURIComponent(
                      category.name.replace(/ /g, "-")
                    )}/${product._id}`}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center mt-24">
                <button
                  className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 mr-5 disabled:bg-black/60 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <FaAnglesLeft />
                  Previous
                </button>
                <button
                  className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 disabled:bg-black/60 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
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

export default Page;
