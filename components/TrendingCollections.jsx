import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { MdPhoneAndroid } from "react-icons/md";
import { IoMdTabletLandscape } from "react-icons/io";
import { BsLaptop } from "react-icons/bs";
import { MdOutlineMonitor } from "react-icons/md";
import { GrGamepad } from "react-icons/gr";

const TrendingCollections = () => {
  return (
    <div className="w-full px-[10px] md:px-6">
      <div className="flex items-center gap-5">
        {/* <h1 className="text-[14px] md:text-xl text-left font-bold whitespace-nowrap">
          Trending Collections
        </h1> */}
        {/* <hr className="border-[0.5px] border-gray-300/80 w-full" /> */}
      </div>
      <div className="scroll mt-6 md:mt-10 overflow-scroll">
        <div className="scroll flex items-center md:justify-center overflow-x-scroll">
          {/* <Marquee className="" pauseOnHover={true} speed={35}> */}

            <Link href={"/category/Smartphones"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/smartphone-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Smartphones
              </span>
            </Link>

            <Link href={"/category/Tablets"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/tablet-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Tablets
              </span>
            </Link>

            <Link href={"/category/Laptops"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/laptop-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Laptops
              </span>
            </Link>

            <Link href={"/category/Accessories"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/accessory-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Accessories
              </span>
            </Link>

            <Link href={"/category/Electronics"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/tv-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Smart TVs
              </span>
            </Link>

            <Link href={"/category/Electronics"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/ac-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Air Conditioners
              </span>
            </Link>

            <Link href={"/category/Printers"} className="flex flex-col justify-center gap-3">
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] mx-4 md:mx-6">
                <Image
                  src={"/assets/printer-graphics.jpg"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-sm"
                />
              </div>
              <span className="text-center text-[10px] md:text-xs font-semibold">
                Printers
              </span>
            </Link>
          {/* </Marquee> */}
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
