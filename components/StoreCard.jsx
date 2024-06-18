import Image from "next/image";
import React from "react";

const StoreCard = ({ store }) => {
  return (
    <div className="bg-white border border-gray-200 shadow p-4 md:p-6 hover:shadow-sm">
      <h1 className="text-sm font-semibold">{store.name}</h1>
      <div className="flex items-start gap-2 mt-4">
        {/* <Image
          src={"/assets/location-icon-2.png"}
          alt="icon"
          height={15}
          width={15}
        /> */}
        <p className="text-gray-500 text-xs leading-5">{store.address}</p>
      </div>
      <div className="flex items-start gap-2 mt-2">
        {/* <Image
          src={"/assets/call-icon.png"}
          alt="icon"
          height={15}
          width={15}
        /> */}
        <p className="text-gray-500 text-xs leading-5">{store.phone}</p>
      </div>
    </div>
  );
};

export default StoreCard;
