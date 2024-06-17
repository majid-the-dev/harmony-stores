"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import MobileNav from "./MobileNav";
import AccountDropdown from "./AccountDropdown";
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
import CategoryDropdown from "./CategoryDropdown";
import CategoryItem from "./CategoryItem";
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiHeart3Line } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { CartContext, SearchContext } from "./AppContext";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const path = usePathname();

  const { data: session, status, update } = useSession();

  const [categories, setCategories] = useState([]);

  const { toggleSearchBox } = useContext(SearchContext);

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
      <div className="mx-auto flex items-center justify-between px-4 md:px-6 py-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MobileNav />

            <Link href={"/"}>
              <Image
                src={"/assets/dark--logo.png"}
                height={180}
                width={180}
                alt="logo"
                className="scale-75 md:scale-100 -ml-3 md:-ml-0"
              />
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <Menubar className="bg-transparent border-none gap-12">
            <MenubarMenu className="relative">
              <Link
                href={"/"}
                className={`${
                  path === "/"
                    ? "text-black font-semibold"
                    : "text-black font-medium"
                } relative animation text-[13px] whitespace-nowrap hover:text-black hover:font-semibold`}
              >
                Home
                {path === "/" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )}
              </Link>
            </MenubarMenu>
            <MenubarMenu className="relative">
              <Link
                href={"/about-us"}
                className={`${
                  path === "/about-us"
                    ? "text-black font-semibold"
                    : "text-black font-medium"
                } animation relative text-[13px] whitespace-nowrap hover:text-black hover:font-semibold`}
              >
                About Us
                {path === "/about-us" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link
                href={"/contact"}
                className={`${
                  path === "/contact"
                    ? "text-black font-semibold"
                    : "text-black font-medium"
                } animation relative text-[13px] whitespace-nowrap hover:text-black hover:font-semibold`}
              >
                Contact
                {path === "/contact" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link
                href={"/stores"}
                className={`${
                  path === "/stores"
                    ? "text-black font-semibold"
                    : "text-black font-medium"
                } animation relative text-[13px] whitespace-nowrap hover:text-black hover:font-semibold`}
              >
                Stores
                {path === "/stores" && (
                  <div className="absolute h-1 w-5 gradient-bg rounded-full top-[22px]"></div>
                )}
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-1 bg-transparent text-black text-[13px] font-medium cursor-pointer ml-0 pl-0 hover:text-black hover:font-semibold">
                Categories
                <MdArrowDropDown className="text-xl" />
              </MenubarTrigger>
              <MenubarContent className="mt-[31px] p-4">
                {categories?.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="">
          <div className="flex items-center gap-6">
            {/* <form className="relative xl:flex hidden">
              <input
                type="text"
                placeholder="Search for products, brands here..."
                className="bg-white w-[22rem] rounded-l-full outline-none px-10 py-3 placeholder:text-xs"
              />
              <button className="bg-black text-default text-sm font-medium rounded-r-full px-8">
                Search
              </button>
              <BiSearch className="text-gray-400 absolute top-1/2 left-5 transform -translate-y-1/2 mt-[2px]" />
            </form> */}

            <div className="flex items-center gap-5 md:gap-6">
              {/* <Link href={"/"} className="relative">
                <RiHeart3Line className="text-xl md:text-2xl" />
                <span className="absolute -top-5 -right-3 gradient-bg text-white text-[10px] rounded-full px-1.5 py-0.5">
                  0
                </span>
              </Link> */}
              {/* <SearchModal /> */}
              <button onClick={toggleSearchBox}>
                <FiSearch className="text-[18px] md:text-[22px]" />
              </button>
              <Link href={"/cart"} className="relative">
                <HiOutlineShoppingBag className="text-[18px] md:text-2xl" />
                <span className="absolute -top-5 -right-3 gradient-bg text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartProducts?.length}
                </span>
              </Link>
              {status === "authenticated" ? (
                <AccountDropdownLg />
              ) : (
                <Link
                  href={"/auth/sign-in"}
                  className="gradient-bg text-white rounded-full text-[13px] md:text-lg p-1.5"
                >
                  <GoPerson />
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
