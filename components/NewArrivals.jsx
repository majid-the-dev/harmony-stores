import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import NewArrivalProductCard from "./NewArrivalProductCard";
import { RiArrowRightDoubleLine } from "react-icons/ri";

const NewArrivals = () => {
  return (
    <div className="w-full px-6">
      <div className="bg-white border border-gray-200/80 rounded-lg px-10 pt-10 pb-14">
        <div className="w-full flex items-center justify-between rounded-t-lg">
          <h1 className="text-2xl font-semibold">New Arrivals</h1>
        </div>
        <div className="flex flex-wrap gap-10 rounded-b-lg mt-12">
          <NewArrivalProductCard />
          <NewArrivalProductCard />
          <NewArrivalProductCard />
          <NewArrivalProductCard />
          <NewArrivalProductCard />
        </div>
        <div className="animation w-full flex items-center justify-center mt-14 hover:scale-110">
          <Link
            href={"/"}
            className="flex items-center gap-3 text-white text-xs font-semibold gradient-bg rounded-lg px-12 py-3"
          >
            SHOW MORE
            <RiArrowRightDoubleLine className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
