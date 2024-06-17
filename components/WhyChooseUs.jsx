import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-6 pb-10">
      <div className="bg-gray-100 border border-gray-200/80 rounded-lg px-10 pt-10 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11">
          <div className="col-span-1 flex flex-col items-center gap-1">
            <Image
              src={"/assets/delivery.png"}
              alt="icon"
              width={60}
              height={60}
              className="scale-75 md:scale-100"
            />
            <h1 className="text-sm font-semibold mt-3">
              Fast and Reliable Delivery
            </h1>
            <p className="text-gray-500 text-[12px] text-center">
              Enjoy fast and reliable delivery to your doorstep
            </p>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-1">
            <Image
              src={"/assets/shopping.png"}
              alt="icon"
              width={60}
              height={60}
              className="scale-75 md:scale-100"
            />
            <h1 className="text-sm font-semibold mt-3">
              Wide Product Selection
            </h1>
            <p className="text-gray-500 text-[12px] text-center">
              Explore all products across various categories
            </p>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-1">
            <Image
              src={"/assets/card.png"}
              alt="icon"
              width={60}
              height={60}
              className="scale-75 md:scale-100"
            />
            <h1 className="text-sm font-semibold mt-3">
              Secure Payment Options
            </h1>
            <p className="text-gray-500 text-[12px] text-center">
              Multiple safe and convenient payment options
            </p>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-1">
            <Image
              src={"/assets/call-icon.png"}
              alt="icon"
              width={60}
              height={60}
              className="scale-75 md:scale-100"
            />
            <h1 className="text-sm font-semibold mt-3">
              Dedicated Customer Support
            </h1>
            <p className="text-gray-500 text-[12px] text-center">
              Our dedicated team is available 24/7 to assist you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
