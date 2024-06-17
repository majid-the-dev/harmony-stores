"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsDash, BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import { CgTrashEmpty } from "react-icons/cg";
import { LoaderIcon } from "lucide-react";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
    getTrendingProducts();
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
        toast.error("Error fetching products!");
        return;
      }

      const data = await response.json();
      console.log("All products:", data);
      setProducts(data);
    } catch (error) {
      toast.error("Error fetching products!");
    } finally {
      setLoading(false);
    }
  };

  const getTrendingProducts = async () => {
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

      const data = await response.json();
      console.log("Trending products (IDs):", data);
      setTrendingProducts(data); // Assuming data is an array of product IDs
    } catch (error) {
      // Remove the error toast if no trending products are found
      console.error("Error fetching trending products!", error);
    }
  };

  const toggleTrendingStatus = async (id, isTrending) => {
    try {
      const method = isTrending ? "DELETE" : "POST";
      const response = await fetch(`/api/trending-products/${id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(
          `Error ${isTrending ? "unmarking" : "marking"} product as trending!`
        );
        return;
      }

      toast.success(
        `Product ${isTrending ? "removed from" : "marked as"} trending!`
      );
      await getTrendingProducts(); // Update trending products after toggling
    } catch (error) {
      toast.error(
        `Error ${isTrending ? "unmarking" : "marking"} product as trending!`
      );
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div>
        <h1 className="text-xl font-semibold">New Trending Product</h1>
        <p className="text-xs font-normal text-gray-500 mt-1">
          Create new trending product here.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={30} className="animate-spin text-black" />
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-end mt-8">
            <form className="w-full flex items-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search product here..."
                  className="w-full bg-gray-100 text-xs border border-gray-200 rounded-lg outline-none pl-9 pr-5 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="mt-6 min-w-full">
                <TableHeader className="bg-gray-100 hover:bg-gray-100 text-xs">
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead className="text-start whitespace-nowrap font-normal pr-14 md:pr-7">
                      Product Title
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Product Price
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Discount Price
                    </TableHead>
                    <TableHead className="whitespace-nowrap font-normal pr-10 md:pr-4">
                      Availability
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={trendingProducts.includes(product._id)}
                          onChange={() =>
                            toggleTrendingStatus(
                              product._id,
                              trendingProducts.includes(product._id)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="flex items-start gap-1 font-medium truncate pr-20 md:pr-7">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 mr-2 rounded-full"
                          />
                        )}
                        <div className="flex flex-col items-start gap-2">
                          <p className="font-medium line-clamp-1">
                            {product.title}
                          </p>
                          <p className="bg-gray-200/60 text-gray-500 font-normal rounded-lg px-2 py-1">
                            {product.category.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4">
                        &#8358; {formatPrice(product.price)}
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4">
                        {product.discount ? (
                          <span>&#8358; {formatPrice(product.discount)}</span>
                        ) : (
                          <BsDash className="text-red-600 text-2xl" />
                        )}
                      </TableCell>
                      <TableCell className="pr-10 md:pr-4 whitespace-nowrap">
                        {product.availability}
                      </TableCell>
                      <TableCell className="float-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical className="text-gray-500 text-[16px]" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="text-gray-500 text-xs"
                              onClick={() =>
                                toggleTrendingStatus(
                                  product._id,
                                  trendingProducts.includes(product._id)
                                )
                              }
                            >
                              {trendingProducts.includes(product._id)
                                ? "Unmark as Trending"
                                : "Mark as Trending"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-500 text-xs">
                              View
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center">
              <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                <CgTrashEmpty />
              </p>
              <p className="text-xs text-gray-500 font-normal mt-4">
                No products available!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
