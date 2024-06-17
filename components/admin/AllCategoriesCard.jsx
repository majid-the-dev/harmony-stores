"use client";

import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AllCategoriesCard = () => {
  const [loading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching categories!");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error fetching categories!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50/50 border border-gray-200/55 rounded-lg">
      <div className="flex items-center justify-between bg-gray-100 rounded-t-lg px-4 py-4">
        <p className="text-xs font-medium">All Categories</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <BsThreeDots className="text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-gray-500 text-xs">
              <Link href={"/admin/categories"} className="w-full">
                See All
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <LoaderIcon size={22} className="animate-spin text-black" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-4 px-3">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.name}
                href={"/admin/categories"}
                className="flex items-center justify-between text-xs hover:bg-gray-200/40 rounded-lg px-2 py-2"
              >
                {category.name}
                <span className="text-[18px] text-gray-500">
                  <IoMdArrowDropright />
                </span>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCategoriesCard;
