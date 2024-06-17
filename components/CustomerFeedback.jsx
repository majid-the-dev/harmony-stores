"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const CustomerFeedback = () => {
  return (
    <div className="w-full px-4 md:px-6">
      <div className="bg-white border border-gray-200/80 rounded-lg md:px-10 pt-10 pb-14">
        <h1 className="text-xl md:text-2xl text-center md:text-left font-semibold">Customers Feedback</h1>
        <div className="mt-6 md:mt-8 overflow-hidden">
          <Marquee className="" pauseOnHover={true} speed={60}>
            <div className="w-full max-w-md flex-shrink-0 mx-8 py-2">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md px-6 md:px-8 py-8 md:py-12">
                <Image
                  src={"/assets/quote.png"}
                  height={40}
                  width={40}
                  alt="icon"
                />
                <p className="text-center text-gray-500 text-xs leading-5">
                  I was hesitant to buy a phone online at first, but Harmony
                  Stores totally surprised me! Their service is amazing, and the
                  delivery is super fast. Now I get most of my gadgets from
                  Harmony Stores.
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Grace A.</p>
                  <p className="text-gray-400 text-xs italic">- Abuja</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md flex-shrink-0 mx-8 py-2">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md px-6 md:px-8 py-8 md:py-12">
                <Image
                  src={"/assets/quote.png"}
                  height={40}
                  width={40}
                  alt="icon"
                />
                <p className="text-center text-gray-500 text-xs leading-5">
                  Compared to other stores, Harmony Stores always seems to have
                  the best deals. I bought a laptop recently and the discount
                  was a huge bonus. Glad to be a customer!
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">William</p>
                  <p className="text-gray-400 text-xs italic">- Lagos</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md flex-shrink-0 mx-8 py-2">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md px-6 md:px-8 py-8 md:py-12">
                <Image
                  src={"/assets/quote.png"}
                  height={40}
                  width={40}
                  alt="icon"
                />
                <p className="text-center text-gray-500 text-xs leading-5">
                  I'm not very tech-savvy, but even I can navigate Harmony
                  Stores website with ease. Everything is so user-friendly and
                  well-organized. It makes online shopping a pleasure!
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Mrs Nneka</p>
                  <p className="text-gray-400 text-xs italic">- Lagos</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md flex-shrink-0 mx-8 py-2">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md px-6 md:px-8 py-8 md:py-12">
                <Image
                  src={"/assets/quote.png"}
                  height={40}
                  width={40}
                  alt="icon"
                />
                <p className="text-center text-gray-500 text-xs leading-5">
                  I'm not very tech-savvy, but even I can navigate Harmony
                  Stores website with ease. Everything is so user-friendly and
                  well-organized. It makes online shopping a pleasure!
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Mrs Nneka</p>
                  <p className="text-gray-400 text-xs italic">- Lagos</p>
                </div>
              </div>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
