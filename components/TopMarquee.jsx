import Marquee from "react-fast-marquee";
import { RiArrowRightDoubleLine } from "react-icons/ri";

const TopMarquee = () => {
  return (
    <div className="w-full gradient-bg text-white text-xs md:text-sm font-semibold py-4 shadow">
        <Marquee className="" pauseOnHover={true} speed={100}>
            <p className="mx-20">Smart Devices for Smart Living</p>
            <p className="mx-20">Tech Deals You Can't Resist</p>
            <p className="mx-20">Empowering Your Digital Life</p>
            <p className="mx-20">Smart Choices for Smart Shoppers</p>
        </Marquee>
      {/* <RiArrowRightDoubleLine className="text-lg" /> */}
    </div>
  );
};

export default TopMarquee;
