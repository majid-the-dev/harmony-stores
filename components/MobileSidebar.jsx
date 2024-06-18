"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const MobileSidebar = () => {
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
          className={`gradient-bg fixed inset-0 z-50 px-6 py-6 backdrop-blur-3xl overflow-y-scroll ${animationClass}`}
        >
          <div className="flex items-center justify-between">
            <Image
              src={"/assets/dark--logo.png"}
              alt="logo"
              height={140}
              width={140}
            />
            <button onClick={closeSidebar} className="bg-white/30 text-xl rounded p-1">
              <IoClose />
            </button>
          </div>
          {/* <form>
            <input
              type="text"
              placeholder="Search Harmony Stores Here..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 placeholder:text-xs"
            />
          </form> */}
          {/* <div className="flex flex-col gap-4 px-3">
            <Link href={"/"} className="text-sm font-semibold py-3">
              Home
            </Link>
            <Link href={"/"} className="text-sm font-semibold py-3">
              About
            </Link>
            <Link href={"/"} className="text-sm font-semibold py-3">
              Contact
            </Link>
            <Link href={"/"} className="text-sm font-semibold py-3">
              Stores
            </Link>
            <Link href={"/"} className="text-sm font-semibold py-3">
              Home
            </Link>
          </div> */}
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
