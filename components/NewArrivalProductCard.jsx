import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const NewArrivalProductCard = () => {
  return (
    <Link
      href={"/"}
      className="animation bg-gray-100/40 w-full max-w-sm relative flex items-center gap-3 border border-gray-200/60 hover:shadow-md rounded-lg px-5 py-8"
    >
      <div className="relative h-24 w-24">
        <Image
          src={"/assets/iphone-sample.png"}
          layout="fill"
          objectFit="contain"
          alt="product"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h1 className="text-sm font-semibold line-clamp-1">
          Black Iphone 13 Pro Max
        </h1>
        <div className="flex items-center gap-3 ">
          <p className="text-sm font-semibold">&#8358; 2,650,000</p>
          <p className="text-gray-500 text-xs font-medium line-through">
            &#8358; 2,500,000
          </p>
        </div>
        <p className="text-red-600 text-xs font-normal">
          You save &#8358; 150,000
        </p>
        <div className="flex items-center gap-2">
          <BsFillStarFill className="text-default text-xs" />
          <p className="text-xs text-gray-500 font-light">5.0 (800 reviews)</p>
        </div>
      </div>
      <Image
        src={"/assets/new-icon.png"}
        className="absolute -top-4 -right-2"
        alt="icon"
        height={35}
        width={35}
      />
    </Link>
  );
};

export default NewArrivalProductCard;
