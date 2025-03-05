import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselData } from "@/public/data";
import { ArrowRight } from "lucide-react";
import Avatar1 from "@/public/assets/hero-avatar-1.png";
import Avatar2 from "@/public/assets/hero-avatar-2.png";
import Avatar3 from "@/public/assets/hero-avatar-3.png";
import CardBG from "../public/assets/samsung-a56-promotion.jpeg";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    // <div className="animation flex flex-wrap md:flex-nowrap gap-1 px-[10px] md:px-6 mt-4 md:mt-6">
    //   <div className="w-full lg:w-2/3">
    //     {/* <div className="relative w-full h-[180px] md:h-[380px]">
    //       <Image
    //         src="/assets/site-banner-2.png"
    //         alt="Large Hero Image"
    //         layout="fill"
    //         objectFit="fill"
    //         className=""
    //       />
    //     </div> */}

    //       <Carousel
    //          plugins={[plugin.current]}
    //          className="w-full"
    //          onMouseEnter={plugin.current.stop}
    //          onMouseLeave={plugin.current.reset}
    //       >
    //         <CarouselContent>
    //           {carouselData.map((item) => (
    //             <CarouselItem key={item.src}>
    //               <div className="relative w-full h-[170px] md:h-[380px]">
    //                 <Image src={item.src} layout="fill" objectFit="fill" />
    //               </div>
    //             </CarouselItem>
    //           ))}
    //         </CarouselContent>
    //       </Carousel>

    //   </div>

    //   <div className="w-full lg:w-1/3 flex flex-wrap">
    //     <div className="w-1/2 h-[150px] md:h-[190px] pl-0 md:pl-1 pt-1 md:pt-0 p-1">
    //       <div className="relative w-full h-full">
    //         <Image
    //           src="/assets/sales-side-banner.png"
    //           alt="Image 1"
    //           layout="fill"
    //           objectFit="fill"
    //           className=""
    //         />
    //       </div>
    //     </div>
    //     <div className="w-1/2 h-[150px] md:h-[190px] pr-0 md:pr-1 pt-1 md:pt-0 p-1">
    //       <div className="relative w-full h-full">
    //         <Image
    //           src="/assets/sales-side-banner-2.png"
    //           alt="Image 2"
    //           layout="fill"
    //           objectFit="fill"
    //           className=""
    //         />
    //       </div>
    //     </div>
    //     <div className="w-1/2 h-[150px] md:h-[190px] pl-0 md:pl-1 pb-1 md:pb-0 p-1">
    //       <div className="relative w-full h-full">
    //         <Image
    //           src="/assets/sales-side-banner-3.png"
    //           alt="Image 3"
    //           layout="fill"
    //           objectFit="fill"
    //           className=""
    //         />
    //       </div>
    //     </div>
    //     <div className="w-1/2 h-[150px] md:h-[190px] pr-0 md:pr-1 pb-1 md:pb-0 p-1">
    //       <div className="relative w-full h-full">
    //         <Image
    //           src="/assets/sales-side-banner-4.png"
    //           alt="Image 4"
    //           layout="fill"
    //           objectFit="fill"
    //           className=""
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl text-center md:text-left font-extrabold text-gray-900 uppercase">
                Discover the <br /> Future of Tech <br /> Today!
              </h1>
              <p className="text-gray-900 text-sm md:text-base text-center md:text-left font-medium max-w-[100%] md:max-w-[80%]">
                Explore the latest gadgets, cutting-edge electronics, and
                unbeatable deals all in one place. Shop smart. Live smarter.
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="flex -space-x-3">
                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={Avatar1}
                    alt="Expert 1"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={Avatar2}
                    alt="Expert 2"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={Avatar3}
                    alt="Expert 3"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm text-gray-900 font-medium hidden md:block">
                +10K satisfied customers
              </span>
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <button className="gradient-bg text-white font-bold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 md:grid-rows-2 gap-6">
            {/* Top Row - Two Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1 bg-[url('../public/assets/ipad-promotion-asset.jpg')] bg-cover bg-center rounded-3xl overflow-hidden relative h-[250px]">
                <div className="absolute top-4 left-4 bg-white p-3 rounded-lg space-y-1 shadow-2xl shadow-black/40">
                  <h3 className="font-semibold text-sm">Tablets</h3>
                  <p className="text-sm font-bold">
                    <span className="text-gray-500 text-xs font-light">
                      from
                    </span>{" "}
                    N100k
                  </p>
                </div>
                <div className="h-full flex items-end justify-end p-4">
                  <button className="absolute bottom-4 right-4 gradient-bg p-2 rounded-full">
                    <ArrowRight color="white" className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div
                className={`col-span-2 md:col-span-1 bg-[url('../public/assets/apple-promotion-asset.jpg')] bg-cover bg-center rounded-3xl overflow-hidden relative h-[250px]`}
              >
                <div className="absolute top-4 left-4 bg-white p-3 rounded-lg space-y-1 shadow-2xl shadow-black/40">
                  <h3 className="font-semibold text-sm">iPhones</h3>
                  <p className="text-sm font-bold">
                    <span className="text-gray-500 text-xs font-light">
                      from
                    </span>{" "}
                    N800k
                  </p>
                </div>
                <div className="h-full flex items-end justify-end p-4">
                  <button className="absolute bottom-4 right-4 gradient-bg p-2 rounded-full">
                    <ArrowRight color="white" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-3xl p-6 flex flex-col justify-between bg-[url('../public/assets/homepod-promotion-asset.jpg')] bg-cover bg-center bg-no-repeat h-[260px]">
              <div>
                <h2 className="text-white text-2xl font-bold">5% OFF</h2>
                <p className="text-white text-sm md:text-base font-medium mt-1">
                  Smart accessories for everyone
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="gradient-bg hover:bg-gray-500 text-white px-5 py-2 rounded-full transition-colors text-sm font-bold">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
