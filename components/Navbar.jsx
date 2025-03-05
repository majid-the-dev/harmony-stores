"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountDropdownLg from "./AccountDropdownLg";
import { signOut, useSession } from "next-auth/react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CategoryItem from "./CategoryItem";
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GoPerson } from "react-icons/go";
import { CartContext, SearchContext } from "./AppContext";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import MobileSidebar from "./MobileSidebar";
import SearchBox from "./SearchBox";
import TreasureHunt from "./TreasureHunt";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  const path = usePathname();
  const { data: session, status, update } = useSession();
  const [categories, setCategories] = useState([]);
  const { toggleSearchBox, searchBox } = useContext(SearchContext);
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/parent-categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-[10px] md:px-0 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* <MobileNav /> */}

            <MobileSidebar categories={categories} />

            <Link href={"/"}>
              <Image
                src={"/assets/dark--logo.png"}
                height={170}
                width={170}
                alt="logo"
                className="scale-75 md:scale-100 -ml-4 md:-ml-0"
              />
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <Menubar className="bg-transparent border-none gap-11">
            <MenubarMenu>{/* <TreasureHunt /> */}</MenubarMenu>
            <MenubarMenu className="relative">
              <Link
                href={"/"}
                className={`${
                  path === "/"
                    ? "text-gray-900 font-bold"
                    : "text-gray-900 font-medium"
                } relative animation text-sm whitespace-nowrap hover:text-gray-900 hover:font-bold`}
              >
                Home
                {/* {path === "/" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )} */}
              </Link>
            </MenubarMenu>
            <MenubarMenu className="relative">
              <Link
                href={"/about-us"}
                className={`${
                  path === "/about-us"
                    ? "text-gray-900 font-bold"
                    : "text-gray-900 font-medium"
                } animation relative text-sm whitespace-nowrap hover:text-gray-900 hover:font-bold`}
              >
                About
                {/* {path === "/about-us" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )} */}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link
                href={"/contact"}
                className={`${
                  path === "/contact"
                    ? "text-gray-900 font-bold"
                    : "text-gray-900 font-medium"
                } animation relative text-sm whitespace-nowrap hover:text-gray-900 hover:font-bold`}
              >
                Contact
                {/* {path === "/contact" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )} */}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link
                href={"/stores"}
                className={`${
                  path === "/stores"
                    ? "text-gray-900 font-bold"
                    : "text-gray-900 font-medium"
                } animation relative text-sm whitespace-nowrap hover:text-gray-900 hover:font-bold`}
              >
                Stores
                {/* {path === "/stores" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )} */}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-1 bg-transparent text-gray-900 text-sm font-medium cursor-pointer ml-0 pl-0 hover:text-gray-900 hover:font-bold">
                Categories
                <MdArrowDropDown className="text-xl" />
              </MenubarTrigger>
              <MenubarContent className="mt-[26px] p-4 border-none rounded-none">
                {categories?.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5">
              <button onClick={toggleSearchBox}>
                <CgSearch className="text-[18px] md:text-[18.5px]" />
              </button>
              <Link href={"/cart"} className="relative">
                <HiOutlineShoppingCart className="text-[18px] md:text-[18px]" />
                <span className="absolute -top-5 -right-3 bg-gray-200 text-gray-900 text-[11px] font-semibold rounded-full px-1.5 py-0.5">
                  {cartProducts?.length}
                </span>
              </Link>
              {status === "authenticated" ? (
                <AccountDropdownLg />
              ) : (
                <Link
                  href={"/auth/sign-in"}
                  className="text-[18.5px] md:text-[20px]"
                >
                  <HiOutlineUserCircle />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
