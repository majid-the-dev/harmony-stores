"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";

const MobileSidebar = () => {
  const { data: session, status, update } = useSession();

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
            <div className="flex items-center justify-between shadow-md px-3 py-3">
              <Image
                src={"/assets/dark--logo.png"}
                alt="logo"
                height={120}
                width={120}
              />
              <button
                onClick={closeSidebar}
                className="bg-white/30 text-[15px] rounded-full border border-white/30 p-1.5"
              >
                <IoClose />
              </button>
            </div>
            <div className="flex text-black text-[13px] font-semibold pt-5 pb-12">
              <div className="w-full flex flex-col">
                <Link href={"/"} className="animation w-full p-4 hover:bg-white/15">Home</Link>
                <Link href={"/"} className="animation w-full p-4 hover:bg-white/15">About Us</Link>
                <Link href={"/"} className="animation w-full p-4 hover:bg-white/15">Contact</Link>
                <Link href={"/"} className="animation w-full p-4 hover:bg-white/15">Stores</Link>
                <Link href={"/"} className="animation w-full p-4 hover:bg-white/15">Categories</Link>
              </div>
            </div>
            <div className="absolute bottom-4 w-full px-4">
              <div className="flex items-center gap-4">
                {status === "authenticated" ? (
                  <button className="animation w-full flex items-center justify-center gap-3 text-center bg-white/10 text-white text-xs font-semibold py-3 rounded border border-white/30 hover:opacity-80">
                    <FiLogIn className="text-sm rotate-180" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href={"/auth/sign-in"}
                    className="animation w-full flex items-center justify-center gap-3 text-center bg-white/10 text-white text-xs font-semibold py-3 rounded border border-white/30 hover:opacity-80"
                  >
                    <FiLogIn className="text-sm" />
                    Sign In
                  </Link>
                )}
                <Link href={'/cart'} className="animation w-full flex items-center justify-center gap-3 bg-white/10 text-white text-xs font-semibold py-3 rounded border border-white/30 hover:opacity-80">
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
