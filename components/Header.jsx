import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsThreads } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { BsFillThreadsFill } from "react-icons/bs";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-black mx-auto flex items-center justify-center md:justify-between px-6 py-4">
      <p className="text-default text-xs font-semibold">
        For wholesale enquiries call +2348077286191
      </p>

      <div className="hidden md:flex items-center gap-6 text-white text-sm">
        <Link target="_blank" href={"https://wa.me/+2348182012345/"}>
          <IoLogoWhatsapp className="text-white text-[17px]" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.instagram.com/harmonystoresng"}
        >
          <PiInstagramLogoFill className="text-white text-[17px]" />
        </Link>
        {/* <Link href={"/"}>
          <FaFacebookF className="text-white text-[14px]" />
        </Link> */}
        <Link
          target="_blank"
          href={
            "https://twitter.com/harmonystoresng?s=21&t=A8E8YgrlNKyOQuOZQaYBjA"
          }
        >
          <BsTwitterX className="text-white text-[13px]" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.tiktok.com/@harmonygroupng?is_from_webapp=1&sender_device=pc"}
        >
          <FaTiktok className="text-white text-[13px]" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.youtube.com/@HarmonyGroupTV"}
        >
          <IoLogoYoutube className="text-white text-[13px]" />
        </Link>
        <Link
          target="_blank"
          href={"https://www.threads.net/@harmonystoresng"}
        >
          <BsFillThreadsFill className="text-white text-[13px]" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
