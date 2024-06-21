import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const BrandMarquee = () => {
  return (
    <div className="w-full px-4 md:px-6">
        <div className="flex items-center gap-5">
            <h1 className="text-[14px] md:text-xl text-left font-bold uppercase whitespace-nowrap">Shop Brands</h1>
            <hr className="border-[0.5px] border-gray-300/80 w-full" />
        </div>
      <div className="mt-5">
        <div className="overflow-hidden">
          <Marquee className="" pauseOnHover={true} speed={60}>
            <Link href={"/"}>
              <div className="relative h-[80px] md:h-[150px] w-[80px] md:w-[150px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[70px] md:h-[110px] w-[70px] md:w-[110px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[45px] md:h-[80px] w-[45px] md:w-[80px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[90px] md:h-[150px] w-[90px] md:w-[150px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[55px] md:h-[85px] w-[55px] md:w-[85px] rounded-lg mx-7 md:mx-12">
                <Image
                  src={"/assets/redmi-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            {/* <Link href={"/"}>
              <div className="relative h-[68px] md:h-[100px] w-[68px] md:w-[100px] rounded-lg mx-7 md:mx-12">
                <Image
                  src={"/assets/huawei-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link> */}
            <Link href={"/"}>
              <div className="relative h-[80px] md:h-[140px] w-[80px] md:w-[140px] rounded-lg mx-7 md:mx-12">
                <Image
                  src={"/assets/tecno-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            {/* <Link href={"/"}>
              <div className="relative h-[100px] md:h-[150px] w-[100px] md:w-[150px] rounded-lg mx-10">
                <Image
                  src={"/assets/hp-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link> */}
            <Link href={"/"}>
              <div className="relative h-[70px] md:h-[110px] w-[70px] md:w-[110px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[80px] md:h-[110px] w-[80px] md:w-[110px] rounded-lg mx-12">
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
              <div className="relative h-[120px] md:h-[180px] w-[120px] md:w-[180px] rounded-lg mx-12">
                <Image
                  src={"/assets/transcend-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[60px] md:h-[120px] w-[60px] md:w-[120px] rounded-lg mx-12">
                <Image
                  src={"/assets/logitech-logo.png"}
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
