import Image from "next/image";
import Link from "next/link";

const TrendingCollections = () => {
  return (
    <div className="w-full px-[10px] md:px-6">
      <div className="flex items-center gap-5">
      </div>
      <div className="scroll mt-6 md:mt-10 overflow-scroll">
        <div className="scroll flex items-center md:justify-center overflow-x-scroll">
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
        </div>
      </div>
    </div>
  );
};

export default TrendingCollections;
