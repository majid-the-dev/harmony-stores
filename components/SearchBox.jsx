"use client";

import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { SearchContext } from "./AppContext";

const SearchBox = () => {
  const { toggleSearchBox, searchBox, searchBoxAnimation } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
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
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?searchTerm=${searchTerm}`);
    setSearchTerm("");
    setFilteredProducts([])
    toggleSearchBox();
  };

  return (
    <>
      {searchBox && (
        <div className={`${searchBoxAnimation} relative mx-4 md:mx-6 animate__animated z-20`}>
          <form
            className="h-full flex items-center mt-6"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="w-full text-xs font-semibold bg-gray-100 border-t border-b border-l border-gray-200 px-3 md:px-5 py-3 md:py-4 outline-none placeholder:text-[11px] md:placeholder:text-xs placeholder:text-gray-500 placeholder:font-medium"
              placeholder="Search for products here..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-black text-white px-5 py-3 md:py-4 outline-none"
            >
              <FiSearch />
            </button>
          </form>
          {filteredProducts.length > 0 && (
            <div className="absolute w-full flex flex-col bg-white border border-gray-200 pt-4 z-50">
              <p className="text-orange-600 text-xs font-semibold px-4 mb-4">
                Showing results for &quot;{searchTerm}&quot;
              </p>
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="animation flex items-center gap-4 hover:bg-orange-50 px-4 py-2"
                >
                  <span>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-7 h-7 rounded-full"
                    />
                  </span>
                  <span className="text-xs line-clamp-1">{product.title}</span>
                </Link>
              ))}
              <button
                onClick={handleSearchSubmit}
                className="bg-orange-50 text-xs text-center font-semibold mt-4 py-3"
              >
                See all results
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBox;
