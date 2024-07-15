import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const BrandMarquee = () => {
  return (
    <div className="w-full px-4 md:px-6">
      <h1 className="text-[14px] md:text-xl text-left font-bold uppercase whitespace-nowrap">
        Shop Brands
      </h1>
      <div className="bg-white rounded shadow-md shadow-gray-200/80 p-7 mt-5">
        <div className="overflow-hidden">
          <Marquee className="" pauseOnHover={true} speed={60}>
            <Link href={"/"}>
              <div className="relative h-[110px] md:h-[150px] w-[110px] md:w-[150px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[65px] md:h-[80px] w-[65px] md:w-[80px] rounded-lg mx-7 md:mx-12">
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
              <div className="relative h-[110px] md:h-[150px] w-[110px] md:w-[150px] rounded-lg mx-7 md:mx-12">
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
            <Link href={"/"}>
              <div className="relative h-[50px] md:h-[150px] w-[50px] md:w-[150px] rounded-lg mx-10">
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
              <div className="relative h-[75px] md:h-[120px] w-[75px] md:w-[120px] rounded-lg mx-12">
                <Image
                  src={"/assets/logitech-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[72px] md:h-[120px] w-[72px] md:w-[120px] rounded-lg mx-12">
                <Image
                  src={"/assets/asus.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-lg mx-12">
                <Image
                  src={"/assets/sony.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[90px] md:h-[120px] w-[90px] md:w-[120px] rounded-lg mx-12">
                <Image
                  src={"/assets/nokia.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[105px] md:h-[130px] w-[105px] md:w-[130px] rounded-lg mx-12">
                <Image
                  src={"/assets/fitbit.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[60px] md:h-[90px] w-[60px] md:w-[90px] rounded-lg mx-12">
                <Image
                  src={"/assets/baseus.avif"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[60px] md:h-[85px] w-[60px] md:w-[85px] rounded-lg mx-12">
                <Image
                  src={"/assets/dell.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[80px] md:h-[100px] w-[80px] md:w-[100px] rounded-lg mx-12">
                <Image
                  src={"/assets/beats.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[60px] md:h-[90px] w-[60px] md:w-[90px] rounded-lg mx-12">
                <Image
                  src={"/assets/jbl-logo.png"}
                  alt="banner"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </Link>
            <Link href={"/"}>
              <div className="relative h-[190px] md:h-[230px] w-[190px] md:w-[230px] rounded-lg mx-12">
                <Image
                  src={"/assets/kardon-logo.png"}
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
