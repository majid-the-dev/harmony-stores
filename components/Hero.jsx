import * as React from "react"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { carouselData } from "@/public/data";

const Hero = () => {

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="animation flex flex-wrap md:flex-nowrap gap-1 px-[10px] md:px-6 mt-4 md:mt-6">
      <div className="w-full lg:w-2/3">
        {/* <div className="relative w-full h-[180px] md:h-[380px]">
          <Image
            src="/assets/site-banner-2.png"
            alt="Large Hero Image"
            layout="fill"
            objectFit="fill"
            className=""
          />
        </div> */}

          <Carousel
             plugins={[plugin.current]}
             className="w-full"
             onMouseEnter={plugin.current.stop}
             onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {carouselData.map((item) => (
                <CarouselItem key={item.src}>
                  <div className="relative w-full h-[170px] md:h-[380px]">
                    <Image src={item.src} layout="fill" objectFit="fill" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

      </div>

      <div className="w-full lg:w-1/3 flex flex-wrap">
        <div className="w-1/2 h-[150px] md:h-[190px] pl-0 md:pl-1 pt-1 md:pt-0 p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/Artboard-5.jpg"
              alt="Image 1"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] pr-0 md:pr-1 pt-1 md:pt-0 p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/Artboard-9.jpg"
              alt="Image 2"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] pl-0 md:pl-1 pb-1 md:pb-0 p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/Artboard-8.jpg"
              alt="Image 3"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] pr-0 md:pr-1 pb-1 md:pb-0 p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/Artboard-6.jpg"
              alt="Image 4"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
