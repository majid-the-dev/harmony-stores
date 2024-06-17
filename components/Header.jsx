import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsThreads } from "react-icons/bs";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-black mx-auto flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-5">
        <p className="text-white text-xs font-normal">For wholesale enquiries call +2348077286191</p>
        {/* <Link
          href={"/stores"}
          className="gradient-bg text-white text-xs font-medium flex items-center gap-2 rounded-lg px-5 py-2.5"
        >
          <span className="mt-0.5">Store Locations</span>
        </Link> */}
        {/* <Link
          href={"/"}
          className="hidden text-white text-xs font-medium md:flex items-center gap-1.5"
        >
          <BsFillTelephoneFill />
          <span className="mt-0.5">+234 8182012345</span>
        </Link> */}
        {/* <Link
          href={"/"}
          className="hidden text-white text-xs font-medium md:flex items-center gap-1.5"
        >
          <IoMail />
          <span className="mt-0.5">harmonystoresonline@gmail.com</span>
        </Link> */}
      </div>

      <div className="hidden md:flex items-center gap-6 text-white text-sm">
        <Link href={"/"}>
          <IoLogoWhatsapp className="text-white text-[17px]" />
          {/* <Image
            src={"/assets/whatsapp-logo.png"}
            alt="logo"
            width={27}
            height={27}
          /> */}
        </Link>
        <Link href={"/"}>
          <PiInstagramLogoFill className="text-white text-[17px]" />
          {/* <Image
            src={"/assets/ig-logo.png"}
            alt="logo"
            width={37}
            height={37}
          /> */}
        </Link>
        <Link href={"/"}>
          <FaFacebookF className="text-white text-[14px]" />
          {/* <Image
            src={"/assets/fb-logo.png"}
            alt="logo"
            width={22}
            height={22}
          /> */}
        </Link>
        <Link href={"/"}>
          <BsTwitterX className="text-white text-[13px]" />
          {/* <Image src={"/assets/x-logo.png"} alt="logo" width={29} height={29} /> */}
        </Link>
      </div>
    </div>
  );
};

export default Header;
