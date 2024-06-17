"use client"

import { BsFillStarFill } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaStore } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";
import { useState } from "react";
import Link from "next/link";

const page = () => {

    const [quantity, setQuantity] = useState(1);

    const reduceQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        };
    };


  return (
    <div className="px-6 py-28">
      <div className="grid grid-cols-2">
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Apple iPhone 15 pro 256GB</h1>
          <div className="flex items-center gap-5 mt-6">
            <div className="flex items-center gap-2">
              <BsFillStarFill className="text-default text-sm" />
              <p className="text-xs text-gray-500 font-normal">
                5.0 (800 reviews)
              </p>
            </div>
            <p className="text-xs">
              <span className="text-gray-500 font-light">Brand:</span>{" "}
              <span className="font-semibold">Apple</span>
            </p>
            <p className="flex items-center gap-1.5 text-xs bg-red-100 text-red-500 font-medium rounded-full px-3 py-1">
              <IoCheckmarkDoneOutline className="text-[14px]" />
              In Stock
            </p>
          </div>
          <p className="text-xl font-semibold mt-6">&#8358; 1,850,000</p>
          <div className="flex items-center gap-3 mt-3">
            <p className="text-gray-400/80 text-sm line-through">&#8358; 1,850,000</p>
            <p className="text-sm text-red-500 bg-red-100 rounded-md px-3 py-1">- 15%</p>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-10 shadow-md rounded-lg px-6 py-3">
                <button onClick={reduceQuantity} className="text-gray-400 text-sm hover:text-black"><FaMinus /></button>
                <p className="font-medium">{quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 text-sm hover:text-black"><FaPlus /></button>
            </div>
            <button className="flex items-center gap-3 bg-black text-white text-sm font-medium rounded-lg px-7 py-3 hover:bg-black/80">
                <MdOutlineAddShoppingCart className="text-[17px]" />
                Add to Cart
            </button>
          </div>
          <div className="mt-8">
            <Link href={'/'} className="flex items-center gap-1 text-xs text-red-500 underline underline-offset-2">
                <FaStore />
                Check pickup locations here
            </Link>
          </div>
          <div className="inline-block border border-gray-200 rounded-lg mt-8">
            <div className="border-b border-gray-200 p-5">
                <p className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <FaTruck className="text-gray-500" />
                    Doorstep Delivery
                </p>
                <p className="text-xs text-gray-500 font-light mt-2">Availability may differ depending on the location.</p>
            </div>
            <div className="border-b border-gray-200 p-5">
                <p className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <GrPowerCycle className="text-gray-500" />
                    Return Policy
                </p>
                <p className="text-xs text-gray-500 font-light mt-2">For details about our return policy, please contact us.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-10">
            <button className="text-2xl font-medium border-b-8 border-">Description</button>
            <button className="text-2xl font-medium">Properties</button>
        </div>
      </div>
    </div>
  );
};

export default page;
