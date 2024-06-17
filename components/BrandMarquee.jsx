import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const BrandMarquee = () => {
  return (
    <div className="w-full px-4 md:px-6">
      <div className="bg-white border border-gray-200/80 rounded-lg md:px-10 pt-10 pb-14">
        <h1 className="text-xl md:text-2xl text-center md:text-left font-semibold">
          Popular Brands
        </h1>
        <div className="mt-6 md:mt-8 overflow-hidden">
          <Marquee className="" pauseOnHover={true} speed={60}>
            <Link href={"/"}>
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-10">
                <Image
                  src={"/assets/infinix-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[120px] md:h-[170px] w-[120px] md:w-[170px] rounded-lg mx-10">
                <Image
                  src={"/assets/itel-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[90px] md:h-[140px] w-[90px] md:w-[140px] rounded-lg mx-10">
                <Image
                  src={"/assets/apple-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-10">
                <Image
                  src={"/assets/samsung-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/redmi-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/huawei-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[150px] md:h-[200px] w-[150px] md:w-[200px] rounded-lg mx-10">
                <Image
                  src={"/assets/tecno-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/hp-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/acer-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/lenovo-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/hisense-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
