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
    <div className="w-full px-4 md:px-6">
      <div className="bg-white border border-gray-200/80 rounded-lg md:px-10 pt-10 pb-14">
        <h1 className="text-xl md:text-2xl text-center md:text-left font-semibold">Trending Collections</h1>
        <div className="mt-12 overflow-hidden">
          <Marquee className="" pauseOnHover={true} speed={60}>
            {/* <Link
              href={"/"}
              className="animation bg-orange-100 text-orange-600 font-semibold relative flex items-center gap-3 border border-orange-200 hover:shadow-md rounded-full px-14 py-5 mx-6"
            >
              <MdPhoneAndroid className="text-2xl" />
              Smartphones
            </Link> */}

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/smartphone-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">
                Smartphones
              </span>
            </Link>

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/tablet-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">Tablets</span>
            </Link>

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/laptop-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">Laptops</span>
            </Link>

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/tv-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">Smart TVs</span>
            </Link>

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/ac-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">
                Air Conditioners
              </span>
            </Link>

            <Link href={"/"} className="flex flex-col justify-center gap-5">
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-6">
                <Image
                  src={"/assets/printer-banner.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
              <span className="text-center text-sm font-medium">
                Printers
              </span>
            </Link>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
