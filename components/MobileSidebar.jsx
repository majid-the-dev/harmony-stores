"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaAngleRight, FaAnglesRight, FaAnglesDown } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {

  const { data: session, status, update } = useSession();

  const path = usePathname();

  const [sidebar, setSidebar] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const openSidebar = () => {
    setAnimationClass("animate__animated animate__fadeInLeft");
    setSidebar(true);
  };

  const closeSidebar = () => {
    setAnimationClass("animate__animated animate__fadeOutLeft");
    setTimeout(() => {
      setSidebar(false);
    }, 500); // Adjust the timeout to match the animation duration
  };

  return (
    <>
      <button
        onClick={openSidebar}
        className="block md:hidden gradient-bg text-white text-md rounded p-1 outline-none"
      >
        <FiMenu />
      </button>

      {sidebar && (
        <div
          className={`gradient-bg fixed inset-0 z-50 backdrop-blur-3xl overflow-y-scroll ${animationClass}`}
        >
          <div className="h-full w-full relative">
            <div className="w-full h-2 bg-black"></div>
            <div className="flex items-center justify-between shadow-md px-3 py-3">
              <Image
                src={"/assets/dark--logo.png"}
                alt="logo"
                height={120}
                width={120}
              />
              <button
                onClick={closeSidebar}
                className=" text-xl"
              >
                <IoClose />
              </button>
            </div>
            <div className="flex text-black text-[13px] font-semibold pt-5 pb-12">
              <div className="w-full flex flex-col gap-3">
                <Link href={"/"} onClick={closeSidebar} className={`${path === "/" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
                    Home
                    <FaAnglesRight className="text-[11px]" />
                </Link>
                <Link href={"/about-us"} onClick={closeSidebar} className={`${path === "/about-us" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
                    About Us
                    <FaAnglesRight className="text-[11px]" />
                </Link>
                <Link href={"/contact"} onClick={closeSidebar} className={`${path === "/contact" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
                    Contact
                    <FaAnglesRight className="text-[11px]" />
                </Link>
                <Link href={"/stores"} onClick={closeSidebar} className={`${path === "/stores" && 'bg-white/25'} animation w-full flex items-center justify-between p-4 hover:bg-white/25`}>
                    Stores
                    <FaAnglesRight className="text-[11px]" />
                </Link>
                <button className="animation w-full flex items-center justify-between p-4 hover:bg-white/25">
                    Categories
                    <FaAnglesDown className="text-[11px]" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 w-full px-4">
              <div className="flex items-center gap-4">
                {status === "authenticated" ? (
                  <button className="animation w-full flex items-center justify-center gap-3 text-center bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80">
                    <FiLogIn className="text-sm rotate-180" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    onClick={closeSidebar}
                    href={"/auth/sign-in"}
                    className="animation w-full flex items-center justify-center gap-3 text-center bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80"
                  >
                    <FiLogIn className="text-sm" />
                    Sign In
                  </Link>
                )}
                <Link onClick={closeSidebar} href={'/cart'} className="animation w-full flex items-center justify-center gap-3 bg-white/15 text-white text-xs font-semibold py-3 border border-white/30 hover:opacity-80">
                    <HiOutlineShoppingBag className="text-sm" />
                    Cart (0)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
