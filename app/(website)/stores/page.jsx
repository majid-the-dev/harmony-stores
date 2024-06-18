import StoreCard from "@/components/StoreCard";
import { storesData } from "@/public/data";
import Link from "next/link";
import React from "react";
import { FaAnglesRight } from "react-icons/fa6";

const page = () => {
  return (
    <div className="">
      <div className="bg-white flex items-center gap-3 text-[11px] md:text-xs border-b border-gray-200 px-4 md:px-6 py-4">
        <Link href={"/"} className="font-medium">
          Home
        </Link>
        <FaAnglesRight className="font-medium" />
        <p className="text-gray-500 font-light">Stores</p>
      </div>

      <div className="pt-10 pb-20 px-4 md:px-6">
        <h1 className="text-2xl font-semibold">Store Locations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {storesData.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
