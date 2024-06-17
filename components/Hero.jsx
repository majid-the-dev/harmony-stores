import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-1 px-4 md:px-6 mt-4 md:mt-6">
      <div className="w-full lg:w-2/3">
        <div className="relative w-full h-[180px] md:h-[380px]">
          <Image
            src="/assets/site-banner-2.png"
            alt="Large Hero Image"
            layout="fill"
            objectFit="fill"
            className=""
          />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-wrap">
        <div className="w-1/2 h-[150px] md:h-[190px] p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/site-banner-3.png"
              alt="Image 1"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/site-banner-4.png"
              alt="Image 2"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/site-banner-5.png"
              alt="Image 3"
              layout="fill"
              objectFit="fill"
              className=""
            />
          </div>
        </div>
        <div className="w-1/2 h-[150px] md:h-[190px] p-1">
          <div className="relative w-full h-full">
            <Image
              src="/assets/site-banner-5.png"
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
